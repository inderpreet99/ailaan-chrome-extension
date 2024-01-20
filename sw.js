const alarmName = "ailaan";

try { importScripts("constants.js"); } catch (e) { console.error(e); }

const createAlarm = async (name, periodInMinutes = CONSTANTS.periodInMinutes) => {
  await chrome.alarms.create(name, { periodInMinutes });
}

const getStorageOrConstant = async (setting) => {
  const fetchedData = await chrome.storage.sync.get(setting);
  if (fetchedData[setting]) {
    return fetchedData;
  }

  return CONSTANTS[setting];
}

// reset alarm on every start of SW
const checkAlarmState = async () => {
  const { periodInMinutes } = await getStorageOrConstant("periodInMinutes");

  const alarm = await chrome.alarms.get(alarmName);

  if (!alarm) {
    console.debug('creating alarm since it doesn\'t exist');
    await createAlarm(alarmName, periodInMinutes);
  }
}
checkAlarmState();

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.debug('fetching banner ' + alarm.name);
  if (alarm.name === alarmName) {
    const {selectedPage} = await getStorageOrConstant("selectedPage");
    const {targetClass} = await getStorageOrConstant("targetClass");
    const {targetCss} = await getStorageOrConstant("targetCss");

    if (selectedPage) {

      // check if the tab exists
      chrome.tabs.query({ url: selectedPage }, async (tabs) => {
        if (!tabs) {
          console.warn("Tab is not open!")
          return
        }

        // fetch ailaan once
        const data = await fetchAilaan();
        if (data && data.message) {
          tabs.forEach(async (tab) => {

            // send the tab message
            chrome.tabs.sendMessage(tab.id, {
              ailaan: data.message,
              targetClass,
              targetCss,
            });
          });
        }
      });
    }
  }
});

const fetchAilaan = async () => {
  const { ailaanApi } = await getStorageOrConstant("ailaanApi");
  return fetch(ailaanApi, {cache: "no-cache"})
    .then(response => response.json())
    .then(data => {
      console.debug("data", data)
      return data;
    })
    .catch(error => console.warn("Error fetching ailaan:", error));
}