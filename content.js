chrome.storage.sync.get("bannerPage", function (data) {
    var currentUrl = window.location.href;
    if (currentUrl.includes(data.bannerPage)) {
      fetch("https://dev.bostonsikhsangat.com/wp-json/ailaan/v1/get")
        .then(response => response.text())
        .then(data => {
          // Add your code to display the banner on the page
          console.log("Banner data:", data);
        })
        .catch(error => console.error("Error fetching banner:", error));
    }
  });
