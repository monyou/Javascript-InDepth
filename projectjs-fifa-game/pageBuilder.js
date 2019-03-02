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
        // Get elements needed
        let matchesView = document.querySelector("#matches");

        new AJAX().request("GET", "https://worldcup.sfg.io/matches", null, true, (next) => {
            let matches = JSON.parse(next.responseText);

            // Cycles through every match and makes views
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];

                // Wrapper
                let wrapper = document.createElement("div");
                wrapper.setAttribute("id", "wrapper");

                // Venue and Date
                let holderMatchInfo = document.createElement("div");
                holderMatchInfo.setAttribute("class", "row");

                let venue = document.createElement("div");
                venue.setAttribute("id", "venue");
                venue.setAttribute("class", "col-md-4");
                venue.innerHTML = `Location: ${match.venue}`;

                let started = document.createElement("div");
                started.setAttribute("id", "started_at");
                started.setAttribute("class", "col-md-4 offset-md-4");
                started.innerHTML = `Date: ${new Date(match.datetime).toLocaleString()}`;

                // Home Team, Away Team Labels
                let holderTeamsLabels = document.createElement("div");
                holderTeamsLabels.setAttribute("class", "row");

                let homeTeam_Lable = document.createElement("div");
                homeTeam_Lable.setAttribute("class", "col-md-3 offset-md-1");
                homeTeam_Lable.innerHTML = "Home Team";

                let awayTeam_Lable = document.createElement("div");
                awayTeam_Lable.setAttribute("class", "col-md-3 offset-md-4");
                awayTeam_Lable.innerHTML = "Away Team";

                // Home Team, Score, Away Team
                let holderMatchData = document.createElement("div");
                holderMatchData.setAttribute("class", "row");

                let homeTeam = document.createElement("div");
                homeTeam.setAttribute("id", "home_team");
                homeTeam.setAttribute("class", "col-md-3 offset-md-1");
                homeTeam.innerHTML = match.home_team_country;

                let score = document.createElement("div");
                score.setAttribute("id", "score");
                score.setAttribute("class", "col-md-2 offset-md-1");
                score.innerHTML = `${match.home_team.goals} : ${match.away_team.goals}`;

                let awayTeam = document.createElement("div");
                awayTeam.setAttribute("id", "away_team");
                awayTeam.setAttribute("class", "col-md-3 offset-md-1");
                awayTeam.innerHTML = match.away_team_country;

                // Appends to wrapper then to matches view
                holderMatchInfo.appendChild(venue);
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
    }
}