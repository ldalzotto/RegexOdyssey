import {RegexGenerationPage} from '../../regex_generation/RegexGeneration.js';
import {TestUtil} from "../common/TestUtil.js";

beforeEach(() => {
    axios = {};
});

const buildNewMock = () => {

    const rocketButton = new ElementMock();

    const computeButton = new ElementMock({
        ".button-rocket": rocketButton
    });
    const input = new ElementMock();
    const output = new ElementMock();

    const regexGenerationContainer = new ElementMock({
        "input": input,
        ".compute-button": computeButton,
        ".output pre": output
    });

    const cloudContainer = new ElementMock();

    const elementMock = new ElementMock({
        "#regex-generation-container": regexGenerationContainer,
        "#cloud-container": cloudContainer
    });

    elementMock.rocketButton = rocketButton;
    elementMock.computeButton = computeButton;
    elementMock.input = input;
    elementMock.output = output;
    elementMock.regexGenerationContainer = regexGenerationContainer;
    elementMock.cloudContainer = cloudContainer;
    return elementMock;
};

const buildNewOptionValue = (optionObject) => {
    return {
        getOptionValues: function () {
            return optionObject;
        }
    }
};

const regexGenerationTestSuite = function (triggeringElementFromRegexGenerationPage) {

    describe('without options', function () {
        it('should call the regex API', () => {
            const regexValue = "value";

            const regexGenerationPage = new RegexGenerationPage();
            regexGenerationPage.html = buildNewMock();
            regexGenerationPage.makeComponentInteractable(buildNewOptionValue());

            regexGenerationPage.html.input.value = regexValue;

            let calledUrl;
            axios.get = function (url) {
                calledUrl = url;
                return Promise.resolve({data: "[]"})
            };

            return triggeringElementFromRegexGenerationPage(regexGenerationPage).then(() => {
                chai.assert.equal(calledUrl, `/regexgeneration?regex=${regexValue}&options={}`);
            });
        });
        it('should valuate API response in output element', () => {
            const regexValue = "value";

            const regexGenerationPage = new RegexGenerationPage();
            regexGenerationPage.html = buildNewMock();
            regexGenerationPage.makeComponentInteractable(buildNewOptionValue());

            regexGenerationPage.html.input.value = regexValue;

            let calledUrl;
            axios.get = function (url) {
                calledUrl = url;
                return Promise.resolve({data: "[\"abc\"]"})
            };

            return triggeringElementFromRegexGenerationPage(regexGenerationPage).then(() => {
                chai.assert.equal(regexGenerationPage.html.output.innerText, JSON.stringify("[\"abc\"]", null, 4));
            });
        });
        describe('with options', function () {
            describe('with unknown options attributes', function () {
                it('should still call regex API and valuate output element', () => {
                    const regexValue = "value";

                    const regexGenerationPage = new RegexGenerationPage();
                    regexGenerationPage.html = buildNewMock();
                    regexGenerationPage.makeComponentInteractable(buildNewOptionValue({test: "test"}));

                    regexGenerationPage.html.input.value = regexValue;

                    let calledUrl;
                    axios.get = function (url) {
                        calledUrl = url;
                        return Promise.resolve({data: "[\"abc\"]"})
                    };

                    return triggeringElementFromRegexGenerationPage(regexGenerationPage).then(() => {
                        chai.assert.equal(calledUrl, `/regexgeneration?regex=${regexValue}&options={}`);
                        chai.assert.equal(regexGenerationPage.html.output.innerText, JSON.stringify("[\"abc\"]", null, 4));
                    });
                })
            });
            describe('with generation number option', () => {
                it('should call regex api with nbOfGeneration attribute', () => {
                    const regexValue = "value";

                    const regexGenerationPage = new RegexGenerationPage();
                    regexGenerationPage.html = buildNewMock();
                    regexGenerationPage.makeComponentInteractable(buildNewOptionValue({number: 5}));

                    regexGenerationPage.html.input.value = regexValue;

                    let calledUrl;
                    axios.get = function (url) {
                        calledUrl = url;
                        return Promise.resolve({data: "[\"abc\"]"})
                    };

                    return triggeringElementFromRegexGenerationPage(regexGenerationPage).then(() => {
                        chai.assert.equal(calledUrl, `/regexgeneration?regex=${regexValue}&options={\"nbOfGeneration\":5}`);
                        chai.assert.equal(regexGenerationPage.html.output.innerText, JSON.stringify("[\"abc\"]", null, 4));
                    });
                });
                describe('with generation number option that is a random string', function () {
                    it('should still call regex API', () => {
                        const regexValue = "value";

                        const regexGenerationPage = new RegexGenerationPage();
                        regexGenerationPage.html = buildNewMock();
                        regexGenerationPage.makeComponentInteractable(buildNewOptionValue({number: "test"}));

                        regexGenerationPage.html.input.value = regexValue;

                        let calledUrl;
                        axios.get = function (url) {
                            calledUrl = url;
                            return Promise.resolve({data: "[\"abc\"]"})
                        };

                        return triggeringElementFromRegexGenerationPage(regexGenerationPage).then(() => {
                            chai.assert.equal(calledUrl, `/regexgeneration?regex=${regexValue}&options={\"nbOfGeneration\":\"test\"}`);
                            chai.assert.equal(regexGenerationPage.html.output.innerText, JSON.stringify("[\"abc\"]", null, 4));
                        });
                    })
                });
            })
        });
    });
    it('should start rocket animation by adding clouds in cloud container', (done) => {

        const regexGenerationPage = new RegexGenerationPage();
        regexGenerationPage.html = buildNewMock();
        regexGenerationPage.makeComponentInteractable(buildNewOptionValue());

        axios.get = function (url) {
            return Promise.resolve({data: "[\"abc\"]"})
        };

        triggeringElementFromRegexGenerationPage(regexGenerationPage);
        TestUtil.testForEachTimeInterval(400, 10, () => {
            return (regexGenerationPage.html.cloudContainer.childs.length > 0)
        }, done);
    });
};

describe('RegexGeneration when regexGeneration initialisation is called', function () {

    it('should add a keyup listener to keyup and click listener to button', function () {

        const regexGenerationPage = new RegexGenerationPage();
        regexGenerationPage.html = buildNewMock();
        regexGenerationPage.makeComponentInteractable();

        chai.assert.equal(regexGenerationPage.html.input.eventListeners.length, 1);
        chai.assert.equal(regexGenerationPage.html.input.eventListeners[0].key, "keyup");
        chai.assert.equal(regexGenerationPage.html.computeButton.eventListeners.length, 1);
        chai.assert.equal(regexGenerationPage.html.computeButton.eventListeners[0].key, "click");
    });
    it('should append a rocket element to the rocket container', () => {

        const regexGenerationPage = new RegexGenerationPage();
        regexGenerationPage.html = buildNewMock();
        regexGenerationPage.makeComponentInteractable();

        chai.assert.equal(regexGenerationPage.html.rocketButton.childs.length, 1);
    });

    describe('when send button is clicked', () => {

        regexGenerationTestSuite((regexGenerationPage) => {
            return regexGenerationPage.html.computeButton.eventListeners[0].callback();
        });

    });
    describe('when enter button is clicked on input', () => {

        regexGenerationTestSuite((regexGenerationPage) => {
            return regexGenerationPage.html.input.eventListeners[0].callback({key: "Enter"});
        });

    });
    describe('when another button than enter button is clicked on input', () => {
        it('should not call the regex api and value generatedText', () => {

            let calledUrl;
            axios.get = function (url) {
                calledUrl = url;
                return Promise.resolve({data: "OK"})
            };


            const regexGenerationPage = new RegexGenerationPage();
            regexGenerationPage.html = buildNewMock();
            regexGenerationPage.makeComponentInteractable(buildNewOptionValue());

            chai.assert.equal(regexGenerationPage.html.input.eventListeners[0].callback({key: "TEST"}), undefined);
            chai.assert.equal(calledUrl, undefined);
        });
    })
});
