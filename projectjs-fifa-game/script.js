// Stores the results from the request
let matches = null;
let groups = null;
let teams = null;

// Loading animation On
PageBuilder.toggleLoadingAnimation();

// Makes the requests
new AJAX().request("GET", "https://worldcup.sfg.io/matches", null, true, (next) => {
    matches = JSON.parse(next.responseText);
});
new AJAX().request("GET", "https://worldcup.sfg.io/teams", null, true, (next) => {
    teams = JSON.parse(next.responseText);
});
new AJAX().request("GET", "https://worldcup.sfg.io/teams/group_results", null, true, (next) => {
    groups = JSON.parse(next.responseText);
});

// Loading animation Off
PageBuilder.toggleLoadingAnimation();