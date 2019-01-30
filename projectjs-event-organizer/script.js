//Variables
let eventsCollection = [];
let systemOffForAddOperations = false;

//Structures
let Event = class {
    constructor(name, isForKids = true, date = "", fee = 0) {
        if (arguments.length < 1 || arguments.length > 4) {
            return console.log("Please specify these arguments: name, isForKids(optional), date(optional) and fee(optional) !");
        }
        if (typeof (name) !== 'string' || typeof (isForKids) !== 'boolean' || typeof (date) !== 'string' || typeof (fee) !== 'number') {
            return console.log("Unvalid event!");
        }

        this.id = Event.incrementId();
        this.name = name;
        this.isForKids = isForKids;
        this.date = date;
        this.fee = fee;
        this.isArchive = false;
        this.rating = 0;
        this.clients = [];
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}

let Client = class {
    constructor(firstName, lastName, age, gender, vWallet = 0) {
        if (arguments.length < 4 || arguments.length > 5) {
            return console.log("Please specify these arguments: firstName, lastName, age, gender and vWallet(optional)");
        }
        if (typeof (firstName, lastName, gender) !== 'string' || typeof (age, vWallet) !== 'number') {
            return console.log("Unvalid client!");
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.vWallet = vWallet;
        this.isVIP = false;
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
            console.log(`\t${eventsCollection[i].fee > 0 ? '$': '!'} Id:${eventsCollection[i].id} - ${eventsCollection[i].isArchive ? "~" : ""}${eventsCollection[i].isForKids ? "#" : "*"}${eventsCollection[i].name} : ${eventsCollection[i].isForKids ? "All ages" : "18+"}${(eventsCollection[i].rating > 0 && eventsCollection[i].isArchive ) ? ", Rating: "+eventsCollection[i].rating+"," : (eventsCollection[i].rating === 0 && eventsCollection[i].isArchive ) ? ", Rating: Awaiting," : ""} ${eventsCollection[i].isArchive ? "(Archive)":""}`);

            //Too many nested ifs
            // if (eventsCollection[i].fee > 0) {
            //     if (eventsCollection[i].isForKids === true) {
            //         if (eventsCollection[i].isArchive === true) {
            //             console.log(`\t$ Id:${eventsCollection[i].id} - ~${eventsCollection[i].name} : All ages (Archive)`);
            //         } else {
            //             console.log(`\t$ Id:${eventsCollection[i].id} - #${eventsCollection[i].name} : All ages`);
            //         }
            //     } else {
            //         if (eventsCollection[i].isArchive === true) {
            //             console.log(`\t$ Id:${eventsCollection[i].id} - ~${eventsCollection[i].name} : 18+ (Archive)`);
            //         } else {
            //             console.log(`\t$ Id:${eventsCollection[i].id} - *${eventsCollection[i].name} : 18+`);
            //         }
            //     }
            // } else {
            //     if (eventsCollection[i].isForKids === true) {
            //         if (eventsCollection[i].isArchive === true) {
            //             console.log(`\t! Id:${eventsCollection[i].id} - ~${eventsCollection[i].name} : All ages (Archive)`);
            //         } else {
            //             console.log(`\t! Id:${eventsCollection[i].id} - #${eventsCollection[i].name} : All ages`);
            //         }
            //     } else {
            //         if (eventsCollection[i].isArchive === true) {
            //             console.log(`\t! Id:${eventsCollection[i].id} - ~${eventsCollection[i].name} : 18+ (Archive)`);
            //         } else {
            //             console.log(`\t! Id:${eventsCollection[i].id} - *${eventsCollection[i].name} : 18+`);
            //         }
            //     }
            // }
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
        console.log(`Event -> 'id:${Event.latestId}, name:${event.name}' <- was added successfuly!`);
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
            //Checks if event is archived
            if (eventsCollection[eventFoundI].isArchive === true) {
                return console.log(`This event -> '${eventsCollection[eventFoundI].name}' is archived! You have only read rights!\n\tAdd client to event - opration canceled!`);
            }
            //Validating the client
            if (eventsCollection[eventFoundI].clients.findIndex(c => c.firstName === client.firstName && c.lastName === client.lastName && c.age === client.age) !== -1) {
                return console.log("This client is already registered for that event! Add client to this event - canceled!");
            }
            if (eventsCollection[eventFoundI].isForKids === false && client.age < 18) {
                return console.log("This client is young for that event! Add client to this event - canceled!");
            }
            //stores in how many event is the client registered
            var numberOfEventsWithThisClient = eventsCollection.filter(e => e.clients.findIndex(c => c.firstName === client.firstName && c.lastName === client.lastName && c.age === client.age) !== -1).length;
            if (numberOfEventsWithThisClient === 5) {
                client.isVIP = true;
            } else {
                client.isVIP = false;
            }
            if (client.isVIP) {
                eventsCollection[eventFoundI].clients.push(client);
                console.log(`Client -> '${client.firstName} ${client.lastName}, ${client.age}' successfuly added to the event -> '${eventsCollection[eventFoundI].name}'\n\tClient was not charged because he is a VIP! `);
            } else {
                if (eventsCollection[eventFoundI].fee > client.vWallet) {
                    return console.log(`Client -> '${client.firstName} ${client.lastName}, ${client.age}' doesn't have money in his virtual wallet for this event!\n\tEvent fee: ${eventsCollection[eventFoundI].fee}$\n\tMoney in the client virtual wallet: ${client.vWallet}$`);
                }
                //Add client to event and withdraw money from his vWallet
                client.vWallet -= eventsCollection[eventFoundI].fee;
                eventsCollection[eventFoundI].clients.push(client);
                console.log(`Client -> '${client.firstName} ${client.lastName}, ${client.age}' successfuly added to the event -> '${eventsCollection[eventFoundI].name}'\n\tClient was charged from the virtual wallet with amount: ${eventsCollection[eventFoundI].fee}$\n\tRemaining amout in the virtual wallet: ${client.vWallet}$`);
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
            //Checks if event is archived
            if (eventsCollection[eventFoundI].isArchive === true) {
                return console.log(`This event -> '${eventsCollection[eventFoundI].name}' is archived! You have only read rights!\n\tDelete client from event - opration canceled!`);
            }
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
            console.log(`\tId:${event.id} -> ${event.name}`);
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
        return callbackResult;
    },

    archiveEvent: function (eventId) {
        //Guards
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Archive event - operation failed!");
        }
        if (arguments.length !== 1) {
            return console.log("Please specify these arguments: eventId !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1) {
            return console.log("Unvalid arguments found:\n\t- eventId must be an integer greater than 0\nArchive event - operation failed!");
        }

        //Checks if there is an event with that id
        var eventFoundI = eventsCollection.findIndex(e => e.id === eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found! Archive event - operation failed!");
        } else {
            eventsCollection[eventFoundI].isArchive = true;
            console.log(`This event -> '${eventsCollection[eventFoundI].name}' was archived successfuly!`);
        }
    },

    showArchivedEvents: function () {
        //Guards
        if (arguments.length != 0) {
            return console.log("Invalid method 'EventsOrganizer.showArchivedEvents()' !\nThis method doesn't have arguments!");
        }

        //Filter and display events
        console.log("Archived events:")
        eventsCollection.filter(e => e.isArchive).forEach(event => {
            console.log(`\tId:${event.id} -> ${event.name}`);
        });
    },

    showEventsWithClients: function () {
        //Guards
        if (arguments.length != 0) {
            return console.log("Invalid method 'EventsOrganizer.showEventsWithClients()' !\nThis method doesn't have arguments!");
        }

        //Filter and display events
        console.log("Events with clients:")
        eventsCollection.filter(e => e.clients.length > 0).forEach(event => {
            console.log(`\tId:${event.id} -> ${event.name}`);
        });
    },

    showEarningsFromArchivedEvent(eventId) {
        //Guards
        if (eventsCollection.length < 1) {
            return console.log("No events avaliable. Show Earnings From Archived Event - operation failed!");
        }
        if (arguments.length !== 1) {
            return console.log("Please specify these arguments: eventId !");
        }
        if (typeof (eventId) !== 'number' || eventId < 1) {
            return console.log("Unvalid arguments found:\n\t- eventId must be an integer greater than 0\nShow Earnings From Archived Event - operation failed!");
        }

        //Checks if there is an event with that id
        var eventFoundI = eventsCollection.findIndex(e => e.id === eventId);
        if (eventFoundI < 0) {
            return console.log("Event with this id not found!\nShow Earnings From Archived Event - operation failed!");
        } else {
            if (eventsCollection[eventFoundI].isArchive === false) {
                return console.log(`Event with this id is not archived yet!\nShow Earnings From Archived Event - operation canceled!`)
            } else {
                console.log(`Total Earnings from archive 'Id:${eventId} -> ${eventsCollection[eventFoundI].name}' are: ${eventsCollection[eventFoundI].clients.length*eventsCollection[eventFoundI].fee}$`);
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
ta11();
console.log("===================================================================");
ta13();
console.log("===================================================================");
ta14();
console.log("===================================================================");
ta16();
console.log("===================================================================");
ta25();
console.log("===================================================================");
ta31();
console.log("===================================================================");
ta33();
console.log("===================================================================");
ta34();
console.log("===================================================================");
ta35();
console.log("===================================================================");
console.log("Original Collection of Events:")
console.log(eventsCollection);