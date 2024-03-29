// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use("/public", express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
    const date = req.params.date;
    const unixDate = isNaN(date) ? Date.parse(date) : date * 1;
    const utcDate = isNaN(date)
        ? new Date(date).toUTCString()
        : new Date(date * 1).toUTCString();

    if (!date) {
        return res.json({
            unix: Date.now(),
            utc: new Date().toUTCString(),
        });
    }

    if (isNaN(unixDate) || utcDate === "Invalid Date") {
        return res.json({ error: "Invalid date" });
    }

    res.json({
        unix: unixDate,
        utc: utcDate,
    });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
