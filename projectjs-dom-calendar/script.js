// DOM Library
let DOMco = {
    //Get Element
    getElement: function (cssSelector) {
        //Guards
        if (arguments.length !== 1 || typeof (cssSelector) !== 'string') {
            return console.log(`Please specify this argument: selector as string !`);
        }
        if (document.querySelector(cssSelector) === null) {
            return console.log(`There is no such element foud with that cssSelector!`);
        }

        return document.querySelector(cssSelector);
    },

    //Add child elements
    addChildToElement: function (element, childElement) {
        //Guards
        if (arguments.length !== 2 || typeof (childElement) !== 'string' || !(element instanceof Node)) {
            return console.log(`Please specify these arguments:\n\t- element as instanceof Node\n\t- childElement as string`);
        }

        var child = document.createElement(childElement);
        element.appendChild(child);

        return child;
    },

    //Delete element
    deleteElement: function (element) {
        //Guards
        if (arguments.length !== 1 || !(element instanceof Node)) {
            return console.log(`Please specify this argument: element as instanceof Node !`);
        }

        element.remove();
    },

    //Change attr of element
    changeElementAttribute: function (element, attr, newValue) {
        //Guards
        var avaliableAttr = ["id", "class", "data", "name"];
        if (arguments.length !== 3 || typeof (attr, newValue) !== 'string' || !(element instanceof Node)) {
            return console.log(`Please specify these arguments:\n\t- element as instanceof Node\n\t- attr as string\n\t- newValue as string`);
        }
        if (avaliableAttr.findIndex(a => a === attr.toLowerCase()) === -1) {
            return console.log(`This attribute you want to change is unvalid!\n\tUse one of these: "id,class,data,name"`);
        }

        element.setAttribute(attr, newValue);
    }
}

//Testing
//Exercise 1
var element1 = DOMco.getElement("#ex1");
console.log(element1);
//Exercise 2
var element2 = DOMco.getElement("#ex2");
var newElement = DOMco.addChildToElement(element2, "p");
newElement.innerText = "This is child element added with DOMco Lib!";
console.log(newElement);
//Exercise 3
var element3 = DOMco.getElement("#ex3");
DOMco.deleteElement(element3);
//Exercise 4 a
var element4a = DOMco.getElement("#ex4a");
DOMco.changeElementAttribute(element4a, "id", "cex4a");
DOMco.changeElementAttribute(element4a, "class", "text-center");
DOMco.changeElementAttribute(element4a, "data", "Yo! This is the data attr");
DOMco.changeElementAttribute(element4a, "name", "This is name attr");
console.log(element4a);