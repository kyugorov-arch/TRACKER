const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let logs = [];

app.post("/api/track", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const log = {
    ...req.body,
    ip,
    date: new Date()
  };

  logs.push(log);

  console.log(log);

  res.sendStatus(200);
});

app.get("/api/logs", (req, res) => {
  res.json(logs);
});

app.listen(3000, () => console.log("Running"));
