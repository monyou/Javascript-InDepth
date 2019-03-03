let PageBuilder = {
    // Logic method for page rendering
    renderPage: function (e) {
        switch (e.target.innerHTML) {
            case "Teams":
                this.buildTeamsPage();
                break;
            case "Matches":
                this.buildMatchesPage();
                break;
            case "Groups":
                this.buildGroupsPage();
                break;
            case "FIFA Game":
                this.buildWelcomePage();
                break;
        }
    },

    // Pages building
    buildTeamsPage: function () {
        // Get main element
        let teamsBox = document.querySelector("#teams");

        // Fill the html with data


        // Show teams page
        this.showPage("teams");
    },
    buildMatchesPage: function () {
        let matchesView = document.querySelector("#matches");

        // Loading animation On
        this.toggleLoadingAnimation();

        // Make request to the server
        new AJAX().request("GET", "https://worldcup.sfg.io/matches", null, true, (next) => {
            let matches = JSON.parse(next.responseText);

            // Cycles through every match and makes views
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];

                // Wrapper div
                let wrapper = document.createElement("div");
                wrapper.setAttribute("class", "wrapper");

                // Venue, Date, Details divs
                let holderMatchInfo = document.createElement("div");
                holderMatchInfo.setAttribute("class", "row");

                let venue = document.createElement("div");
                venue.setAttribute("class", "venue col-md-4");
                venue.innerHTML = `Location: ${match.location}`;

                let moreInfo = document.createElement("button");
                moreInfo.setAttribute("type", "button");
                moreInfo.setAttribute("data-toggle", "modal");
                moreInfo.setAttribute("data-target", "#detailsModal");
                moreInfo.setAttribute("class", "moreInfo btn btn-sm btn-info col-md-2");
                moreInfo.innerHTML = "More Info";
                // Data to be displayed in modal
                moreInfo.setAttribute("data-title", `${match.home_team_country} vs ${match.away_team_country}, ${new Date(match.datetime).toLocaleDateString()}`);
                moreInfo.setAttribute("data-location", `${match.location}, ${match.venue}`);
                moreInfo.setAttribute("data-weather", `${match.weather.temp_celsius}°C, ${match.weather.description}`);
                moreInfo.setAttribute("data-home_team_name", `${match.home_team_country}`);
                moreInfo.setAttribute("data-away_team_name", `${match.away_team_country}`);
                moreInfo.setAttribute("data-home_players", `${JSON.stringify(match.home_team_statistics.starting_eleven)}`);
                moreInfo.setAttribute("data-away_players", `${JSON.stringify(match.away_team_statistics.starting_eleven)}`);

                let started = document.createElement("div");
                started.setAttribute("class", "started_at col-md-4");
                started.innerHTML = `Date: ${new Date(match.datetime).toLocaleString()}`;

                // Home Team, Away Team Labels divs
                let holderTeamsLabels = document.createElement("div");
                holderTeamsLabels.setAttribute("class", "row d-none d-sm-flex");

                let homeTeam_Lable = document.createElement("div");
                homeTeam_Lable.setAttribute("class", "col-md-3 offset-md-1");
                homeTeam_Lable.innerHTML = "Home Team";

                let awayTeam_Lable = document.createElement("div");
                awayTeam_Lable.setAttribute("class", "col-md-3 offset-md-4");
                awayTeam_Lable.innerHTML = "Away Team";

                // Home Team, Score, Away Team divs
                let holderMatchData = document.createElement("div");
                holderMatchData.setAttribute("class", "row");

                let homeTeam = document.createElement("div");
                homeTeam.setAttribute("class", "home_team col-md-3 offset-md-1");
                homeTeam.innerHTML = match.home_team_country;

                let score = document.createElement("div");
                score.setAttribute("class", "score col-md-2 offset-md-1");
                score.innerHTML = `${match.home_team.goals} : ${match.away_team.goals}`;

                let awayTeam = document.createElement("div");
                awayTeam.setAttribute("class", "away_team col-md-3 offset-md-1");
                awayTeam.innerHTML = match.away_team_country;

                // Appends to wrapper div then to matches view div
                holderMatchInfo.appendChild(venue);
                holderMatchInfo.appendChild(moreInfo);
                holderMatchInfo.appendChild(started);
                holderTeamsLabels.appendChild(homeTeam_Lable);
                holderTeamsLabels.appendChild(awayTeam_Lable);
                holderMatchData.appendChild(homeTeam);
                holderMatchData.appendChild(score);
                holderMatchData.appendChild(awayTeam);
                wrapper.appendChild(holderMatchInfo);
                wrapper.appendChild(holderTeamsLabels);
                wrapper.appendChild(holderMatchData);

                matchesView.appendChild(wrapper);
            }

            // Loading animation Off
            this.toggleLoadingAnimation();
        });

        // Show matches page
        this.showPage("matches");
    },
    buildGroupsPage: function () {
        // Get main element
        let groupsBox = document.querySelector("#groups");

        // Fill the html with data


        // Show groups page
        this.showPage("groups");
    },
    buildWelcomePage: function () {
        this.showPage("welcome");
    },

    // Rerender functionality of the content
    showPage: function (id) {
        // Get all views
        let allPages = document.querySelector("#content").children;

        for (let i = 0; i < allPages.length; i++) {
            const element = allPages[i];
            if (element.getAttribute("id") === id) {
                // Displays selected one
                element.setAttribute("class", element.getAttribute("class").replace("d-none", "").trim());
            } else if (!element.getAttribute("class").includes("d-none")) {
                // Hides others
                element.setAttribute("class", element.getAttribute("class").trim() + " d-none");
            }
        }
    },

    // Animation loading
    toggleLoadingAnimation: function () {
        let animation = document.querySelector("#animation");
        if (animation.getAttribute("class").includes("d-none")) {
            animation.setAttribute("class", animation.getAttribute("class").replace("d-none", "").trim());
        } else {
            animation.setAttribute("class", animation.getAttribute("class").trim() + " d-none");
        }
    }
}

// Showing the details modal for every match with the right content
$('#detailsModal').on('shown.bs.modal', function (event) {
    // Button that triggered the modal
    var button = $(event.relatedTarget);

    // Extract info from data-* attributes
    var title = button.data('title');
    var location = button.data('location');
    var weather = button.data('weather');
    var homeTeamName = button.data('home_team_name');
    var awayTeamName = button.data('away_team_name');
    var homeTeamPlayers = button.data('home_players');
    var awayTeamPlayers = button.data('away_players');

    // Update the modal's content.
    var modal = $(this);
    modal.find(".modal-title").text(title);
    modal.find(".modal-body > .container-fluid > #location").text(location);
    modal.find(".modal-body > .container-fluid > #weather").text(weather);
    modal.find(".modal-body > .container-fluid > .row > #home_players > #home_team_name").text(homeTeamName);
    // Clear previous childs
    modal.find(".modal-body > .container-fluid > .row > #home_players > ul").empty();
    for (let i = 0; i < homeTeamPlayers.length; i++) {
        const element = homeTeamPlayers[i];
        modal.find(".modal-body > .container-fluid > .row > #home_players > ul").append(`<li class="list-group-item">N${element.shirt_number} ${element.name}, ${element.position}</li>`);
    }
    modal.find(".modal-body > .container-fluid > .row > #away_players > #away_team_name").text(awayTeamName);
    // Clear previous childs
    modal.find(".modal-body > .container-fluid > .row > #away_players > ul").empty();
    for (let i = 0; i < awayTeamPlayers.length; i++) {
        const element = awayTeamPlayers[i];
        modal.find(".modal-body > .container-fluid > .row > #away_players > ul").append(`<li class="list-group-item">N${element.shirt_number} ${element.name}, ${element.position}</li>`);
    }
});