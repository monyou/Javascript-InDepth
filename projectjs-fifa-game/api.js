class FIFAapi {
    constructor() {
        this.teams = null;
        this.matches = null;
        this.groups = null;
        this.country = null;
    }

    // Saves data from the server into variables
    askForTeams() {
        new AJAX().request("GET", "https://worldcup.sfg.io/teams", null, true, (next) => {
            FIFAapi.teams = JSON.parse(next.responseText);
        });
        return this;
    }
    askForMatches() {
        new AJAX().request("GET", "https://worldcup.sfg.io/matches", null, true, (next) => {
            FIFAapi.matches = JSON.parse(next.responseText);
        });
        return this;
    }
    askForGroups() {
        new AJAX().request("GET", "https://worldcup.sfg.io/teams/group_results", null, true, (next) => {
            FIFAapi.groups = JSON.parse(next.responseText);
        });
        return this;
    }
    askForCountry(fifa_code) {
        new AJAX().request("GET", `https://worldcup.sfg.io/matches/country?fifa_code=${fifa_code}`, null, true, (next) => {
            FIFAapi.country = JSON.parse(next.responseText);
        });
        return this;
    }

    // Gets the stored data
    getTeams() {
        return this.teams;
    }
    getMatches() {
        return this.matches;
    }
    getGroups() {
        return this.groups;
    }
    getCountry() {
        return this.country;
    }

    // Utility methods
    isDataFetched() {
        if (this.teams && this.matches && this.groups) {
            console.log("Data was fetched successfuly!");
            return true;
        }
        return false;
    }
}