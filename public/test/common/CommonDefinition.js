class ElementMock {
    constructor() {
        this.eventListeners = [];
        this.childs = [];
        this.html = document.createElement("div");
    }

    addEventListener(key, callback) {
        this.eventListeners.push({key: key, callback: callback})
    }

    appendChild(childNode) {
        this.childs.push(childNode);
        this.html.appendChild(childNode);
    }
}

var includeHTML = function () {

};