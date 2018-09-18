export const regexGenerationApiCall = function (inputText, nbOfGeneration, axios) {
    let options = {
        nbOfGeneration: nbOfGeneration
    };

    return axios.get(`/regexgeneration?regex=${inputText}&options=${JSON.stringify(options)}`)
};