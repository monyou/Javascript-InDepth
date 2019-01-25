// !!! I USE OCCASION INSTEAD EVENTS BRCAUSE EVENTS IS A SYSTEM CLASS AND THERE IS INTERFERENCE
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

        for (var i = 0; i < occasions.length; i++) {
            occasionsCollection.push(occasions[i]);
        }

        console.log(`Occasion list was stored successfuly!`);
    },

    showOccasions: function () {
        if (arguments.length != 0) {
            return console.log("Invalid method 'OccasionOrganizer.showOccasions()' !\nNo arguments allowed in this method!");
        }
        if (occasionsCollection.length < 1) {
            return console.log("No occasions avaliable");
        }

        console.log("Occasions:");
        for (var i = 0; i < occasionsCollection.length; i++) {
            if (occasionsCollection[i].isForKids === true) {
                console.log(`${occasionsCollection[i].id}. ${occasionsCollection[i].name} : All ages`);
            } else {
                console.log(`${occasionsCollection[i].id}. ${occasionsCollection[i].name} : 18+`);
            }
        }
    },

    deleteOccasion: function (occasionId) {
        if (occasionsCollection.length < 1) {
            return console.log("No occasions avaliable. Delete operation failed!");
        }
        if (arguments.length !== 1 || typeof (occasionId) !== 'number' || occasionId < 1) {
            return console.log("Please provide only occasion id (id > 0)");
        }

        var objectFound;
        for (var i = 0; i < occasionsCollection.length; i++) {
            if (occasionsCollection[i].id === occasionId) {
                objectFound = i;
                break;
            }
        }

        if (!objectFound) {
            return console.log("Occasion with this id not found! Delete operation canceled!");
        } else {
            console.log(`Occasion -> 'id:${occasionsCollection[objectFound].id}, name:${occasionsCollection[objectFound].name}' <- was deleted successfuly!`);
            occasionsCollection.splice(objectFound, 1);
        }

    },

    addOccasion: function (name, isForKids = true) {
        if (arguments.length < 1 || arguments.length > 2) {
            return console.log("Please specify these arguments: name and isForKids(optional) !");
        }
        if (typeof (name) !== 'string' || typeof (isForKids) !== 'boolean') {
            return console.log("Unvalid arguments found!\n\tname must be a string!\n\tisForKids must be a boolean!\nAdd operation failed!");
        }
        var occasion = new Occasion(name, isForKids);
        occasionsCollection.push(occasion);

        console.log(`Occasion -> 'id:${Occasion.latestId}, name:${name}' <- was added successfuly!`);
    },

    updateOccasion: function (occasionId, newName, newIsForKids = true) {
        if (occasionsCollection.length < 1) {
            return console.log("No occasions avaliable. Update operation failed!");
        }
        if (arguments.length < 1 || arguments.length > 3) {
            return console.log("Please specify these arguments: occasionID, name and isForKids(optional) !");
        }
        if (typeof (occasionId) !== 'number' || occasionId < 1 || typeof (newName) !== 'string' || typeof (newIsForKids) !== 'boolean') {
            return console.log("Unvalid arguments found!\n\toccasionId must be interger greater than 0 !\n\tname must be a string!\n\tisForKids must be a boolean!\nUpdate operation failed!");
        }

        var objectFound;
        for (var i = 0; i < occasionsCollection.length; i++) {
            if (occasionsCollection[i].id === occasionId) {
                objectFound = i;
                break;
            }
        }

        if (!objectFound) {
            return console.log("Occasion with this id not found! Update operation canceled!");
        } else {
            var savedLastId = Occasion.latestId;
            Occasion.latestId = occasionId - 1;
            occasionsCollection.splice(objectFound, 1);
            var newOccasion = new Occasion(newName, newIsForKids);
            occasionsCollection.splice(objectFound, 0, newOccasion);
            Occasion.latestId = savedLastId;

            console.log(`Occasion -> 'id:${occasionId}' <- was updated successfuly!`);
        }
    }
}

// Testing
t1();
console.log("===================================================================");
t2();
console.log("===================================================================");
t3();
console.log("===================================================================");
t4();
console.log("===================================================================");
t5();
console.log("===================================================================");
console.log(occasionsCollection);