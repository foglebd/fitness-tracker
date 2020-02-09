const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.get ("/", function (req, res){
  res.sendFile(path.join(_dirname, "./public/index.html"))
});

app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});