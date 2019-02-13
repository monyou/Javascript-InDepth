var Testing = function () {
    //Exercise 1
    var element1 = DOMco.getElement("#ex1").element;
    console.log(element1);
    console.log('================================================================================');
    //Exercise 2
    DOMco.getElement("#ex2").addChild("p");
    DOMco.getElement("#ex2>p").element.innerText = "This is child element added with DOMco Lib!";
    console.log(DOMco.element);
    console.log('================================================================================');
    //Exercise 3
    DOMco.getElement("#ex3").delete();
    //Exercise 4
    // a)
    var element4a = DOMco.getElement("#ex4").addId("cex4").addClass("text-center").addData("Yo! This is the data attr").addName("This is name attr").element;
    console.log(element4a);
    console.log('================================================================================');
    // b)
    var element4b = DOMco.getElement("#cex4").changeText("This text is added with changeText method");
    console.log(element4b);
    console.log('================================================================================');
    // c)
    var element4c = DOMco.getElement("#cex4").changeHTML("<p>Added this paragraph with method changeHTML</p>");
    console.log(element4c);
    // d)
    DOMco.getElement("#cex4").addStyle("background-color", "red");
    DOMco.getElement("#cex4").addStyles({
        "width": "50%",
        "border-radius": "10px;",
        "background-color": "green",
        "margin": "0 auto",
        "color": "lightgray"
    });
    // Excercise 5
    console.log(DOMco.getElement('#ex5').getParent().element);
    console.log(DOMco.getElement('#ex5').getPrevSibling().element);
    console.log(DOMco.getElement('#ex5').getNextSibling().element);
    console.log(DOMco.getElement('body').getChildren().element);
    // Exercise 6
    DOMco.getElement('#cex4').addEvent("click", function () {
        alert("TEST CLICK !");
    });
}