const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

function createNewNote(body, noteArray) {
  const newNote = body;
  //assigning a unique id to each note
  newNote.id = uuid.v4();
  noteArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    // format json for readability and keeping current data
    JSON.stringify({ notes: noteArray }, null, 2)
  );

  return newNote;
}

function validateNote(note) {
  if (note.length < 3) {
    return false;
  }
  return true;
}

function deleteNote(id, notesArray) {
  const noteToDelete = notesArray.find((note) => note.id === id);
  const index = notesArray.indexOf(noteToDelete);
  notesArray.splice(index, 1);
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify({ notes: notesArray }, null, 2));
  return notesArray;
}

module.exports = {
  createNewNote,
  deleteNote,
  validateNote,
};
