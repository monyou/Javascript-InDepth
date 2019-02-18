// Holds the month's name
let monthsCollection = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Holds the years's name
let yearsCollection = [];
for (let i = 1920; i < 2120; i++) {
    yearsCollection.push(i);
}
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
    date: null,
    year: null,
    month: null,
    day: null,


    // Initializes the calendar
    initialize: function (calendarHolder) {
        // Guards
        if (arguments.length !== 1 || typeof (calendarHolder) !== "string") {
            return console.log(`Please specify this argument: calendarHolder as string`);
        }

        // If it is initilized in input element becomes datapicker
        if (DOMco.getElement(calendarHolder).element.localName === 'input') {
            DOMco.getElement(calendarHolder).addAttr('type', 'date').addId('datepicker');
            return;
        }

        // Makes div that holds the header and the body (table) of the calendar
        DOMco.getElement(calendarHolder).addChild('div').addId("calendar-wrapper")
            .addChild('div').addId('calendar-header').getParent()
            .addChild('table').addId('calendar');

        // Makes the header of the calendar
        // Add dropdown with months
        var monthID = 0;
        DOMco.getElement('#calendar-header').addChild('select').addId('monthSelect');
        monthsCollection.forEach(element => {
            DOMco.addChild('option').addAttr('value', monthID).text(element).getParent();
            monthID++;
        });
        //Pick the today month
        DOMco.element.value = new Date().getMonth();
        // Add event to the dropdown with months
        DOMco.addEvent('change', function () {
            calendarX.createBody();
        });
        // Add dropdown with years
        DOMco.getElement('#calendar-header').addChild('select').addId('yearSelect');
        yearsCollection.forEach(element => {
            DOMco.addChild('option').addAttr('value', element).text(element.toString()).getParent();
        });
        //Pick the today year
        DOMco.element.value = new Date().getFullYear();
        // Add event to the dropdown with years
        DOMco.addEvent('change', function () {
            calendarX.createBody();
        });

        // Makes the body of the calendar (days)
        this.createBody();

        // Styling the whole thing
        this.styleCalendar();
    },

    createBody: function () {
        // Guards
        if (arguments.length !== 0) {
            return console.log(`No arguments allowed in this method !`);
        }

        // Clear old month view
        DOMco.getElements('#calendar > tr').element.forEach(element => {
            DOMco.element = element;
            DOMco.delete();
        });

        // Set selected values for date
        this.year = (Number)(DOMco.getElement('#yearSelect').element.value);
        this.month = (Number)(DOMco.getElement('#monthSelect').element.value);
        this.date = new Date(this.year, this.month);

        // Today values
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();

        // Previous values
        var prevMonth = null;
        var prevYear = null;
        // Checks if the previous month is from previous year
        if (this.month - 1 < 0) {
            prevMonth = 11;
            prevYear = this.year - 1;
        } else {
            prevMonth = this.month - 1;
            prevYear = this.year;
        }
        var prevDate = new Date(prevYear, prevMonth);

        // Next values
        var nextMonth = null;
        var nextYear = null;
        // Checks if the next month is from next year
        if (this.month + 1 > 11) {
            nextMonth = 0;
            nextYear = this.year + 1;
        } else {
            nextMonth = this.month + 1;
            nextYear = this.year;
        }
        var nextDate = new Date(nextYear, nextMonth);

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
        var dayCounter = 1;
        var isNextMonth = false;
        var daysInMonth = (32 - new Date(this.year, this.month, 32).getDate());
        var daynsInPrevMonth = (32 - new Date(prevYear, prevMonth, 32).getDate());
        var startTheSequence = new Date(this.year, this.month, 1).getDay();
        // Removes the stupidity that sunday is zero index to make the for cycles work flawlessly
        if (startTheSequence === 0) startTheSequence = 7;
        var prevMonthIterator = 2;
        // Checks if it's the current month selected so to be able to show the todays date differently
        if (this.year === yyyy && this.month === mm) {
            for (let i = 0; i < 6; i++) {
                DOMco.getElement('#calendar').addChild('tr');
                for (let k = 0; k < 7; k++) {
                    // Starts from the day that is the first for the selected month
                    if (i === 0 && k + 1 < startTheSequence) {
                        DOMco.addChild('td').text((daynsInPrevMonth - startTheSequence + prevMonthIterator).toString()).addStyle("color", "gray").getParent();
                        prevMonthIterator++;
                        continue;
                    }
                    // Checks for the last date of the month and reset for the next month
                    if (dayCounter > daysInMonth) {
                        dayCounter = 1;
                        isNextMonth = true;
                    }
                    // Style Today
                    DOMco.addChild('td').text(dayCounter.toString());
                    if (dayCounter === dd) {
                        DOMco.addClass('today').addStyles({
                            "background-color": "#17a2b8",
                            "font-weight": "bold",
                            "border-radius": "20px"
                        });
                    }
                    // Checks if its from next month and change the style
                    if (isNextMonth) DOMco.addStyle("color", "gray");

                    DOMco.getParent();
                    dayCounter++;
                }
            }
        } else {
            // Normal building of the body
            for (let i = 0; i < 6; i++) {
                DOMco.getElement('#calendar').addChild('tr');
                for (let k = 0; k < 7; k++) {
                    // Starts from the day that is the first for the selected month
                    if (i === 0 && k + 1 < startTheSequence) {
                        DOMco.addChild('td').text((daynsInPrevMonth - startTheSequence + prevMonthIterator).toString()).addStyle("color", "gray").getParent();
                        prevMonthIterator++;
                        continue;
                    }
                    // Checks for the last date of the month
                    if (dayCounter > daysInMonth) {
                        dayCounter = 1;
                        isNextMonth = true;
                    }
                    DOMco.addChild('td').text(dayCounter.toString());
                    // Checks if its from next month and change the style
                    if (isNextMonth) DOMco.addStyle("color", "gray");

                    DOMco.getParent();
                    dayCounter++;

                }
            }
        }

        // Styles the body
        DOMco.getElements('th, td').element.forEach(element => {
            DOMco.element = element;
            // Add hover effect only for the days in the month
            if (monthsCollection.includes(element.innerText) === false) {
                DOMco.addEvent('mouseover', function (e) {
                    e.target.style.borderRadius = "20px";
                    e.target.style.boxShadow = "0 0 50px white";
                });
                DOMco.addEvent('mouseout', function (e) {
                    e.target.style.borderRadius = "none";
                    e.target.style.boxShadow = "none";
                });
            }
            DOMco.addStyles({
                "width": "70px",
                "height": "70px",
                "transition": "box-shadow .5s"
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
            "margin": "0 auto",
            "width": "100%",
            "text-align": "left"
        });
        DOMco.getElement('#monthSelect').addClass("custom-select");
        DOMco.getElement('#yearSelect').addClass("custom-select");
        DOMco.getElement('#monthSelect').addStyles({
            "width": "130px",
            "margin-right": "5px"
        });
        DOMco.getElement('#yearSelect').addStyles({
            "width": "130px"
        });

        // Styles the calendar body
        DOMco.getElement('#calendar-wrapper').addStyles({
            "margin": "0 auto",
            "text-align": "center",
            "margin-top": "100px",
            "width": "700px",
            "border-radius": "10px",
            "background-color": "#3b3c3d",
            "color": "white"
        });
        DOMco.getElement('#calendar').addStyles({
            "margin": "0 auto",
            "width": "100%"
        });
    }
}