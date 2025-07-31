const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// ✅ Main route for FCC Timestamp Microservice
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;

  // If no date parameter is provided, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // If the date is a number, treat it as UNIX timestamp
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Valid date - return in required format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
