class ElementMock {
    constructor() {
        this.eventListeners = [];
    }

    addEventListener(key, callback) {
        this.eventListeners.push({key: key, callback: callback})
    }
}

var includeHTML = function () {

};