//Testing Exercise 1
function t1() {
    var occasion1 = new Occasion("House party in Romania!", false);
    var occasion2 = new Occasion("Beer party!", false);
    var occasion3 = new Occasion("Birthday with friends.", true);
    OccasionsOrganizer.storeListOfOccasions([occasion1, occasion2, occasion3]);
}

//Testing Excercise 2
function t2() {
    OccasionsOrganizer.showOccasions();
}

//Testing Excercise 3
function t3(){
    OccasionsOrganizer.deleteOccasion(2);
}