const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for FCC testing
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// ✅ Timestamp Microservice Route
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Case 1: No date provided, return current time
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Case 2: If date is only digits (Unix timestamp in milliseconds or seconds)
  const isUnixTimestamp = /^\d+$/.test(date);

  const parsedDate = isUnixTimestamp
    ? new Date(parseInt(date)) // parse as int if Unix timestamp
    : new Date(date); // parse as date string

  // Case 3: Invalid Date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Case 4: Valid date
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen on port assigned by environment or 3000 locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
