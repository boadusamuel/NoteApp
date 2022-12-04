const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const noteController = require("../controller/noteController");

const PORT = process.env.PORT || 3006;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1.0/notes", (req, res) => noteController.index(req, res));
app.post("/api/v1.0/notes", (req, res) => noteController.create(req, res));
app.put("/api/v1.0/notes/:id", (req, res) => noteController.update(req, res));
app.delete("/api/v1.0/notes/:id", (req, res) => noteController.delete(req, res));
