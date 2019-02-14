// Holds the month's name
let monthsCollection = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Holds the years's name
let yearsCollection = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2027"];
// Key/Value pairs of days
let daysName = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thurstday",
    5: "Friday",
    6: "Saturday"
};

// Main functionality
let calendarX = {
    date: Date,
    year: "",
    month: "",
    day: "",


    // Initializes the calendar
    initialize: function (calendarHolder) {
        // Guards
        if (arguments.length !== 1 || typeof (calendarHolder) !== "string") {
            return console.log(`Please specify this argument: calendarHolder as string`);
        }

        // Makes div that holds the header and the body (table) of the calendar
        DOMco.getElement(calendarHolder).addChild('div').addId("calendar-wrapper")
            .addChild('div').addId('calendar-header').getParent()
            .addChild('table').addId('calendar');

        // Makes the header of the calendar
        // Add dropdown with years
        DOMco.getElement('#calendar-header').addChild('select').addId('yearSelect');
        yearsCollection.forEach(element => {
            DOMco.addChild('option').addAttr('value', element).text(element).getParent();
        });
        // Add event to the dropdown with years
        DOMco.addEvent('change', function (e) {
            calendarX.year = e.target.value;
            calendarX.createBody();
        });
        // Add dropdown with months
        var monthID = 0;
        DOMco.getElement('#calendar-header').addChild('select').addId('monthSelect');
        monthsCollection.forEach(element => {
            DOMco.addChild('option').addAttr('value', monthID.toString()).text(element).getParent();
            monthID++;
        });
        // Add event to the dropdown with months
        DOMco.addEvent('change', function (e) {
            calendarX.month = e.target.value;
            calendarX.createBody();
        });

        // Makes the body of the calendar (days)
        this.createBody();

        // Styling the whole thing
        this.styleCalendar();
    },

    createBody: function () {
        // Guards

        // Clear old values
        DOMco.getElements('#calendar > tr').element.forEach(element => {
            DOMco.element = element;
            DOMco.delete();
        });

        // Check if values are set
        if (this.year === "") this.year = DOMco.getElement('#yearSelect').element.value;
        if (this.month === "") this.month = DOMco.getElement('#monthSelect').element.value;

        this.date = new Date(this.year, this.month);

        //Today values
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();

        // Makes the header of the body (day names)
        DOMco.getElement('#calendar').addChild('tr')
            .addChild('th').text("Monday").getParent()
            .addChild('th').text('Tuesday').getParent()
            .addChild('th').text('Wednesday').getParent()
            .addChild('th').text('Thurstday').getParent()
            .addChild('th').text('Friday').getParent()
            .addChild('th').text('Saturday').getParent()
            .addChild('th').text('Sunday');

        // Makes the body (days)
        // If its the current month will display the today day in color
        var dayCounter = 1;
        var startTheSequence = new Date(this.year, this.month, 1).getDay();
        if (this.year === yyyy.toString() && this.month === mm.toString()) {
            for (let i = 0; i < 6; i++) {
                DOMco.getElement('#calendar').addChild('tr');
                for (let k = 0; k < 7; k++) {
                    if (i === 0 && k + 1 < startTheSequence) {
                        DOMco.addChild('td').text("").getParent();
                        continue;
                    }
                    if (dayCounter > 31) {
                        DOMco.addChild('td').getParent();
                    } else {
                        // Style Today
                        DOMco.addChild('td').text(dayCounter.toString());
                        if (dayCounter === dd) {
                            DOMco.addStyles({
                                "background-color": "orange",
                                "color": "green",
                                "border-radius": "50%"
                            });
                        }
                        DOMco.getParent();
                        dayCounter++;
                    }
                }
            }
        } else {
            for (let i = 0; i < 6; i++) {
                DOMco.getElement('#calendar').addChild('tr');
                for (let k = 0; k < 7; k++) {
                    if (i === 0 && k + 1 < startTheSequence) {
                        DOMco.addChild('td').text("").getParent();
                        continue;
                    }
                    if (dayCounter > 31) {
                        DOMco.addChild('td').getParent();
                    } else {
                        DOMco.addChild('td').text(dayCounter.toString()).getParent();
                        dayCounter++;
                    }
                }
            }
        }

        // Restore styles when rewrites
        DOMco.getElements('tr, th, td').element.forEach(element => {
            DOMco.element = element;
            DOMco.addStyles({
                "width": "90px",
                "height": "80px",
                "padding": "5px",
                "text-align": "center"
            });
        });
    },

    styleCalendar: function () {
        // Guards
        if (arguments.length !== 0) {
            return console.log(`No arguments allowed in this method !`);
        }

        // Styles the calendar header
        DOMco.getElement('#calendar-header').addStyles({
            "padding": "5px",
            "background-color": "gray",
            "margin": "0 auto",
            "width": "638px",
            "text-align": "left"
        });
        DOMco.getElement('#monthSelect').addClass("custom-select");
        DOMco.getElement('#yearSelect').addClass("custom-select");
        DOMco.getElement('#monthSelect').addStyles({
            "width": "130px"
        });
        DOMco.getElement('#yearSelect').addStyles({
            "width": "130px",
            "margin-right": "5px"
        });

        // Styles the calendar body
        DOMco.getElement('#calendar-wrapper').addStyles({
            "margin": "0 auto",
            "text-align": "center",
            "padding-top": "100px"
        });
        DOMco.getElement('#calendar').addStyles({
            "margin": "0 auto",
            "border": "solid 1px red"
        });
        DOMco.getElements('tr, th, td').element.forEach(element => {
            DOMco.element = element;
            DOMco.addStyles({
                "width": "90px",
                "height": "80px",
                "padding": "5px",
                "text-align": "center"
            });
        });
    }
}