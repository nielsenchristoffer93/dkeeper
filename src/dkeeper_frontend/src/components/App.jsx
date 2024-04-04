import React, { useState, useEffect } from "react";
import { dkeeper_backend } from '../../../declarations/dkeeper_backend';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "",
      content: ""
    }
  ]);

  function addNote(newNote) {
    dkeeper_backend.createNote(newNote.title, newNote.content);
    
    setNotes((previousNotes) => {
      return [newNote, ...previousNotes];
    });
  }

  useEffect(() => {
    console.log("useEffect");
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(notesArray);
  };

  function deleteNote(id) {
    dkeeper_backend.deleteNote(id);

    setNotes((previousNotes) => {
      return previousNotes.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="note-container">
        {notes.map((note, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
