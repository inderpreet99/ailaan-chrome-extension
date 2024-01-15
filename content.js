chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.ailaan) {
        console.log("message received" , message)
        const ailaan = document.getElementById("ailaan")

        if (!ailaan) {
            // ailaan not on page, let's add
            const ailaanDiv = document.createElement("div");
            ailaanDiv.setAttribute("id", "ailaan")
            ailaanDiv.innerHTML = message.ailaan;

            var targetElement = document.body;
            if (message.targetClass) {
                elements = document.getElementsByClassName(message.targetClass);
                if (elements) {
                    targetElement = elements[0];
                }
            }
            targetElement.appendChild(ailaanDiv);
        } else {
            // update in place
            ailaan.innerHTML = message.ailaan;
        }
    }
});
