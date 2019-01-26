//Testing Exercise 1
function t1() {
    var eventsList = [
        new Event("House party in Romania!", false),
        new Event("Beer party!", false),
        new Event("Birthday with friends.", true)
    ];
    EventsOrganizer.storeListOfEvents(eventsList);
}

//Testing Excercise 2
function t2() {
    EventsOrganizer.showEvents();
}

//Testing Excercise 3
function t3() {
    EventsOrganizer.deleteEvent(2);
}

//Testing Excercise 4
function t4() {
    EventsOrganizer.addEvent("Go to cinema.");
}

//Testing Excercise 5
function t5() {
    EventsOrganizer.updateEvent(3, "My New Occasion - Adult Shopping!", false);
}

//Testing Excercise 6
function t6() {
    var client = new Client("Simeon", "Mechkov", 22, "male");
    var client2 = new Client("Krasimira", "Piskacheva", 21, "female");
    var client3 = new Client("Georgi", "Vaklinov", 23, "male");
    EventsOrganizer.addClientToEvent(client, 1);
    EventsOrganizer.addClientToEvent(client2, 1);
    EventsOrganizer.addClientToEvent(client3, 1);
}

//Testing Excercise 7
function t7() {
    EventsOrganizer.showClientsOfEvent(1);
    EventsOrganizer.showClientsOfEvent(1, "female");
}

//Testing Excercise 8
function t8() {
    clientToDelete = new Client("Georgi", "Vaklinov", 23, "male");
    EventsOrganizer.deleteClientFromEvent(clientToDelete, 1);
}