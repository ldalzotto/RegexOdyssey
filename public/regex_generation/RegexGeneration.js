import {regexGenerationApiCall} from './RegexGenerationApiCall.js';

export const regexGeneration = function (inputText, buttonValidation, generatedText) {
    buttonValidation.addEventListener('click', () => {
        regexGenerationApiCall(inputText.value, axios).then((response) => {
            if (generatedText.innerText !== response.data) {
                generatedText.innerText = response.data;
            }
        }).catch((err) => {
            console.error(err)
        })
    });
};