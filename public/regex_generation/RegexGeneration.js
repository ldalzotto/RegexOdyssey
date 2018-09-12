import {regexGenerationApiCall} from './RegexGenerationApiCall.js';


export const regexGeneration = function (inputText, buttonValidation, generatedText) {

    function executeRegexGeneration() {
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