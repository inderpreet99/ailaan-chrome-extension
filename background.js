chrome.runtime.onInstalled.addListener(function () {
    // Set default settings
    chrome.storage.sync.set({ bannerPage: "https://example.com" });
  });
