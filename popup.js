document.addEventListener("DOMContentLoaded", function () {
    const pageUrlInput = document.getElementById("pageUrl");
    const saveButton = document.getElementById("saveButton");

    chrome.storage.sync.get("selectedPage", (data) => {
      pageUrlInput.value = data.selectedPage || "";
    });

    saveButton.addEventListener("click", function () {
      const selectedPage = pageUrlInput.value.trim();
      chrome.storage.sync.set({ "selectedPage": selectedPage }, function () {
        document.getElementById("status").innerText = "Settings saved!";
        chrome.runtime.sendMessage({ reload: true });
      });
    });
  });
