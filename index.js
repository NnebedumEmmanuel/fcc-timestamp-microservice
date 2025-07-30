const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
