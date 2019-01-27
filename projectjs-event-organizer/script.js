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
                console.log(`\tId:${eventsCollection[i].id} - #${eventsCollection[i].name} : All ages`);
            } else {
                console.log(`\tId:${eventsCollection[i].id} - *${eventsCollection[i].name} : 18+`);
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
        var eventFoundI = eventsCollection.findIndex(e => e.id === eventId);
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
        var eventFoundI = eventsCollection.findIndex(e => e.id === eventId);
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
        var eventFoundI = eventsCollection.findIndex(e => e.id === eventId);
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
        var eventFoundI = eventsCollection.findIndex(e => e.id === eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Show clients of event - operation failed!");
        } else if (eventsCollection[eventFoundI].clients.length < 1) {
            return console.log(`There are no clients in the event - '${eventsCollection[eventFoundI].name}'`);
        } else {
            //Show functionality based on the gender argument(if exists)
            if (genderFilter !== "") {
                if (genderFilter === "male") {
                    console.log(`Males in the event - '${eventsCollection[eventFoundI].name}':`);
                } else {
                    console.log(`Females in the event - '${eventsCollection[eventFoundI].name}':`);
                }
                eventsCollection[eventFoundI].clients.filter(c => c.gender === genderFilter).forEach(client => {
                    console.log(`\t${client.firstName} ${client.lastName}, ${client.age}`);
                });
            } else {
                console.log(`Clients in the event - '${eventsCollection[eventFoundI].name}':`)
                eventsCollection[eventFoundI].clients.forEach(client => {
                    console.log(`\t${client.firstName} ${client.lastName}, ${client.age}`);
                });
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
        var eventFoundI = eventsCollection.findIndex(e => e.id === eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Delete client from event - operation failed!");
        } else {
            //Checks if client exist in this event
            var clientFoundI = eventsCollection[eventFoundI].clients.findIndex(c => c.firstName === client.firstName && c.lastName === client.lastName && c.age === client.age);
            if (clientFoundI < 0) {
                return console.log(`Client: '${client.firstName} ${client.lastName}, ${client.age}' is not found! Delete client from event - operation failed!`);
            } else {
                //Delete functionality
                console.log(`Client -> '${client.firstName} ${client.lastName}, ${client.age}' <- was deleted successfuly!`);
                eventsCollection[eventFoundI].clients.splice(clientFoundI, 1);
            }
        }
    },

    stopSystemForAddOperations: function () {
        //Guards
        if (arguments.length != 0) {
            return console.log("Invalid method 'EventsOrganizer.stopSystemForAddOperations()' !\nThis method doesn't have arguments!");
        }

        //Active the flag
        systemOffForAddOperations = true;
    },

    showEventWithMaxClients: function () {
        //Guards
        if (arguments.length != 0) {
            return console.log("Invalid method 'EventsOrganizer.showEventWithMaxClients()' !\nThis method doesn't have arguments!");
        }
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Show event with max clients - operation failed!");
        }

        //Finding the event with max clients
        var maxClientsInEvent = 0;
        for (let i = 0; i < eventsCollection.length; i++) {
            const event = eventsCollection[i];
            if (event.clients.length > maxClientsInEvent) {
                maxClientsInEvent = event.clients.length;
            }
        }
        //Checks if it's only one event with max clients
        var eventsWithMaxClients = eventsCollection.filter(e => e.clients.length === maxClientsInEvent);
        if (eventsWithMaxClients.length > 1) {
            console.log("Error! There are more than one event with max clients!");
        } else {
            console.log(`Event '${eventsWithMaxClients[0].name}' has the most clients -> ${maxClientsInEvent}`);
        }
    },

    showEventsForKids: function () {
        //Guards
        if (arguments.length != 0) {
            return console.log("Invalid method 'EventsOrganizer.showEventsForKids()' !\nThis method doesn't have arguments!");
        }

        //Filter and display events
        console.log("Events for kids:")
        eventsCollection.filter(e => e.isForKids).forEach(event => {
            console.log(`\tId:${event.id} - ${event.name}`);
        });
    },

    filterEvents: function (filterName, callback) {
        //Guards
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Delete client from event - operation failed!");
        }
        if (arguments.length != 2) {
            return console.log("Please specify these arguments: filterName and callback !");
        }
        if (typeof (filterName) !== 'string' || typeof (callback) !== 'function') {
            return console.log("Unvalid arguments found:\n\t- eventId must be interger greater than 0 !\n\t- client must be an instance of Client!\nDelete client from event - operation failed!");
        }

        var callbackResult = callback(eventsCollection);
        console.log(`Result from filter: '${filterName}'`);
        console.log(callbackResult);
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
ta14();
console.log("===================================================================");
ta16();
console.log("===================================================================");
console.log("Original Collection of Events:")
console.log(eventsCollection);