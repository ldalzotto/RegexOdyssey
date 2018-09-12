export const regexGenerationApiCall = function (inputText, axios) {
    return axios.get(`/regexgeneration?regex=${inputText}`)
};