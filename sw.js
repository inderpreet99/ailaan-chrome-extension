const alarmName = "ailaan";
const STORAGE_KEY = "ailaan-alarm-enabled";

try { importScripts("constants.js"); } catch (e) { console.error(e); }

const createAlarm = async (name, periodInMinutes = CONSTANTS.periodInMinutes) => {
  await chrome.alarms.create(name, { periodInMinutes });
  await chrome.storage.sync.set({[STORAGE_KEY]: 1});
}

// reset alarm on every start of SW
const checkAlarmState = async () => {
  const { alarmEnabled } = await chrome.storage.sync.get(STORAGE_KEY);
  const { periodInMinutes } = await getStorageOrConstant("periodInMinutes");

  console.log("alarm check");
  if (alarmEnabled) {
    const alarm = await chrome.alarms.get(alarmName);

    if (!alarm) {
      console.log('creating alarm since it doesn\'t exist');
      await createAlarm(alarmName, periodInMinutes);
    }
  } else {
    console.log("must create new")
    await createAlarm(alarmName, periodInMinutes);
  }
}
checkAlarmState();

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log('fetching banner ' + alarm.name);
  if (alarm.name === alarmName) {
    const {selectedPage} = await getStorageOrConstant("selectedPage");

    if (selectedPage) {
      await fetchAilaan(selectedPage);
    }
  }
});

const fetchAilaan = async (selectedPage) => {
  const { ailaanApi } = await getStorageOrConstant("ailaanApi");
  fetch(ailaanApi, {cache: "no-cache"})
    .then(response => response.json())
    .then(data => {
      console.log("data", data)
      if (data.message) {
        chrome.tabs.query({ url: selectedPage }, (tabs) => {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { ailaan: data.message });
          });
        });
      }
    })
    .catch(error => console.error("Error fetching ailaan:", error));
}

const getStorageOrConstant = async (setting) => {
  const fetchedData = await chrome.storage.sync.get(setting);
  if (fetchedData[setting]) {
    return fetchedData;
  }

  return CONSTANTS[setting];
}