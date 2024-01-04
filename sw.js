const alarmName = "ailaan";
const createAlarm = async (name) => {
  await chrome.alarms.create(name, { periodInMinutes: 1 });
}

// reset alarm on every start of SW
const STORAGE_KEY = "ailaan-alarm-enabled";

async function checkAlarmState() {
  const { alarmEnabled } = await chrome.storage.sync.get(STORAGE_KEY);

  if (alarmEnabled) {
    const alarm = await chrome.alarms.get(alarmName);

    if (!alarm) {
      console.log('creating alarm since it doesn\'t exist');
      await createAlarm(alarmName);
    }
  }
}

checkAlarmState();


chrome.alarms.onAlarm.addListener((alarm) => {
  console.log('fetching banner' + alarm.name);
  if (alarm.name === alarmName) {
    chrome.storage.sync.get("selectedPage", (data) => {
      const selectedPage = data.selectedPage || "";
      console.log("selectedPage", selectedPage);
      if (selectedPage) {
        fetchBanner(selectedPage);
      }
    });
  }
});
function fetchBanner(selectedPage) {
  fetch("https://dev.bostonsikhsangat.com/wp-json/ailaan/v1/get")
    .then(response => response.json())
    .then(data => {
      console.log("data", data)
      // chrome.storage.local.set({ bannerData });
      if (data.message) {
        chrome.tabs.query({ url: selectedPage }, (tabs) => {
          tabs.forEach(tab => {
            console.log("tab selected", tab);
            chrome.tabs.sendMessage(tab.id, { banner: data.message });
          });
        });
      }
    })
    .catch(error => console.error("Error fetching banner:", error));
}
