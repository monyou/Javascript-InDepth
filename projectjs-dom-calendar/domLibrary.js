// DOM Library
let DOMco = {
    // Properties
    element: Element,

    //Get Element
    getElement: function (cssSelector) {
        //Guards
        if (arguments.length !== 1 || typeof (cssSelector) !== 'string') {
            return console.log(`Please specify this argument: selector as string !`);
        }
        if (document.querySelector(cssSelector) === null) {
            return console.log(`There is no such element foud with that cssSelector!`);
        }

        this.element = document.querySelector(cssSelector);
        return this;
    },

    //Add child elements
    addChild: function (childElement) {
        //Guards
        if (arguments.length !== 1 || typeof (childElement) !== 'string') {
            return console.log(`Please specify this argument: childElement as string`);
        }

        var child = document.createElement(childElement);
        this.element.appendChild(child);

        return this;
    },

    //Delete element
    delete: function () {
        //Guards
        if (arguments.length !== 0) {
            return console.log(`No arguments allowed in this method !`);
        }

        this.element.remove();
        return this;
    },

    //Change attributes of element
    addId: function (id) {
        //Guards
        if (arguments.length !== 1 || typeof (id) !== 'string') {
            return console.log(`Please specify this argument: id as string`);
        }

        this.element.setAttribute("id", id);
        return this;
    },
    addClass: function (className) {
        //Guards
        if (arguments.length !== 1 || typeof (className) !== 'string') {
            return console.log(`Please specify this argument: className as string`);
        }

        this.element.setAttribute("class", className);
        return this;
    },
    addData: function (data) {
        //Guards
        if (arguments.length !== 1 || typeof (data) !== 'string') {
            return console.log(`Please specify this argument: data as string`);
        }

        this.element.setAttribute("data", data);
        return this;
    },
    addName: function (name) {
        //Guards
        if (arguments.length !== 1 || typeof (name) !== 'string') {
            return console.log(`Please specify this argument: name as string`);
        }

        this.element.setAttribute("name", name);
        return this;
    },

    // Change the inner text and return the new one
    changeText: function (newText) {
        //Guards
        if (arguments.length !== 1 || typeof (newText) !== 'string') {
            return console.log(`Please specify this argument: newText as string`);
        }

        this.element.innerText = newText;
        return newText;
    },

    // Change the inner html and return the new one
    changeHTML: function (newHTML) {
        //Guards
        if (arguments.length !== 1 || typeof (newHTML) !== 'string') {
            return console.log(`Please specify this argument: newHTML as string`);
        }

        this.element.innerHTML = newHTML;
        return newHTML;
    },

    // Change styles of element
    addStyle: function (styleKey, styleValue) {
        //Guards
        if (arguments.length !== 2 || typeof (styleKey, styleValue) !== 'string') {
            return console.log(`Please specify these arguments:\n\t - styleKey as string\n\t - styleValue as string`);
        }

        this.element.setAttribute("style", `${styleKey}: ${styleValue};`);
        return this;
    },
    addStyles: function (styles) {
        //Guards
        if (arguments.length !== 1 || !(styles instanceof Object)) {
            return console.log(`Please specify this argument: styles as object`);
        }

        // Get all keys values of styles and make a proper string
        var stringStyles = "";
        for (const [styleKey, styleValue] of Object.entries(styles)) {
            stringStyles += `${styleKey}: ${styleValue};`;
        }

        this.element.setAttribute("style", stringStyles);
        return this;
    },

    // Traversing methods
    getParent: function () {
        //Guards
        if (arguments.length !== 0) {
            return console.log(`No arguments allowed in this method !`);
        }

        this.element = this.element.parentElement;
        return this;
    },
    getPrevSibling: function () {
        //Guards
        if (arguments.length !== 0) {
            return console.log(`No arguments allowed in this method !`);
        }

        this.element = this.element.previousElementSibling;
        return this;
    },
    getNextSibling: function () {
        //Guards
        if (arguments.length !== 0) {
            return console.log(`No arguments allowed in this method !`);
        }

        this.element = this.element.nextElementSibling;
        return this;
    },
    getChildren: function () {
        //Guards
        if (arguments.length !== 0) {
            return console.log(`No arguments allowed in this method !`);
        }

        this.element = this.element.children;
        return this;
    },

    // Event listener
    addEvent: function (event, callback) {
        //Guards
        if (arguments.length !== 2 || typeof (event) !== 'string' || !(callback instanceof Function)) {
            return console.log(`Please specify these arguments:\n\t - event as string\n\t - callback as function`);
        }

        this.element.addEventListener(event, callback);
        return this;
    }
}

// For testing uncomment below function
// Testing();