import {RegexGenerationPage} from "../regex_generation/RegexGeneration.js";

beforeEach(() => {
    axios = {};
});

import {HeaderMenu} from '../header_menu/HeaderMenu.js';

const buildMock = () => {
    const generateTag = new ElementMock();
    const docTag = new ElementMock();
    const contactTag = new ElementMock();

    const element = new ElementMock({
        "#generate-tag": generateTag,
        "#doc-tag": docTag,
        "#contact-tag": contactTag
    });

    element.generateTag = generateTag;
    element.docTag = docTag;
    element.contactTag = contactTag;
    return element;
};

describe('HeaderMenu when initialisation is called', () => {
    it('should add click event listeners to all header tag element', () => {
        let pagesContainer = new ElementMock();
        const headerMenu = new HeaderMenu(pagesContainer, "TEST");
        headerMenu.html = buildMock();
        headerMenu.makeComponentInteractable(pagesContainer, "TEST");

        chai.assert.equal(headerMenu.html.generateTag.eventListeners.length, 1);
        chai.assert.equal(headerMenu.html.generateTag.eventListeners[0].key, "click");
        chai.assert.equal(headerMenu.html.contactTag.eventListeners.length, 1);
        chai.assert.equal(headerMenu.html.contactTag.eventListeners[0].key, "click");
        chai.assert.equal(headerMenu.html.docTag.eventListeners.length, 1);
        chai.assert.equal(headerMenu.html.docTag.eventListeners[0].key, "click");
    });
    it('should initialize pages container with regex generation page', () => {
        let pagesContainer = new ElementMock();
        const headerMenu = new HeaderMenu(pagesContainer, "TEST");
        chai.assert.equal(pagesContainer.childs[0].innerHTML, new RegexGenerationPage().html.innerHTML);
    });
    describe('when contact tag element is clicked', function () {
        it('should insert associated html template in pages element', () => {
            let pagesContainer = new ElementMock();
            const headerMenu = new HeaderMenu(pagesContainer, "TEST");
            headerMenu.html = buildMock();
            headerMenu.makeComponentInteractable(pagesContainer, "TEST");

            headerMenu.html.contactTag.eventListeners[0].callback();
            chai.assert.equal(pagesContainer.innerHTML, "<div>CONTACT</div>")
        });
        describe('when doc tag element is then called', function () {
            it('should insert the doc html template', () => {
                let pagesContainer = new ElementMock();
                const headerMenu = new HeaderMenu(pagesContainer, "TEST");
                headerMenu.html = buildMock();
                headerMenu.makeComponentInteractable(pagesContainer, "TEST");

                headerMenu.html.contactTag.eventListeners[0].callback();
                headerMenu.html.docTag.eventListeners[0].callback();
                chai.assert.equal(pagesContainer.innerHTML, "<div>DOC</div>")
            })
        });
    });
});