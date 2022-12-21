import { useState } from "react";
import Context from "./context";

const ContextEle = (props) => {
  const host = "http://localhost:3030";
  const note=[]
  const [Notes, setNotes] = useState(note);

  //Fetch Notes from mongo db Database using GET http://localhost:3030/api/notes/fetchNotes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token")
      },
    });
    const resJson = await response.json()
    console.log("data fetched from db: " + resJson)
    setNotes(resJson)
  };

  //Add notes to Mongo Db Database using POST http://localhost:3030/api/notes/addNotes
  const addNotes = async (note) => {
    const response = await fetch(`${host}/api/notes/addNotes`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authtoken": localStorage.getItem("token")
           
    },
    body: JSON.stringify({title:note.title, description:note.description, tag:note.tag})
    });
    const json = await response.json();
    console.log("Adding a note : " + json.title)

    setNotes(Notes.concat(json));
  };

  //Delete Notes from Mongo Db Database uding DELETE http://localhost:3030/api/notes/deleteNotes/:id
  const delNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token")
         
  }
  });
  console.log(response.json())

    const Note = Notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(Note);
  };

  //update Note using PUT method http://localhost:3030/api/notes/updateNotes/:id
  const updateNotes = async (note) => {
    const response = await fetch(`${host}/api/notes/updateNotes/${note._id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authtoken": localStorage.getItem("token")
         
  },
  //Converts a JS object in JSON String
  body: JSON.stringify({title:note.title, description:note.description, tag:note.tag})
  });
  console.log(response.json())

  //Creates a deep copy of the object
  const newN = JSON.parse(JSON.stringify(Notes))

    for (let notes of newN) {
      if (notes._id === note._id) {
        notes.title = note.title;
        notes.description = note.description;
        notes.tag = note.tag;
        console.log('breaking loop')
      }
    }
    setNotes(newN)
  };

  return (
    <Context.Provider value={{ Notes,getNotes, addNotes, delNote, updateNotes }}>
      {props.children}
    </Context.Provider>
  );
};
export default ContextEle;
