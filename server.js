const fs = require("fs");
const path = require("path");
const { notes } = require("./db/db.json");
const express = require("express");
const uuid = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// set static path
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.json(notes);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function createNewNote(body, noteArray) {
  const newNote = body;
  //assigning a unique id to each note
  newNote.id = uuid.v4();
  noteArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    // format json for readability and keeping current data
    JSON.stringify({ notes: noteArray }, null, 2)
  );

  return newNote;
}

app.post("/api/notes", (req, res) => {
  createNewNote(req.body, notes);
  res.json(notes);
});

function deleteNote(id, notesArray) {
  const noteToDelete = notesArray.find((note) => note.id === id);
  const index = notesArray.indexOf(noteToDelete);
  notesArray.splice(index, 1);
  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify({ notes: notesArray }, null, 2));
  return notesArray;
}
app.delete("/api/notes/:id", (req, res) => {
  const result = deleteNote(req.params.id, notes);
  return res.json(result);
});

// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
