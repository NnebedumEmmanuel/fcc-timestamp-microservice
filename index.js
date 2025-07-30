const express = require("express");
const app = express();

// Enable CORS for FCC testing
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  // Case 1: No date provided — use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if it's a UNIX timestamp (only digits)
    if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on the correct port for FCC
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
