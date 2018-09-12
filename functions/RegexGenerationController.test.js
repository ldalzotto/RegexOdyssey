const assert = require('assert');
test

const RegexGenerationController = require('./RegexGenerationController');

describe('RegexGenerationController when GET /regexgeneration is called', () => {

    class ResponseMock {
        send(object) {
            this.sendObject = object;
        }
    }

    it('should call the generation lib', () => {
        const request = {query: {regex: "test"}};
        const response = new ResponseMock();
        RegexGenerationController(request, response);
        assert.equal(true, response.sendObject.length > 0);
    });

    describe('without regex query param', () => {
        it('should call the generation library with an empty default value', () => {
            const request = {query: {}};
            const response = new ResponseMock();
            RegexGenerationController(request, response);
            assert.equal(response.sendObject, "");
        })
    });
});