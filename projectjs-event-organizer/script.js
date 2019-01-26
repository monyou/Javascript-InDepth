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
    constructor(firstName, lastName, age, gender) {
        if (arguments.length !== 4) {
            return console.log("Please specify these arguments: firstName, lastName, age and gender");
        }
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
                console.log(`\t${eventsCollection[i].id}. ${eventsCollection[i].name} : All ages`);
            } else {
                console.log(`\t${eventsCollection[i].id}. ${eventsCollection[i].name} : 18+`);
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

        var eventFoundI;
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].id === eventId) {
                eventFoundI = i;
                break;
            }
        }

        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Delete operation canceled!");
        } else {
            console.log(`Event -> 'id:${eventsCollection[eventFoundI].id}, name:${eventsCollection[eventFoundI].name}' <- was deleted successfuly!`);
            eventsCollection.splice(eventFoundI, 1);
        }

    },

    addEvent: function (name, isForKids = true) {
        if (arguments.length < 1 || arguments.length > 2) {
            return console.log("Please specify these arguments: name and isForKids(optional) !");
        }
        if (typeof (name) !== 'string' || typeof (isForKids) !== 'boolean') {
            return console.log("Unvalid arguments found:\n\t- name must be a string!\n\t- isForKids must be a boolean!\nAdd operation failed!");
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
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0 !\n\t- name must be a string!\n\t- isForKids must be a boolean!\nUpdate operation failed!");
        }

        var eventFoundI;
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].id === eventId) {
                eventFoundI = i;
                break;
            }
        }

        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Update operation canceled!");
        } else {
            var savedLastId = Event.latestId;
            Event.latestId = eventId - 1;
            eventsCollection.splice(eventFoundI, 1);
            var newEvent = new Event(newName, newIsForKids);
            eventsCollection.splice(eventFoundI, 0, newEvent);
            Event.latestId = savedLastId;

            console.log(`Event -> 'id:${eventId}' <- was updated successfuly!`);
        }
    },

    addClientToEvent: function (client, eventId) {
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Add client to event - operation failed!");
        }
        if (arguments.length != 2) {
            return console.log("Please specify these arguments: client and eventId !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1 || !(client instanceof Client)) {
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0 !\n\t- client must be an instance of Client!\nAdd client to event - operation failed!");
        }

        var eventFoundI;
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].id === eventId) {
                eventFoundI = i;
                break;
            }
        }

        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Add client to event - operation failed!");
        } else {
            if (eventsCollection[eventFoundI].isForKids === false && client.age < 18) {
                return console.log("This client is young for that event! Add client to this event - canceled!");
            } else {
                eventsCollection[eventFoundI].clients.push(client);
                console.log(`Client successfuly added to the event -> '${eventsCollection[eventFoundI].name}'`);
            }
        }
    },

    showClientsOfEvent: function (eventId, genderFilter = "") {
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Show client of event - operation failed!");
        }
        if (arguments.length < 1 || arguments.length > 2) {
            return console.log("Please specify these arguments: eventId and gender filter(optional) !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1 || typeof (genderFilter) !== "string") {
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0 !\n\t- genderFilter must be a string\nShow clients of event - operation failed!");
        }

        var eventFoundI;
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].id === eventId) {
                eventFoundI = i;
                break;
            }
        }

        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Show clients of event - operation failed!");
        } else if (eventsCollection[eventFoundI].clients.length < 1) {
            return console.log(`There are no clients in the event - '${eventsCollection[eventFoundI].name}'`);
        } else {
            if (genderFilter !== "") {
                if (genderFilter === "male") {
                    console.log(`Males in the event - '${eventsCollection[eventFoundI].name}':`);
                } else {
                    console.log(`Females in the event - '${eventsCollection[eventFoundI].name}':`);
                }
                for (let i = 0; i < eventsCollection[eventFoundI].clients.length; i++) {
                    const client = eventsCollection[eventFoundI].clients[i];
                    if (client.gender === genderFilter) {
                        console.log(`\t${client.firstName} ${client.lastName}, ${client.age}`);
                    }
                }
            } else {
                console.log(`Clients in the event - '${eventsCollection[eventFoundI].name}':`)
                for (let i = 0; i < eventsCollection[eventFoundI].clients.length; i++) {
                    const client = eventsCollection[eventFoundI].clients[i];
                    console.log(`\t${client.firstName} ${client.lastName}, ${client.age}`);
                }
            }
        }
    },

    deleteClientFromEvent: function (client, eventId) {
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Delete client from event - operation failed!");
        }
        if (arguments.length != 2) {
            return console.log("Please specify these arguments: client and eventId !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1 || !(client instanceof Client)) {
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0 !\n\t- client must be an instance of Client!\nDelete client from event - operation failed!");
        }

        var eventFoundI;
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].id === eventId) {
                eventFoundI = i;
                break;
            }
        }

        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Delete client from event - operation failed!");
        } else {
            var clientFoundI;
            for (var i = 0; i < eventsCollection[eventFoundI].clients.length; i++) {
                const clientInEvent = eventsCollection[eventFoundI].clients[i];
                if (clientInEvent.firstName === client.firstName && clientInEvent.lastName === client.lastName && clientInEvent.age === client.age) {
                    clientFoundI = i;
                    break;
                }
            }

            if (clientFoundI < 0) {
                return console.log(`Client: '${client.firstName} ${client.lastName}, ${client.age}' is not found! Delete client from event - operation failed!`);
            } else {
                console.log(`Client -> '${client.firstName} ${client.lastName}, ${client.age}' <- was deleted successfuly!`);
                eventsCollection[eventFoundI].clients.splice(clientFoundI, 1);
            }
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
t6();
console.log("===================================================================");
t7();
console.log("===================================================================");
t8();
console.log("===================================================================");
console.log(eventsCollection);