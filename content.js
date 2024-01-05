chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.ailaan) {
        const ailaan = document.getElementById("ailaan")

        if (!ailaan) {
            // ailaan not on page, let's add
            const ailaanDiv = document.createElement("div");
            ailaanDiv.setAttribute("id", "ailaan")
            ailaanDiv.innerHTML = message.ailaan;
            document.body.appendChild(ailaanDiv);
        } else {
            // update in place
            ailaan.innerHTML = message.ailaan;
        }
    }
});
