const router = require("express").Router();
const { createNewNote, deleteNote } = require("../../lib/notes.js");
const { notes } = require("../../db/db.json");

router.get("/notes", (req, res) => {
  return res.json(notes);
});

router.post("/notes", (req, res) => {
  createNewNote(req.body, notes);
  res.json(notes);
});

router.delete("/notes/:id", (req, res) => {
  const result = deleteNote(req.params.id, notes);
  return res.json(result);
});

module.exports = router;
