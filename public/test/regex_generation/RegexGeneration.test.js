import {regexGeneration} from '/regex_generation/RegexGeneration.js';

beforeEach(() => {
    axios = {};
});

describe('RegexGeneration when regexGeneration initialisation is called', function () {
    it('should add a keyup listener to keyup and click listener to button', function () {
        const inputText = new ElementMock();
        const buttonValidation = new ElementMock();
        const generatedText = new ElementMock();
        regexGeneration(inputText, buttonValidation, generatedText);

        chai.assert.equal(inputText.eventListeners.length, 1);
        chai.assert.equal(inputText.eventListeners[0].key, "keyup");
        chai.assert.equal(buttonValidation.eventListeners.length, 1);
        chai.assert.equal(buttonValidation.eventListeners[0].key, "click");
    });
    describe('when send button is clicked', () => {
        it('should call the regex api and value generatedText', () => {
            const regexValue = "value";
            const inputText = new ElementMock();
            inputText.value = regexValue;
            const buttonValidation = new ElementMock();
            const generatedText = new ElementMock();

            let calledUrl;
            axios.get = function (url) {
                calledUrl = url;
                return Promise.resolve({data: "OK"})
            };

            regexGeneration(inputText, buttonValidation, generatedText);
            return buttonValidation.eventListeners[0].callback().then(() => {
                chai.assert.equal(calledUrl, `/regexgeneration?regex=${regexValue}`);
                chai.assert.equal(generatedText.innerText, "OK");
            });

        })
    });
    describe('when enter button is clicked on input', () => {
        it('should call the regex api and value generatedText', () => {
            const regexValue = "value";
            const inputText = new ElementMock();
            inputText.value = regexValue;
            const buttonValidation = new ElementMock();
            const generatedText = new ElementMock();

            let calledUrl;
            axios.get = function (url) {
                calledUrl = url;
                return Promise.resolve({data: "OK"})
            };

            regexGeneration(inputText, buttonValidation, generatedText);
            return inputText.eventListeners[0].callback({key: "Enter"}).then(() => {
                chai.assert.equal(calledUrl, `/regexgeneration?regex=${regexValue}`);
                chai.assert.equal(generatedText.innerText, "OK");
            });

        })
    });
    describe('when another button than enter button is clicked on input', () => {
        it('should not call the regex api and value generatedText', () => {
            const regexValue = "value";
            const inputText = new ElementMock();
            inputText.value = regexValue;
            const buttonValidation = new ElementMock();
            const generatedText = new ElementMock();

            let calledUrl;
            axios.get = function (url) {
                calledUrl = url;
                return Promise.resolve({data: "OK"})
            };

            regexGeneration(inputText, buttonValidation, generatedText);
            chai.assert.equal(inputText.eventListeners[0].callback({key: "TEST"}), undefined);
            chai.assert.equal(calledUrl, undefined);
        })
    })
});
