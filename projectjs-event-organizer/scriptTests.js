//Testing Exercise 1
function t1() {
    var occasionsList = [
        new Occasion("House party in Romania!", false),
        new Occasion("Beer party!", false),
        new Occasion("Birthday with friends.", true)
    ];
    OccasionsOrganizer.storeListOfOccasions(occasionsList);
}

//Testing Excercise 2
function t2() {
    OccasionsOrganizer.showOccasions();
}

//Testing Excercise 3
function t3() {
    OccasionsOrganizer.deleteOccasion(2);
}

//Testing Excercise 4
function t4() {
    OccasionsOrganizer.addOccasion("Go to cinema.");
}

//Testing Excercise 5
function t5() {
    OccasionsOrganizer.updateOccasion(3, "My New Occasion - Adult Shopping!", false);
}