const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Serve static index.html if you have a frontend; not required for the API
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // optional
});

app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // All digits—treat as Unix timestamp in milliseconds
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
