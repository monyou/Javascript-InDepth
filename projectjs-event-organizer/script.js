//Variables
let eventsCollection = [];
let systemOffForAddOperations = false;

//Structures
let Event = class {
    constructor(name, isForKids = true, date = "") {
        if (arguments.length < 1 || arguments.length > 3) {
            return console.log("Please specify these arguments: name and isForKids(optional) !");
        }
        if (typeof (name) !== 'string' || typeof (isForKids) !== 'boolean' || typeof (date) !== 'string') {
            return console.log("Unvalid event!");
        }

        this.id = Event.incrementId();
        this.name = name;
        this.isForKids = isForKids;
        this.date = date;
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

//Main
var EventsOrganizer = {
    //Helpful methods
    findEvent: function (eventId) {
        //Guards
        if (arguments.length !== 1 || typeof (eventId) !== 'number' || eventId < 1) {
            return console.log("Please provide only eventId (integer greater than 0) !");
        }

        var eventFoundI;
        for (var i = 0; i < eventsCollection.length; i++) {
            if (eventsCollection[i].id === eventId) {
                eventFoundI = i;
                break;
            }
        }
        return eventFoundI;
    },

    //Functionality

    storeListOfEvents: function (events) {
        //Guards
        if (systemOffForAddOperations) {
            return console.log("System is OFF for that type operation! Check back soon...")
        }
        if (arguments.length !== 1 || !Array.isArray(events)) {
            return console.log("Please provide a collection with events!");
        }

        //Store functionality
        for (var i = 0; i < events.length; i++) {
            eventsCollection.push(events[i]);
        }
        console.log(`Events list was stored successfuly!`);
    },

    showEvents: function () {
        //Guards
        if (arguments.length != 0) {
            return console.log("Invalid method 'EventsOrganizer.showEvents()' !\nNo arguments allowed in this method!");
        }
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable");
        }

        //Display functionality
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
        //Guards
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Delete operation failed!");
        }
        if (arguments.length !== 1 || typeof (eventId) !== 'number' || eventId < 1) {
            return console.log("Please provide only event id (id > 0)");
        }

        //Checks if there is an event with that id
        var eventFoundI = EventsOrganizer.findEvent(eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Delete operation canceled!");
        } else {
            //Delete functionality
            console.log(`Event -> 'id:${eventsCollection[eventFoundI].id}, name:${eventsCollection[eventFoundI].name}' <- was deleted successfuly!`);
            eventsCollection.splice(eventFoundI, 1);
        }

    },

    addEvent: function (event) {
        //Guards
        if (systemOffForAddOperations) {
            return console.log("System is OFF for that type operation! Check back soon...")
        }
        if (arguments.length !== 1) {
            return console.log("Please specify these arguments: event !");
        }
        if (!(event instanceof Event)) {
            return console.log("Unvalid arguments found:\n\t- event must be an instance of Event class\nAdd operation failed!");
        }

        //Add functionality
        eventsCollection.push(event);
        console.log(`Event -> 'id:${Event.latestId}, name:${name}' <- was added successfuly!`);
    },

    updateEvent: function (eventId, newEvent) {
        //Guards
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Update operation failed!");
        }
        if (arguments.length !== 2) {
            return console.log("Please specify these arguments: eventId and newEvent !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1 || !(newEvent instanceof Event)) {
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0\n\t- newEvent must be an instance of Event class\nUpdate operation failed!");
        }

        //Checks if there is an event with that id
        var eventFoundI = EventsOrganizer.findEvent(eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Update operation canceled!");
        } else {
            //Update functionality
            eventsCollection.splice(eventFoundI, 1);
            //Keeps the id the same
            newEvent.id = eventId;
            eventsCollection.splice(eventFoundI, 0, newEvent);
            console.log(`Event -> 'id:${eventId}' <- was updated successfuly!`);
        }
    },

    addClientToEvent: function (client, eventId) {
        //Guards
        if (systemOffForAddOperations) {
            return console.log("System is OFF for that type operation! Check back soon...")
        }
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Add client to event - operation failed!");
        }
        if (arguments.length != 2) {
            return console.log("Please specify these arguments: client and eventId !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1 || !(client instanceof Client)) {
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0 !\n\t- client must be an instance of Client!\nAdd client to event - operation failed!");
        }

        //Checks if there is an event with that id
        var eventFoundI = EventsOrganizer.findEvent(eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Add client to event - operation failed!");
        } else {
            //Add client ot event logic
            if (eventsCollection[eventFoundI].isForKids === false && client.age < 18) {
                return console.log("This client is young for that event! Add client to this event - canceled!");
            } else {
                eventsCollection[eventFoundI].clients.push(client);
                console.log(`Client successfuly added to the event -> '${eventsCollection[eventFoundI].name}'`);
            }
        }
    },

    showClientsOfEvent: function (eventId, genderFilter = "") {
        //Guards
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Show client of event - operation failed!");
        }
        if (arguments.length < 1 || arguments.length > 2) {
            return console.log("Please specify these arguments: eventId and gender filter(optional) !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1 || typeof (genderFilter) !== "string") {
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0 !\n\t- genderFilter must be a string\nShow clients of event - operation failed!");
        }

        //Checks if there is an event with that id
        var eventFoundI = EventsOrganizer.findEvent(eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Show clients of event - operation failed!");
        } else if (eventsCollection[eventFoundI].clients.length < 1) {
            return console.log(`There are no clients in the event - '${eventsCollection[eventFoundI].name}'`);
        } else {
            //Show functionality based on the gender arg if exists
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
        //Guards
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Delete client from event - operation failed!");
        }
        if (arguments.length != 2) {
            return console.log("Please specify these arguments: client and eventId !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1 || !(client instanceof Client)) {
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0 !\n\t- client must be an instance of Client!\nDelete client from event - operation failed!");
        }

        //Checks if there is an event with that id
        var eventFoundI = EventsOrganizer.findEvent(eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Delete client from event - operation failed!");
        } else {
            //Checks if client exist in this event
            var clientFoundI;
            for (var i = 0; i < eventsCollection[eventFoundI].clients.length; i++) {
                const clientInEvent = eventsCollection[eventFoundI].clients[i];
                if (clientInEvent.firstName === client.firstName && clientInEvent.lastName === client.lastName && clientInEvent.age === client.age) {
                    clientFoundI = i;
                    break;
                }
            }

            //Delete functionality
            if (clientFoundI < 0) {
                return console.log(`Client: '${client.firstName} ${client.lastName}, ${client.age}' is not found! Delete client from event - operation failed!`);
            } else {
                console.log(`Client -> '${client.firstName} ${client.lastName}, ${client.age}' <- was deleted successfuly!`);
                eventsCollection[eventFoundI].clients.splice(clientFoundI, 1);
            }
        }
    },

    stopSystemForAddOperations: function () {
        //Guards
        if (arguments.length != 0) {
            return console.log("This method doesn't have arguments!");
        }

        //Active the flag
        systemOffForAddOperations = true;
    },

    showEventWithMaxClients: function () {
        //Guards
        if (arguments.length != 0) {
            return console.log("This method doesn't have arguments!");
        }
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Show event with max clients - operation failed!");
        }

        var clientsInEvent = 0;
        var eventWithMaxClients;
        for (let i = 0; i < eventsCollection.length; i++) {
            const event = eventsCollection[i];
            if (event.clients.length > clientsInEvent) {
                clientsInEvent = event.clients.length;
                eventWithMaxClients = event;
            }
        }

        console.log(`Event '${eventWithMaxClients.name}' has the most clients -> ${clientsInEvent}`);
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
ta11();
console.log("===================================================================");
ta13();
console.log("===================================================================");
console.log(eventsCollection);