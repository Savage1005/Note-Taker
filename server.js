const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let notes = require("./db/db.json");

//api get

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// api post api notes

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  if (notes.length) {
    newNote.id = notes[notes.length - 1].id + 1;
  } else {
    newNote.id = 1;
  }
  notes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) console.log(err);
    res.sendStatus(200);
  });
});



//api delete api notes

app.delete("/api/notes/:index", (req, res) => {
  const index = parseInt(req.params.index);
    let location 
    for (let i = 0; i < notes.length; i++) {
       if(notes[i].id === index) location = i
        }
    notes.splice(location, 1)
  console.log(notes)
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) console.log(err);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
