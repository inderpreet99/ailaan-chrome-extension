document.addEventListener("DOMContentLoaded", function () {
    const selectedPageInput = document.getElementById("selectedPage");
    const periodInMinutesInput = document.getElementById("periodInMinutes");
    const ailaanApiInput = document.getElementById("ailaanApi");
    const targetClassInput = document.getElementById("targetClass");
    const targetCssInput = document.getElementById("targetCss");

    const saveButton = document.getElementById("saveButton");

    chrome.storage.sync.get(["selectedPage", "periodInMinutes", "ailaanApi", "targetClass", "targetCss"], (data) => {
      selectedPageInput.value = data.selectedPage || CONSTANTS.selectedPage;
      periodInMinutesInput.value = data.periodInMinutes || CONSTANTS.periodInMinutes;
      ailaanApiInput.value = data.ailaanApi || CONSTANTS.ailaanApi;
      targetClassInput.value = data.targetClass || CONSTANTS.targetClass;
      targetCssInput.value = data.targetCss || CONSTANTS.targetCss;
    });

    saveButton.addEventListener("click", function () {
      const selectedPage = selectedPageInput.value.trim();
      const periodInMinutes = parseFloat(periodInMinutesInput.value.trim());
      const ailaanApi = ailaanApiInput.value.trim();
      const targetClass = targetClassInput.value.trim();
      const targetCss = targetCssInput.value.trim();

      chrome.storage.sync.set({ selectedPage, periodInMinutes, ailaanApi, targetClass, targetCss }, function () {
        document.getElementById("status").innerText = "Settings saved!";
        chrome.runtime.sendMessage({ reload: true });
      });
    });
  });
