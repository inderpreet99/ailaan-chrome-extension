chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ["1"]
    });

    chrome.storage.sync.get("selectedPage", (data) => {
      const selectedPage = data.selectedPage || "";
      if (selectedPage) {
        chrome.declarativeNetRequest.updateDynamicRules({
          addRules: [
            {
              id: "1",
              priority: 1,
              action: {
                type: "modifyHeaders",
                responseHeaders: [
                  {
                    header: "Content-Security-Policy",
                    operation: "set",
                    value: "frame-ancestors 'self' https://dev.bostonsikhsangat.com"
                  }
                ]
              },
              condition: {
                urlFilter: {
                  urlMatches: selectedPage
                }
              }
            }
          ]
        });
      }
    });

    chrome.alarms.create("fetchBanner", { periodInMinutes: 5 });
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "fetchBanner") {
      chrome.storage.sync.get("selectedPage", (data) => {
        const selectedPage = data.selectedPage || "";
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
        if (data.banner) {
          chrome.tabs.query({ url: selectedPage }, (tabs) => {
            tabs.forEach(tab => {
              chrome.tabs.sendMessage(tab.id, { banner: data.banner });
            });
          });
        }
      })
      .catch(error => console.error("Error fetching banner:", error));
  }
