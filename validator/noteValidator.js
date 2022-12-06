const Note = require("../models").Note;

module.exports = {
  validateRequiredTitle(req, res) {
    if (!req.body.title) {
       res.status(400).send({
        success: "false",
        message: "title is required",
      });
      return false;
    }
    return true;
  },
  
  async validateDuplicateTitle(req, res) {
  const note =  await Note.findOne({ where: { title: req.body.title.trim() }})

      if (note) {
        if(note.id === Number(req.body?.id)) {
          return true;
        }else {
          res.status(403).send({
            success: "false",
            message: "A note with that title exist already",
          });
          return false;
        }
  }
  return true;
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
