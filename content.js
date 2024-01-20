const getAilaanDiv = () => {

    // find ailaan
    const ailaanDiv = document.getElementById("ailaan")
    if (ailaanDiv) {
        return ailaanDiv;
    }

    // ailaan not on page, let's add
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "ailaan")
    return newDiv;
}

const setClass = (ailaanDiv, className) => {
    var targetElement = document.body;
    if (message.targetClass) {
        elements = document.getElementsByClassName(message.targetClass);
        if (elements) {
            targetElement = elements[0];
        }
    }
    targetElement.appendChild(ailaanDiv);
}

const setMessage = (ailaanDiv, ailaan) => {
    ailaanDiv.innerHTML = ailaan;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.ailaan) {
        console.log("message received" , message);

        const ailaanDiv = getAilaanDiv();
        setMessage(ailaanDiv, message.ailaan);
        setClass(ailaanDiv, message.targetClass)
    }
});
