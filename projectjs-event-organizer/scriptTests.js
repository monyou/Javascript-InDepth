// Main exercises:
//Exercise 1
function t1() {
    var eventsList = [
        new Event("House party in Romania!", false, "03.09.2019", 50),
        new Event("Beer party!", false, "", 20),
        new Event("Birthday with friends.", true)
    ];
    EventsOrganizer.storeListOfEvents(eventsList);
}

//Excercise 2
function t2() {
    EventsOrganizer.showEvents();
}

//Excercise 3
function t3() {
    EventsOrganizer.deleteEvent(2);
}

//Excercise 4
function t4() {
    var event = new Event("Go to cinema", true, "11.27.2019", 20);
    var event1 = new Event("Honda Fans Meeting", false, "05.05.2019", 100);
    var event2 = new Event("Nature Workout", true, "06.06.2019", 30);
    var event3 = new Event("Paris - St.Valentine", false, "02.14.2019", 1000);
    var event4 = new Event("Dubai - Beach Party", false, "07.01.2019", 3000);
    var event5 = new Event("Borring Event");
    EventsOrganizer.addEvent(event);
    EventsOrganizer.addEvent(event1);
    EventsOrganizer.addEvent(event2);
    EventsOrganizer.addEvent(event3);
    EventsOrganizer.addEvent(event4);
    EventsOrganizer.addEvent(event5);
}

//Excercise 5
function t5() {
    var newEvent = new Event("My New Event - Adult Shopping!", false, "01.31.2019");
    EventsOrganizer.updateEvent(3, newEvent);
}

//Excercise 6
function t6() {
    var client = new Client("Simeon", "Mechkov", 22, "male", 1000);
    var client2 = new Client("Krasimira", "Piskacheva", 21, "female", 200);
    var client3 = new Client("Georgi", "Vaklinov", 23, "male", 500);
    var client4 = new Client("Tinko", "Boqdzhiev", 20, "male", 20);
    EventsOrganizer.addClientToEvent(client, 1);
    EventsOrganizer.addClientToEvent(client2, 1);
    EventsOrganizer.addClientToEvent(client3, 1);
    EventsOrganizer.addClientToEvent(client4, 1);
}

//Excercise 7
function t7() {
    EventsOrganizer.showClientsOfEvent(1);
    EventsOrganizer.showClientsOfEvent(1, "female");
}

//Excercise 8
function t8() {
    clientToDelete = new Client("Georgi", "Vaklinov", 23, "male");
    EventsOrganizer.deleteClientFromEvent(clientToDelete, 1);
}

//Additional exercises part 1:
//Exercise 1
function ta11() {
    EventsOrganizer.stopSystemForAddOperations();
    t4();
    systemOffForAddOperations = false;
}

//Exercise 3
function ta13() {
    EventsOrganizer.showEventWithMaxClients();
}

//Exercise 4
function ta14() {
    EventsOrganizer.showEventsForKids();
}

//Exercise 6
function ta16() {
    //Show all events that have date
    EventsOrganizer.filterEvents("Events With Date", function (element) {
        var eventsWithDate = [];
        for (let i = 0; i < element.length; i++) {
            if (element[i].date !== '') {
                eventsWithDate.push(element[i]);
            }
        }
        return eventsWithDate;
    });
}

//Additional exercises part 2:
//Exercise 5
function ta25() {
    var client = new Client("Mihail", "Petrov", 25, "male", 9999);
    EventsOrganizer.addClientToEvent(client, 1);
    EventsOrganizer.addClientToEvent(client, 3);
    EventsOrganizer.addClientToEvent(client, 4);
    EventsOrganizer.addClientToEvent(client, 5);
    EventsOrganizer.addClientToEvent(client, 6);
    console.log("!--- This is going to be his 6th event --- !");
    EventsOrganizer.addClientToEvent(client, 7);
    console.log("!--- This is going to be his 7th event --- !");
    EventsOrganizer.addClientToEvent(client, 8);
}

//Additional exercises part 3:
//Exercise 1
function ta31() {
    EventsOrganizer.archiveEvent(4);
    EventsOrganizer.archiveEvent(7);
    var client = new Client("Mihail", "Petrov", 25, "male", 9999);
    EventsOrganizer.addClientToEvent(client, 7);
}
//Exercise 3
function ta33() {
    EventsOrganizer.showArchivedEvents();
    EventsOrganizer.showEventsWithClients();
}
//Exercise 4
function ta34() {
    EventsOrganizer.showEarningsFromArchivedEvent(4);
}
//Exercise 5
function ta35() {
    var client = new Client("Mihail", "Petrov", 25, "male", 9999);
    EventsOrganizer.rateArchivedEvent(4, 9, client);
    EventsOrganizer.showEvents();
}