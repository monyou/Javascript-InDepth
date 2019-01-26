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