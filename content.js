const AILAAN_DIV = "ailaan";
const AILAAN_STYLE = "ailaanStyle";

const getAilaanDiv = () => {
    // Find ailaanDiv and create if it doesn't exist

    // find ailaan
    const ailaanDiv = document.getElementById(AILAAN_DIV)
    if (ailaanDiv) {
        return ailaanDiv;
    }

    // ailaan not on page, let's add
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", AILAAN_DIV)
    return newDiv;
}

const getAilaanStyle = () => {
    // Create Ailaan Style and add to head if it doesn't exist

    // find style
    const ailaanStyle = document.getElementById(AILAAN_STYLE)
    if (ailaanStyle) {
        return ailaanStyle;
    }

    // style not on page, let's create
    const newStyle = document.createElement("style");
    newStyle.setAttribute("type", "text/css");
    newStyle.setAttribute("id", AILAAN_STYLE);
    document.head.appendChild(newStyle);
    return newStyle;
}

const createAilaan = (ailaanDiv, className) => {
    // Create ailaanDiv appended within className'd node.

    var targetElement = document.body;
    if (className) {
        elements = document.getElementsByClassName(className);
        if (elements) {
            targetElement = elements[0];
        }
    }
    targetElement.appendChild(ailaanDiv);
}

const setMessage = (ailaanDiv, ailaan) => {
    ailaanDiv.innerHTML = ailaan;
}

const setCss = (targetCss) => {
    const ailaanStyle = getAilaanStyle();
    ailaanStyle.innerHTML = targetCss;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.debug("message received" , message);
    const ailaanDiv = getAilaanDiv();
    if (message.ailaan) {
        setMessage(ailaanDiv, message.ailaan);
        createAilaan(ailaanDiv, message.targetClass)
        setCss(message.targetCss);
    } else {
        setMessage(ailaanDiv, "");
    }
});
