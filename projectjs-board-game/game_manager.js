class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.knights = [new Knight(), new Knight()];
        this.elfs = [new Elf(), new Elf()];
        this.dwarfs = [new Dwarf(), new Dwarf()];
    }
}

let GameManager = {
    // Varibales
    canvas: null,
    context: null,
    fieldCollection: [Box],
    playersCollection: [Player],
    playersOptions: {},

    // Attach the html canvas into variables
    initialize: function (cssSelectorElement) {
        // Set the canvas and context
        this.canvas = document.querySelector(cssSelectorElement);
        this.context = this.canvas.getContext("2d");
        // Fix the blurriness of the drawings
        this.context.translate(0.5, 0.5);
    },

    // Creating the players
    createPlayers: function () {
        this.playersCollection.push(new Player("Player A", "red"));
        this.playersCollection.push(new Player("Player B", "black"));
    },

    // Makes the basic field view
    drawField: function () {
        // Clear the previous field
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Making the board grid with boxes
        for (let i = 0; i < 7; i++) {
            for (let k = 0; k < 9; k++) {
                this.context.beginPath();
                // Styling for every row
                switch (true) {
                    case (i === 0 && k % 2 === 0):
                        this.context.fillStyle = "gray";
                        break;
                    case (i === 0 && k % 2 !== 0):
                        this.context.fillStyle = "black";
                        break;
                    case (i === 1 && k % 2 === 0):
                        this.context.fillStyle = "black";
                        break;
                    case (i === 1 && k % 2 !== 0):
                        this.context.fillStyle = "gray";
                        break;
                    case (i > 1 && i < 5):
                        this.context.fillStyle = "lightgray";
                        break;
                    case (i === 5 && k % 2 === 0):
                        this.context.fillStyle = "black";
                        break;
                    case (i === 5 && k % 2 !== 0):
                        this.context.fillStyle = "gray";
                        break;
                    case (i === 6 && k % 2 === 0):
                        this.context.fillStyle = "gray";
                        break;
                    case (i === 6 && k % 2 !== 0):
                        this.context.fillStyle = "black";
                        break;
                }
                // Make box instance, draw stroke rect and fill the figure
                var box = new Box((k * 22 + 10), (i * 17 + 10), 20, 15);
                this.context.strokeRect(box.x, box.y, box.width, box.height);
                this.context.fillRect(box.x, box.y, box.width, box.height);
                // Add the box to the field
                this.fieldCollection.push(box);
                this.context.closePath();
            }
        }
    },

    // Display the box on the right with player options
    drawPlayerOptions: function () {
        this.context.beginPath();
        this.context.strokeStyle = "red";
        this.context.strokeRect(215, 20, 80, 100);
        this.context.closePath();

        this.context.beginPath();
        this.context.strokeStyle = "black";
        this.context.font = "10px Georgia";
        this.context.strokeText("Options", 235, 30);
        this.context.closePath();
    },

    // Events
    addEvents: function() {
        this.canvas.addEventListener("click", function(e) {
            console.log(e);
            for (let i = 0; i < this.fieldCollection.length; i++) {
                const element = this.fieldCollection[i];
                if((e.layerX >= element.x && e.layerX <= element.x+element.width) && (e.layerY >= element.y && e.layerY <= element.y+element.height)) {
                    element.width += 5;
                    element.height += 5;
                }
            }
        });
    },

    // Dice simulator
    rollDice: function (maxIncluded) {
        return Math.ceil(Math.random() * Math.floor(maxIncluded));
    }
}