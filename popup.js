document.addEventListener("DOMContentLoaded", function () {
    // Get saved page URL
    chrome.storage.sync.get("bannerPage", function (data) {
      document.getElementById("pageUrl").value = data.bannerPage;
    });

    // Save button click event
    document.getElementById("saveBtn").addEventListener("click", function () {
      var pageUrl = document.getElementById("pageUrl").value;
      chrome.storage.sync.set({ bannerPage: pageUrl });
      alert("Settings saved!");
    });
  });
