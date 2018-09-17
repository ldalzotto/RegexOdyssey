const assert = require('assert');

const RegexGenerationController = require('./RegexGenerationController');
const RegexGenerationWithOptions = require('./DatabaseOdyssey/lib/regex_generation/RegexGenerationWithOptions');

describe('RegexGenerationController when GET /regexgeneration is called', () => {

    class ResponseMock {
        send(object) {
            this.sendObject = object;
        }
    }

    it('should call the generation with options lib', () => {
        const request = {query: {regex: "test"}};
        const response = new ResponseMock();
        RegexGenerationController(request, response);
        assert.equal(true, response.sendObject.length > 0);

        let regexGenerationWithOptionsCalled = false;
        let oldFunctionDefinition = RegexGenerationWithOptions.generationWithOptions;
        RegexGenerationWithOptions.generationWithOptions = function (initialString, setCharacterOrchestration, options) {
            regexGenerationWithOptionsCalled = true;
            return oldFunctionDefinition(initialString, setCharacterOrchestration, options);
        };

        RegexGenerationController(request, response);
        assert.equal(regexGenerationWithOptionsCalled, true);

    });

    describe('without regex query param', () => {
        it('should call the generation library with an empty default value', () => {
            const request = {query: {}};
            const response = new ResponseMock();
            RegexGenerationController(request, response);
            assert.equal(response.sendObject, "");
        })
    });

    describe('without options query parameters', () => {
        it('should call the generation library with an empty options object', () => {
            let oldFunctionDefinition = RegexGenerationWithOptions.generationWithOptions;

            let calledOptions;
            RegexGenerationWithOptions.generationWithOptions = function (initialString, setCharacterOrchestration, options) {
                calledOptions = JSON.parse(JSON.stringify(options));
                return oldFunctionDefinition(initialString, setCharacterOrchestration, options);
            };

            const request = {query: {}};
            const response = new ResponseMock();
            RegexGenerationController(request, response);
            assert.deepEqual(calledOptions, {});
        })
    });
    describe('with options query parameter', () => {
        it('should call with option object', () => {
            let oldFunctionDefinition = RegexGenerationWithOptions.generationWithOptions;

            let calledOptions;
            RegexGenerationWithOptions.generationWithOptions = function (initialString, setCharacterOrchestration, options) {
                calledOptions = JSON.parse(JSON.stringify(options));
                return oldFunctionDefinition(initialString, setCharacterOrchestration, options);
            };

            const request = {query: {options: "{\"test\": \"test\"}"}};
            const response = new ResponseMock();
            RegexGenerationController(request, response);
            assert.deepEqual(calledOptions, JSON.parse(request.query.options));
        })
    });

});