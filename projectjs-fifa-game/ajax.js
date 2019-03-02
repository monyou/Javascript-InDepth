class AJAX {
    constructor() {
        this.xhttp = new XMLHttpRequest();
    }

    // Main method for http request GET,POST,PUT
    request(method, url, data, async, callback) {
        // Enables the subscribe method
        this.xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(this);
            }
        };

        // Sets headers if needed
        if (method.toLowerCase() === "post") {
            this.setHeaders();
        }

        // Sends the request
        this.xhttp.open(method, url, async);
        this.xhttp.send(data);
        return this;
    };

    setHeaders() {
        this.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
}