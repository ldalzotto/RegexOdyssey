beforeEach(() => {
    axios = {};
    includeHTML = function () {
    };
});

import {initialiaseHeaderMenu} from '/HeaderMenu.js';

describe('HeaderMenu when initialisation is called', () => {
    it('should add click event listeners to all header tag element', () => {
        let generateTagElement = new ElementMock(), contactTagElement = new ElementMock(),
            docTagElement = new ElementMock(),
            pagesContainer = new ElementMock();
        initialiaseHeaderMenu(generateTagElement, contactTagElement, docTagElement, pagesContainer, "TEST");
        chai.assert.equal(generateTagElement.eventListeners.length, 1);
        chai.assert.equal(generateTagElement.eventListeners[0].key, "click");
        chai.assert.equal(contactTagElement.eventListeners.length, 1);
        chai.assert.equal(contactTagElement.eventListeners[0].key, "click");
        chai.assert.equal(docTagElement.eventListeners.length, 1);
        chai.assert.equal(docTagElement.eventListeners[0].key, "click");
    });
    describe('when contact tag element is clicked', function () {
        it('should insert associated html template in pages element', () => {
            let generateTagElement = new ElementMock(),
                contactTagElement = new ElementMock(),
                docTagElement = new ElementMock(),
                pagesContainer = new ElementMock();
            pagesContainer.innerHTML = "noihuhyuh";

            initialiaseHeaderMenu(generateTagElement, contactTagElement, docTagElement, pagesContainer, "TEST");
            contactTagElement.eventListeners[0].callback();
            chai.assert.equal(pagesContainer.innerHTML, "<div w3-include-html=\"/home/home.html\"></div>")
        });
        describe('when contact tag is clicked a second time', function () {
            it('should not try to reload html', () => {
                let generateTagElement = new ElementMock(),
                    contactTagElement = new ElementMock(),
                    docTagElement = new ElementMock(),
                    pagesContainer = new ElementMock();
                pagesContainer.innerHTML = "noihuhyuh";

                let includeHTMLCallCount = 0;
                includeHTML = function () {
                    includeHTMLCallCount = includeHTMLCallCount + 1;
                };

                initialiaseHeaderMenu(generateTagElement, contactTagElement, docTagElement, pagesContainer, "TEST");
                contactTagElement.eventListeners[0].callback();
                contactTagElement.eventListeners[0].callback();

                chai.assert.equal(includeHTMLCallCount, 1);
            });
        });
    });
});