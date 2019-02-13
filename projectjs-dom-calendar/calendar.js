let calendarX = {
    datetime: Date,

    // Initialized calendar
    initialize: function () {
        // Makes div that holds the header and body (table) of the calendar
        DOMco.getElement('body').addChild('div').addId("calendar-wrapper")
            .addChild('div').addId('calendar-header').getParent()
            .addChild('table').addId('calendar');

        // Makes the day's name
        DOMco.getElement('#calendar').addChild('tr')
            .addChild('th').text("Monday").getParent()
            .addChild('th').text('Tuesday').getParent()
            .addChild('th').text('Wednesday').getParent()
            .addChild('th').text('Thurstday').getParent()
            .addChild('th').text('Friday').getParent()
            .addChild('th').text('Saturday').getParent()
            .addChild('th').text('Sunday');

        // Makes the days
        var dayCounter = 1;
        for (let i = 0; i < 5; i++) {
            DOMco.getElement('#calendar').addChild('tr');
            for (let k = 0; k < 7; k++) {
                if (dayCounter > 31) {
                    DOMco.addChild('td').getParent();
                } else {
                    DOMco.addChild('td').text(dayCounter.toString()).getParent();
                    dayCounter++;
                }
            }
        }

        // Styles the calendar
        DOMco.getElement('#calendar-wrapper').addStyles({
            "margin": "0 auto",
            "text-align": "center",
            "padding-top": "100px"
        });
        DOMco.getElements('table, tr, th, td').element.forEach(element => {
            DOMco.element = element;
            DOMco.addStyles({
                "margin": "0 auto",
                "border": "solid 1px red",
                "padding": "10px",
                "text-align": "center"
            });
        });
    }
}