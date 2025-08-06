const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS (for FCC testing)
app.use(cors());

// Serve index.html at the root
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  // No date provided, use current date
  if (!dateString) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // If only digits => UNIX timestamp
  if (/^\d+$/.test(dateString)) {
    const dateInt = parseInt(dateString);
    const date = new Date(dateInt);
    return res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }

  // Otherwise, try parsing date string
  const date = new Date(dateString);
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
