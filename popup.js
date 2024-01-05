document.addEventListener("DOMContentLoaded", function () {
    const selectedPageInput = document.getElementById("selectedPage");
    const periodInMinutesInput = document.getElementById("periodInMinutes");
    const ailaanApiInput = document.getElementById("ailaanApi");

    const saveButton = document.getElementById("saveButton");

    chrome.storage.sync.get(["selectedPage", "periodInMinutes", "ailaanApi"], (data) => {
      selectedPageInput.value = data.selectedPage || CONSTANTS.selectedPage;
      periodInMinutesInput.value = data.periodInMinutes || CONSTANTS.periodInMinutes;
      ailaanApiInput.value = data.ailaanApi || CONSTANTS.ailaanApi;
    });

    saveButton.addEventListener("click", function () {
      const selectedPage = selectedPageInput.value.trim();
      const periodInMinutes = parseFloat(periodInMinutesInput.value.trim());
      const ailaanApi = ailaanApiInput.value.trim();
      chrome.storage.sync.set({ selectedPage, periodInMinutes, ailaanApi }, function () {
        document.getElementById("status").innerText = "Settings saved!";
        chrome.runtime.sendMessage({ reload: true });
      });
    });
  });
