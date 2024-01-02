chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.banner) {
      const bannerDiv = document.createElement("div");
      bannerDiv.innerHTML = message.banner;
      document.body.prepend(bannerDiv);
    }
  });
