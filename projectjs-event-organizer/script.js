let Event = class {
    constructor(name, isForKids) {
        if (typeof (name) !== 'string' || typeof (isForKids) !== 'boolean') {
            return console.log("Unvalid event!");
        }
        this.id = Event.incrementId();
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

let Client = class {
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

//Main Collection of all Events
let eventsCollection = [];

var EventsOrganizer = {
    storeListOfEvents: function (events) {
        if (arguments.length !== 1 || !Array.isArray(events)) {
            return console.log("Please provide a collection with events!");
        }

        for (var i = 0; i < events.length; i++) {
            eventsCollection.push(events[i]);
        }

        console.log(`Events list was stored successfuly!`);
    },

    showEvents: function () {
        if (arguments.length != 0) {
            return console.log("Invalid method 'EventsOrganizer.showEvents()' !\nNo arguments allowed in this method!");
        }
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable");
        }

        console.log("Events:");
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].isForKids === true) {
                console.log(`${eventsCollection[i].id}. ${eventsCollection[i].name} : All ages`);
            } else {
                console.log(`${eventsCollection[i].id}. ${eventsCollection[i].name} : 18+`);
            }
        }
    },

    deleteEvent: function (eventId) {
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Delete operation failed!");
        }
        if (arguments.length !== 1 || typeof (eventId) !== 'number' || eventId < 1) {
            return console.log("Please provide only event id (id > 0)");
        }

        var objectFound;
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].id === eventId) {
                objectFound = i;
                break;
            }
        }

        if (!objectFound) {
            return console.log("Event with this id not found! Delete operation canceled!");
        } else {
            console.log(`Event -> 'id:${eventsCollection[objectFound].id}, name:${eventsCollection[objectFound].name}' <- was deleted successfuly!`);
            eventsCollection.splice(objectFound, 1);
        }

    },

    addEvent: function (name, isForKids = true) {
        if (arguments.length < 1 || arguments.length > 2) {
            return console.log("Please specify these arguments: name and isForKids(optional) !");
        }
        if (typeof (name) !== 'string' || typeof (isForKids) !== 'boolean') {
            return console.log("Unvalid arguments found!\n\tname must be a string!\n\tisForKids must be a boolean!\nAdd operation failed!");
        }
        var event = new Event(name, isForKids);
        eventsCollection.push(event);

        console.log(`Event -> 'id:${Event.latestId}, name:${name}' <- was added successfuly!`);
    },

    updateEvent: function (eventId, newName, newIsForKids = true) {
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Update operation failed!");
        }
        if (arguments.length < 1 || arguments.length > 3) {
            return console.log("Please specify these arguments: eventId, name and isForKids(optional) !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1 || typeof (newName) !== 'string' || typeof (newIsForKids) !== 'boolean') {
            return console.log("Unvalid arguments found!\n\eventId must be interger greater than 0 !\n\tname must be a string!\n\tisForKids must be a boolean!\nUpdate operation failed!");
        }

        var objectFound;
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].id === eventId) {
                objectFound = i;
                break;
            }
        }

        if (!objectFound) {
            return console.log("Event with this id not found! Update operation canceled!");
        } else {
            var savedLastId = Event.latestId;
            Event.latestId = eventId - 1;
            eventsCollection.splice(objectFound, 1);
            var newEvent = new Event(newName, newIsForKids);
            eventsCollection.splice(objectFound, 0, newEvent);
            Event.latestId = savedLastId;

            console.log(`Event -> 'id:${eventId}' <- was updated successfuly!`);
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
console.log(eventsCollection);