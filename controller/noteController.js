const Note = require("../models").Note;

module.exports = {
  getAllNotes(req, res) {
    Note.findAll().then((notes) =>
      res.status(200).send({
        success: "true",
        message: "notes retrieved successfully",
        notes,
      })
    );
  },

  createNote(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: "false",
        message: "title is required",
      });
    }
    Note.findOne({
      where: { title: req.body.title },
    }).then((noteFound) => {
      if (noteFound) {
        return res.status(403).send({
          success: "true",
          message: "A note with that title exist already",
        });
      }
      const note = {
        title: req.body.title,
        body: req.body.body,
      };
      Note.create(note).then((note) => {
        return res.status(201).send({
          success: "true",
          message: "note added successfully",
          note,
        });
      });
    });
  },
};
