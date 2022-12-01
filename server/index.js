const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const noteController = require("../controller/noteController");

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/notes", (req, res) => noteController.getAllNotes(req, res));
app.post("/api/notes", (req, res) => noteController.createNote(req, res));
