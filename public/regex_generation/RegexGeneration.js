import {regexGenerationApiCall} from './RegexGenerationApiCall.js';
import {Rocket} from "/rocket/Rocket.js";

export const regexGeneration = function (inputText, buttonValidation, generatedText, rocketSvgContainer) {

    const rocketElement = new Rocket();
    rocketSvgContainer.appendChild(rocketElement.html);

    function executeRegexGeneration() {
        rocketElement.triggerAnimation();
        return regexGenerationApiCall(inputText.value, axios).then((response) => {
            if (generatedText.innerText !== response.data) {
                generatedText.innerText = response.data;
            }
        }).catch((err) => {
            console.error(err)
        })
    }


    buttonValidation.addEventListener('click', () => {
        return executeRegexGeneration();
    });

    inputText.addEventListener('keyup', (keyEvent) => {
        if (keyEvent.key === "Enter") {
            return executeRegexGeneration();
        }
    });
};