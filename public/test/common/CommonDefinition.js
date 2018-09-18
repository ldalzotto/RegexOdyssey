class ElementMock {
    constructor(selectorsObjects, selectorAllObject) {
        this.eventListeners = [];
        this.childs = [];
        this.html = document.createElement("div");
        this.selectorsObjects = selectorsObjects;
        this.selectorAllObject = selectorAllObject;
        this.classList = new ClassList();
        this.boundingClientRect = {};
        this.style = {};
    }

    addEventListener(key, callback) {
        this.eventListeners.push({key: key, callback: callback})
    }

    appendChild(childNode) {
        this.childs.push(childNode);
        this.html.appendChild(childNode);
    }

    querySelector(selector) {
        return this.selectorsObjects[selector];
    }

    querySelectorAll(selector) {
        return this.selectorAllObject[selector];
    }

    getBoundingClientRect() {
        return this.boundingClientRect;
    }

}

class ClassList {
    constructor() {
        this.classes = [];
    }

    add(classname) {
        if (!this.classes.includes(classname)) {
            this.classes.push(classname)
        }
    }

    remove(classname) {
        if (this.classes.includes(classname)) {
            this.classes.splice(this.classes.indexOf(classname), 1);
        }
    }

    contains(classname) {
        return this.classes.includes(classname);
    }
}

var includeHTML = function () {

};