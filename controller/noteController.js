const Note = require("../models").Note;
const noteValidator = require("../validator/noteValidator");
const helper = require("../commons/helper");

module.exports = {
  index(req, res) {
    let { page, size } = req.query;
    page = page ? page : 1;
    const { limit, offset } = helper.getPagination(page, size);
    Note.findAndCountAll({ offset, limit })
      .then((notes) => {
        const data = helper.getPagingData(notes, page, limit);
        res.status(200).send({
          success: "true",
          message: "notes retrieved successfully",
          data,
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    noteValidator.validateRequiredTitle(req, res);
    noteValidator.validateDuplicateTitle(req, res);
    const note = {
      title: req.body.title,
      body: req.body.body,
    };
    Note.create(note)
      .then((note) => {
        return res.status(201).send({
          success: "true",
          message: "note added successfully",
          note,
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  
  update(req, res) {
    noteValidator.validateRequiredTitle(req, res);
    noteValidator.validateDuplicateTitle(req, res);
    const note = noteValidator.validateNote(req, res);

    Note.update(
      {
        title: req.body.title || note.title,
        body: req.body.body,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then((note) => {
        return res.status(204).send();
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    Note.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((note) => {
        if (note) res.status(204).send();
        res.status(404).send({
          success: "false",
          message: "Note not found",
        });
      })
      .catch((error) => res.status(400).send(error));
  },
};
