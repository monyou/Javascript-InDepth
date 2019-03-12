let PageBuilder = {
    // Logic method for page rendering
    renderPage: function (e) {
        switch (e.target.innerText) {
            case "Teams":
                this.logUserInteraction("Teams page visited");
                this.buildTeamsPage();
                break;
            case "Matches":
                this.logUserInteraction("Matches page visited");
                this.buildMatchesPage();
                break;
            case "Groups":
                this.logUserInteraction("Groups page visited");
                this.buildGroupsPage();
                break;
            case "Search":
                this.logUserInteraction("Search page visited");
                this.buildSearchPage();
                break;
            case "History":
                this.logUserInteraction("History page visited");
                this.buildHistoryPage();
                break;
            case "FIFA Game":
                this.logUserInteraction("Welcome page visited");
                this.buildWelcomePage();
                break;
        }
    },

    // Pages building
    buildTeamsPage: function () {
        let teamsList1 = document.querySelector("#teams > .row > #list_1");
        let teamsList2 = document.querySelector("#teams > .row > #list_2");

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

        // Show teams page
        this.showPage("teams");
    },
    buildMatchesPage: function () {
        let matchesView = document.querySelector("#matches > div");

        // Removes old children
        while (matchesView.firstChild) matchesView.removeChild(matchesView.firstChild);

        // Cycles through every match and makes views
        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];

            this.makeDesignOfMatchView(match, matchesView);
        }

        // Show matches page
        this.showPage("matches");
    },
    buildGroupsPage: function () {
        let groupsBox = document.querySelector("#groups > div");

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

        // Show teams page
        this.showPage("groups");
    },
    buildSearchPage: function () {
        let locationSelect = document.querySelector("#search > form > div > #location_select");
        let teamSelect = document.querySelector("#search > form > div > #team_select");
        let dateSelect = document.querySelector("#search > form > div > #date_select");

        // Removes old children
        while (locationSelect.firstChild) locationSelect.removeChild(locationSelect.firstChild);
        while (teamSelect.firstChild) teamSelect.removeChild(teamSelect.firstChild);
        while (dateSelect.firstChild) dateSelect.removeChild(dateSelect.firstChild);

        // Add emtpy options to every select
        let emptyOption = document.createElement("option");
        emptyOption.setAttribute("value", "");
        emptyOption.innerText = "";
        let emptyOption2 = document.createElement("option");
        emptyOption2.setAttribute("value", "");
        emptyOption2.innerText = "";
        let emptyOption3 = document.createElement("option");
        emptyOption3.setAttribute("value", "");
        emptyOption3.innerText = "";
        locationSelect.appendChild(emptyOption);
        teamSelect.appendChild(emptyOption2);
        dateSelect.appendChild(emptyOption3);

        // Fill location dropdown
        for (let i = 0; i < matches.length; i++) {
            const element = matches[i];

            if (!locationSelect.innerHTML.includes(element.location)) {
                let optionLocation = document.createElement("option");
                optionLocation.setAttribute("value", `${element.location}`);
                optionLocation.innerText = `${element.location}`;

                locationSelect.appendChild(optionLocation);
            }

        }

        // Fill match dates dropdown 6/2018
        let date = null;
        for (let i = 13; i <= 29; i++) {
            date = new Date(2018, 5, i);
            let optionDate = document.createElement("option");
            optionDate.setAttribute("value", `${date}`);
            optionDate.innerText = `${date.getMonth()+1}/${date.getDate()}/2018`;

            dateSelect.appendChild(optionDate);
        }

        // Fill match dates dropdown 7/2018
        for (let i = 1; i <= 16; i++) {
            date = new Date(2018, 6, i);
            let optionDate2 = document.createElement("option");
            optionDate2.setAttribute("value", `${date}`);
            optionDate2.innerText = `${date.getMonth()+1}/${date.getDate()}/2018`;

            dateSelect.appendChild(optionDate2);
        }

        // Fill team dropdown
        for (let i = 0; i < teams.length; i++) {
            const element = teams[i];

            let optionTeam = document.createElement("option");
            optionTeam.setAttribute("value", `${element.country}`);
            optionTeam.innerText = `${element.country}`;

            teamSelect.appendChild(optionTeam);
        }

        // Show search page
        this.showPage("search");
    },
    buildHistoryPage: function () {
        let historyTableBody = document.querySelector("#history > #history_table > tbody");

        // Removes old children(records)
        while (historyTableBody.firstChild) historyTableBody.removeChild(historyTableBody.firstChild);

        let historySortedDescTimeStamp = history.sort((a, b) => (new Date(a.timestamp) < new Date(b.timestamp)) ? 1 : ((new Date(b.timestamp) < new Date(a.timestamp)) ? -1 : 0));
        for (let i = 0; i < historySortedDescTimeStamp.length; i++) {
            const record = historySortedDescTimeStamp[i];

            let row = document.createElement("tr");
            let rowNumber = document.createElement("td");
            rowNumber.innerText = i + 1;
            let rowEvent = document.createElement("td");
            rowEvent.innerText = record.event;
            let rowTimestamp = document.createElement("td");
            let recordTimestamp = new Date(record.timestamp);
            rowTimestamp.innerText = `${("0" + recordTimestamp.getDate()).slice(-2)}.${("0" + (recordTimestamp.getMonth()+1)).slice(-2)}.${recordTimestamp.getFullYear()}, ${("0" + recordTimestamp.getHours()).slice(-2)}:${("0" + recordTimestamp.getMinutes()).slice(-2)}:${("0" + recordTimestamp.getSeconds()).slice(-2)}`;

            // Add row data to the row parent
            row.appendChild(rowNumber);
            row.appendChild(rowEvent);
            row.appendChild(rowTimestamp);

            // Add row to the table body
            historyTableBody.appendChild(row);
        }

        // Show history page
        this.showPage("history");
    },
    buildWelcomePage: function () {
        this.showPage("welcome");
    },

    // Search functionality
    search: function () {
        let searchResult = document.querySelector("#search > #searchResult");
        let locationSelectValue = document.querySelector("#search > form > div > #location_select").value;
        let teamSelectValue = document.querySelector("#search > form > div > #team_select").value;
        let dateSelectValue = document.querySelector("#search > form > div > #date_select").value;

        // Removes old children
        while (searchResult.firstChild) searchResult.removeChild(searchResult.firstChild);

        // Header text of results
        let resultsHeader = document.createElement("h5");
        resultsHeader.setAttribute("class", "text-center mt-2");
        resultsHeader.innerText = "Results:";
        searchResult.appendChild(resultsHeader);

        // Log record to history based on what search criteria is used
        if (locationSelectValue !== "") {
            this.logUserInteraction(`A search was made for matches with location: '${locationSelectValue}'`);
        }
        if (teamSelectValue !== "") {
            this.logUserInteraction(`A search was made for matches with team: '${teamSelectValue}'`);
        }
        if (dateSelectValue !== "") {
            this.logUserInteraction(`A search was made for matches with date: '${dateSelectValue}'`);
        }

        // Cycles through every match and makes views
        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];

            if (locationSelectValue !== "" && match.location === locationSelectValue) {
                this.makeDesignOfMatchView(match, searchResult);
            }
            if (teamSelectValue !== "" && (match.away_team_country === teamSelectValue || match.home_team_country === teamSelectValue)) {
                this.makeDesignOfMatchView(match, searchResult);
            }
            if (dateSelectValue !== "" && new Date(match.datetime).getMonth() === new Date(dateSelectValue).getMonth() && new Date(match.datetime).getDate() === new Date(dateSelectValue).getDate()) {
                this.makeDesignOfMatchView(match, searchResult);
            }
        }

        if (searchResult.children.length === 1) {
            resultsHeader.innerText = "No results found!";
        }

        // Reset the search criterias
        for (let i = 0; i < document.querySelectorAll("#search > form > div > select").length; i++) {
            const element = document.querySelectorAll("#search > form > div > select")[i];
            element.value = "";
            element.disabled = false;
        }
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
    },

    // Design of the single match view
    makeDesignOfMatchView: function (match, destination) {
        // Wrapper div
        let wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper col-12");

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

        destination.appendChild(wrapper);
    },

    // Log user interactions with the site in history and save it in local storage
    logUserInteraction: function (event) {
        history = JSON.parse(localStorage.getItem("userInput_history") || "[]");
        // Limits history records to 50
        if (history.length > 99) {
            history.shift();
        }
        history.push(new HistoryRecord(event));
        localStorage.setItem("userInput_history", JSON.stringify(history));
    }
}

// Page Events:
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
    // Clear previous children
    modal.find(".modal-body > .container-fluid > .row > #home_players > ul").empty();
    for (let i = 0; i < homeTeamPlayers.length; i++) {
        const element = homeTeamPlayers[i];
        modal.find(".modal-body > .container-fluid > .row > #home_players > ul").append(`<li class="list-group-item">N${element.shirt_number} ${element.name}, ${element.position}</li>`);
    }
    modal.find(".modal-body > .container-fluid > .row > #away_players > #away_team_name").text(awayTeamName);
    // Clear previous children
    modal.find(".modal-body > .container-fluid > .row > #away_players > ul").empty();
    for (let i = 0; i < awayTeamPlayers.length; i++) {
        const element = awayTeamPlayers[i];
        modal.find(".modal-body > .container-fluid > .row > #away_players > ul").append(`<li class="list-group-item">N${element.shirt_number} ${element.name}, ${element.position}</li>`);
    }

    // Log into history
    PageBuilder.logUserInteraction(`Button 'More Info' clicked for match: '${title}'`);
});

// Search only by one criteria
document.querySelector("#search > form > div > #location_select").addEventListener("change", function (event) {
    if (event.target.value !== "") {
        for (let i = 0; i < document.querySelectorAll("#search > form > div > select").length; i++) {
            const element = document.querySelectorAll("#search > form > div > select")[i];
            if (element.id !== event.target.id) {
                element.disabled = true;
            }
        }
    } else {
        for (let i = 0; i < document.querySelectorAll("#search > form > div > select").length; i++) {
            const element = document.querySelectorAll("#search > form > div > select")[i];
            element.disabled = false;
        }
    }
});
document.querySelector("#search > form > div > #team_select").addEventListener("change", function (event) {
    if (event.target.value !== "") {
        for (let i = 0; i < document.querySelectorAll("#search > form > div > select").length; i++) {
            const element = document.querySelectorAll("#search > form > div > select")[i];
            if (element.id !== event.target.id) {
                element.disabled = true;
            }
        }
    } else {
        for (let i = 0; i < document.querySelectorAll("#search > form > div > select").length; i++) {
            const element = document.querySelectorAll("#search > form > div > select")[i];
            element.disabled = false;
        }
    }
});
document.querySelector("#search > form > div > #date_select").addEventListener("change", function (event) {
    if (event.target.value !== "") {
        for (let i = 0; i < document.querySelectorAll("#search > form > div > select").length; i++) {
            const element = document.querySelectorAll("#search > form > div > select")[i];
            if (element.id !== event.target.id) {
                element.disabled = true;
            }
        }
    } else {
        for (let i = 0; i < document.querySelectorAll("#search > form > div > select").length; i++) {
            const element = document.querySelectorAll("#search > form > div > select")[i];
            element.disabled = false;
        }
    }
});

// Auto hides the navigation on mobile when a link is clicked
$('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
});