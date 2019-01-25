// !!! I USE OCCASION BESIDES EVENTS BRCAUSE EVENTS IS A SYSTEM CLASS AND THERE IS INTERFERENCE
class Occasion {
    constructor(name, isForKids) {
        if (typeof (name) !== 'string' || typeof (isForKids) !== 'boolean') {
            return console.log("Unvalid occasion!");
        }
        this.id = Occasion.incrementId();
        this.name = name;
        this.isForKids = isForKids;
        this.clients = [];
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}

class Client {
    constructor(firstName, lastName, gender, age) {
        if (typeof (firstName, lastName, gender) !== 'string' || typeof (age) !== 'number') {
            return console.log("Unvalid client!");
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
    }
}

//Main Collection of all Occasions
let occasionsCollection = [];

var OccasionsOrganizer = {
    storeListOfOccasions: function (occasions) {
        if (arguments.length !== 1 || !Array.isArray(occasions)) {
            return console.log("Please provide a collection with occasions!");
        }

        for (let i = 0; i < occasions.length; i++) {
            occasionsCollection.push(occasions[i]);
        }
    },

    showOccasions: function () {
        if (arguments.length != 0) {
            return console.log("Invalid method 'OccasionOrganizer.showOccasions()' !\nNo arguments allowed in this method!");
        }
        if (occasionsCollection.length < 1) {
            return console.log("No occasions avaliable");
        }

        for (let i = 0; i < occasionsCollection.length; i++) {
            if (occasionsCollection[i].isForKids === true) {
                console.log(`${occasionsCollection[i].id}. ${occasionsCollection[i].name} : All ages`);
            } else {
                console.log(`${occasionsCollection[i].id}. ${occasionsCollection[i].name} : 18+`);
            }
        }
    },

    deleteOccasion: function (occasionId) {
        if (occasionsCollection.length < 1) {
            return console.log("No occasions avaliable. Delete operation canceled!");
        }
        if (arguments.length !== 1 || (typeof (occasionId) !== 'number' && occasionId < 1)) {
            return console.log("Please provide only occasion id (id > 0)");
        }

        console.log(`Occasion -> 'id:${occasionId}, name:${occasionsCollection[occasionId-1].name}' <- was deleted successfuly!`);
        occasionsCollection.splice(occasionId - 1, 1);
    }
}

// Testing
t1();
t2();
t3();
console.log(occasionsCollection);