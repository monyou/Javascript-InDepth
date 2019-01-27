// Main exercises:
//Exercise 1
function t1() {
    var eventsList = [
        new Event("House party in Romania!", false, "03.09.2019"),
        new Event("Beer party!", false),
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
    var event = new Event("Go to cinema");
    EventsOrganizer.addEvent(event);
}

//Excercise 5
function t5() {
    var newEvent = new Event("My New Event - Adult Shopping!", false);
    EventsOrganizer.updateEvent(3, newEvent);
}

//Excercise 6
function t6() {
    var client = new Client("Simeon", "Mechkov", 22, "male");
    var client2 = new Client("Krasimira", "Piskacheva", 21, "female");
    var client3 = new Client("Georgi", "Vaklinov", 23, "male");
    EventsOrganizer.addClientToEvent(client, 1);
    EventsOrganizer.addClientToEvent(client2, 1);
    EventsOrganizer.addClientToEvent(client3, 1);
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