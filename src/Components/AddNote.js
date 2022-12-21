import React from "react";
import { useState} from "react";
import { useContext } from "react";
import context from "../Context/context";
export const AddNote = () => {
  
    const res = useContext(context);
    const {addNotes} = res;
  const [note, setNote] = useState({title:"", description:"", tag:""});
  
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNotes(note);
    console.log(note);
  };



  return (
    <div className="container">
      <form>
        <div className="mb-3 mt-4">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onchange} minLength={5}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            minLength={5}
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            minLength={5}
            className="form-control"
            id="tag"
            name="tag"
            onChange={onchange}
          />
        </div>
        <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick} className="btn btn-primary">
          Submit
        </button>
      </form>
  
    </div>
  );
};
