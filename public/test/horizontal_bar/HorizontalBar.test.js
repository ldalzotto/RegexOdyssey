import {HorizontalBar} from '../../horizontal_bar/HorizontalBar.js';

beforeEach(() => {
    axios = {};
});

const buildNewMock = (allTriggerElements) => {

    const optionBarContent = new ElementMock();

    const arrow = new ElementMock();
    const optionBar = new ElementMock({
        ".content": optionBarContent
    });

    if (allTriggerElements === undefined) {
        allTriggerElements = [
            new ElementMock(), new ElementMock()
        ]
    }

    const barElement = new ElementMock({
        ".arrow": arrow,
        ".option-bar": optionBar
    }, {
        ".trigger": allTriggerElements
    });

    const htmlElement = new ElementMock({
        ".bar": barElement
    });

    htmlElement.bar = barElement;
    htmlElement.optionBarContent = optionBarContent;
    htmlElement.arrow = arrow;
    htmlElement.optionBar = optionBar;
    htmlElement.allTriggerElements = allTriggerElements;

    return htmlElement
};

describe('HorizontalBar', function () {
    describe('when created with title and innerHtmlContent', function () {
        it('should valuate the title element with input title', () => {
            const title = "TITLE";
            const horizontalBar = new HorizontalBar(title, {innerHTML: undefined});
            chai.assert.equal(horizontalBar.html.querySelector(".title").innerText, title);
        });

        it('should valuate the innerContent with input content html', () => {
            const innerHtml = "<div>TEST</div>";
            const horizontalBar = new HorizontalBar("TEST", {innerHTML: innerHtml});
            chai.assert.equal(horizontalBar.html.querySelector(".content").innerHTML.includes(innerHtml), true);
        });

        describe('when title and content is undefined', function () {
            it('should build horizontal bar with empty title', function () {
                const horizontalBar = new HorizontalBar(undefined, undefined);
                chai.assert.equal(horizontalBar.html.querySelector(".title").innerText, "undefined");
                chai.assert.equal(horizontalBar.html.querySelector(".content").innerText.includes("undefined"), true);
            });
        });
    });

    describe('when initialization is called', function () {
        it('should add a click event listener on all trigger elements', () => {
            const horizontalBar = new HorizontalBar();
            horizontalBar.html = buildNewMock();
            horizontalBar.makeComponentInteractable();
            const allTriggerElements = horizontalBar.html.allTriggerElements;
            for (let i = 0; i < allTriggerElements.length; i++) {
                chai.assert.equal(allTriggerElements[i].eventListeners[0].key, "click")
            }
        });
        describe('when there is no trigger elements', function () {
            it('should not add listeners', function () {
                const horizontalBar = new HorizontalBar();
                horizontalBar.html = buildNewMock([]);
                horizontalBar.makeComponentInteractable();
                const allTriggerElements = horizontalBar.html.allTriggerElements;
                chai.assert.equal(allTriggerElements.length, 0);
            });
        });
    });

    describe('when click event is triggered', function () {

        const hideAssertion = function (arrow, optionBar) {
            chai.assert.equal(arrow.classList.classes.includes("arrow-down"), false);
            chai.assert.equal(arrow.classList.classes.includes("arrow-left"), true);
            chai.assert.equal(optionBar.classList.classes.includes("all-border"), false);
            chai.assert.equal(optionBar.style.height, "1px");
        };

        const showAssertion = function (arrow, optionBar) {
            chai.assert.equal(arrow.classList.classes.includes("arrow-down"), true);
            chai.assert.equal(arrow.classList.classes.includes("arrow-left"), false);
            chai.assert.equal(optionBar.classList.classes.includes("all-border"), true);
        };

        describe('when bar is in show mode', function () {
            it('should hide', function () {
                const horizontalBar = new HorizontalBar();
                horizontalBar.html = buildNewMock();
                horizontalBar.makeComponentInteractable();
                const allTriggerElements = horizontalBar.html.allTriggerElements;
                allTriggerElements[0].eventListeners[0].callback();

                hideAssertion(horizontalBar.html.arrow, horizontalBar.html.optionBar);
            });
        });
        describe('when bar is in hide mode', function () {
            it('should show', () => {

                //window mock
                window.getComputedStyle = function () {
                    return {
                        marginTop: "9px"
                    }
                };

                const horizontalBar = new HorizontalBar();
                horizontalBar.html = buildNewMock();
                horizontalBar.makeComponentInteractable();
                const allTriggerElements = horizontalBar.html.allTriggerElements;
                horizontalBar.html.arrow.classList.add("arrow-left");
                horizontalBar.html.optionBarContent.boundingClientRect = {
                    height: 10
                };

                allTriggerElements[0].eventListeners[0].callback();

                showAssertion(horizontalBar.html.arrow, horizontalBar.html.optionBar);
                chai.assert.equal(horizontalBar.html.optionBar.style.height, `${10 + 9}px`)
            })
        });

    });
});