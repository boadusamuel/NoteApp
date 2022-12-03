const Note = require("../models").Note;

module.exports = {
  validateRequiredTitle(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: "false",
        message: "title is required",
      });
    }
  },
  
  validateDuplicateTitle(req, res) {
    Note.findOne({
      where: { title: req.body.title },
    }).then((noteFound) => {
      if (noteFound) {
        if(noteFound.id === req.body.id) return;
        return res.status(403).send({
          success: "false",
          message: "A note with that title exist already",
        });
      }
    }).catch((error) => res.status(400).send(error));;
  },

  validateNote(req, res){
    Note.findByPk(req.params.id).then(noteFound => {
        if(!noteFound){
            res.status(404).send({
                success: "false",
                message: "Note not found",
            })
        }
        return noteFound;
    }).catch((error) => res.status(400).send(error));
  }
};
