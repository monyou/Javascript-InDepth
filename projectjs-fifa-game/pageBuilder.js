let PageBuilder = {
    // Logic method for page rendering
    renderPage: function (e) {
        switch (e.target.innerText) {
            case "Teams":
                this.buildTeamsPage();
                break;
            case "Matches":
                this.buildMatchesPage();
                break;
            case "Groups":
                this.buildGroupsPage();
                break;
            case "Search":
                this.buildSearchPage();
                break;
            case "History":
                this.buildHistoryPage();
                break;
            case "FIFA Game":
                this.buildWelcomePage();
                break;
        }
    },

    // Pages building
    buildTeamsPage: function () {
        let teamsList1 = document.querySelector("#teams > .row > #list_1");
        let teamsList2 = document.querySelector("#teams > .row > #list_2");

        // Loading animation On
        this.toggleLoadingAnimation();

        // Make request to the server
        new AJAX().request("GET", "https://worldcup.sfg.io/teams", null, true, (next) => {
            let teams = JSON.parse(next.responseText);

            // Removes old children
            while (teamsList1.firstChild) teamsList1.removeChild(teamsList1.firstChild);
            while (teamsList2.firstChild) teamsList2.removeChild(teamsList2.firstChild);

            for (let i = 0; i < teams.length; i++) {
                const team = teams[i];

                let listItem = document.createElement("li");
                listItem.setAttribute("class", "list-group-item");
                listItem.innerText = `${team.country} (${team.fifa_code}), Group: ${team.group_letter}`;

                // Appends the team
                if (i + 1 > teams.length / 2) {
                    teamsList2.appendChild(listItem);
                } else {
                    teamsList1.appendChild(listItem);
                }

            }

            // Loading animation Off
            this.toggleLoadingAnimation();
        });

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

            // Removes old children
            while (matchesView.children.length > 1) matchesView.removeChild(matchesView.lastChild);

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
                venue.innerText = `Location: ${match.location}`;

                let moreInfo = document.createElement("button");
                moreInfo.setAttribute("type", "button");
                moreInfo.setAttribute("data-toggle", "modal");
                moreInfo.setAttribute("data-target", "#detailsModal");
                moreInfo.setAttribute("class", "moreInfo btn btn-sm btn-info col-md-2");
                moreInfo.innerText = "More Info";
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
                started.innerText = `Date: ${new Date(match.datetime).toLocaleString()}`;

                // Home Team, Away Team Labels divs
                let holderTeamsLabels = document.createElement("div");
                holderTeamsLabels.setAttribute("class", "row d-none d-sm-flex");

                let homeTeam_Lable = document.createElement("div");
                homeTeam_Lable.setAttribute("class", "col-md-3 offset-md-1");
                homeTeam_Lable.innerText = "Home Team";

                let awayTeam_Lable = document.createElement("div");
                awayTeam_Lable.setAttribute("class", "col-md-3 offset-md-4");
                awayTeam_Lable.innerText = "Away Team";

                // Home Team, Score, Away Team divs
                let holderMatchData = document.createElement("div");
                holderMatchData.setAttribute("class", "row");

                let homeTeam = document.createElement("div");
                homeTeam.setAttribute("class", "home_team col-md-3 offset-md-1");
                homeTeam.innerText = match.home_team_country;

                let score = document.createElement("div");
                score.setAttribute("class", "score col-md-2 offset-md-1");
                score.innerText = `${match.home_team.goals} : ${match.away_team.goals}`;

                let awayTeam = document.createElement("div");
                awayTeam.setAttribute("class", "away_team col-md-3 offset-md-1");
                awayTeam.innerText = match.away_team_country;

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
        let groupsBox = document.querySelector("#groups > div");

        // Loading animation On
        this.toggleLoadingAnimation();

        // Make request to the server
        new AJAX().request("GET", "https://worldcup.sfg.io/teams/group_results", null, true, (next) => {
            let groups = JSON.parse(next.responseText);

            // Removes old children
            while (groupsBox.firstChild) groupsBox.removeChild(groupsBox.firstChild);

            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];

                let groupCard = document.createElement("div");
                groupCard.setAttribute("class", "card bg-light col-md-3");

                let groupCardHeader = document.createElement("div");
                groupCardHeader.setAttribute("class", "card-header");
                groupCardHeader.innerHTML = `<b>Group ${group.letter}</b>`;

                let groupCardBody = document.createElement("div");
                groupCardBody.setAttribute("class", "card-body");

                let list = document.createElement("ul");
                list.setAttribute("class", "list-group list0group-flush");

                for (let k = 0; k < group.ordered_teams.length; k++) {
                    const teamInGroup = group.ordered_teams[k];

                    let listItem = document.createElement("li");
                    listItem.setAttribute("class", "list-group-item");
                    listItem.innerHTML = `${teamInGroup.points}pt. <b>${teamInGroup.country}</b> - W: ${teamInGroup.wins}, L: ${teamInGroup.losses}, D: ${teamInGroup.draws}`;

                    list.appendChild(listItem);
                }

                // Appends to groups view
                groupCard.appendChild(groupCardHeader);
                groupCardBody.appendChild(list);
                groupCard.appendChild(groupCardBody);
                groupsBox.appendChild(groupCard);
            }

            // Loading animation Off
            this.toggleLoadingAnimation();
        });

        // Show teams page
        this.showPage("groups");
    },
    buildSearchPage: function () {
        // Get main element
        let searchBox = document.querySelector("#search");

        // Fill the html with data


        // Show search page
        this.showPage("search");
    },
    buildHistoryPage: function () {
        // Get main element
        let historyBox = document.querySelector("#history");

        // Fill the html with data


        // Show history page
        this.showPage("history");
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