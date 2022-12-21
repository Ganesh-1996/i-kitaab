import React from 'react'
import { useEffect } from 'react';
import {useContext,useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import context from '../Context/context';
import { AddNote } from './AddNote'
import { ShowNotes } from './ShowNotes';

export const Notes = () => {
  const navigate = useNavigate()
  const res = useContext(context);
  const [uNote, setUnote]=useState({title:"", description:"", tag:""})
  const { Notes, getNotes, updateNotes} = res;
  const click = useRef()
useEffect(()=>{
  if(localStorage.getItem("token"))
  {getNotes()} else { navigate('/login')} 
 // eslint-disable-next-line
},[])
  const handleClick =(e) =>{
    console.log("Updating the note...", uNote)
    e.preventDefault()
    console.log("old notes...", Notes)
    updateNotes(uNote)
    console.log("new notes...", Notes)
    document.getElementById("btn-close").click()

  }
  const onchange = (e) =>{
    setUnote({...uNote, [e.target.name]: e.target.value})

  }

  const editNote= (note) =>{
setUnote(note)
click.current.click()
  }

  return (
    <>
   <AddNote/>
   <button
   type="button"
   className="btn btn-primary"
   data-bs-toggle="modal"
   data-bs-target="#exampleModal"
   ref={click}
   style={{display : "none"}}
 >
   Launch demo modal
 </button>

 <div
   className="modal fade"
   id="exampleModal"
   tabIndex="-1"
   aria-labelledby="exampleModalLabel"
   aria-hidden="true"
 >
   <div className="modal-dialog modal-dialog-centered">
     <div className="modal-content">
       <div className="modal-header">
       

         <button
           type="button"
           id="btn-close"
           className="btn-close"
           data-bs-dismiss="modal"
           aria-label="Close"
         ></button>
       </div>
       <div className="modal-body">
       <form>
   <div className="mb-3">
     <label htmlFor="title" className="form-label">
       Title
     </label>
     <input
       type="text"
       className="form-control"
       id="title"
       name="title"
       value={uNote.title}
       onChange={onchange}
       aria-describedby="emailHelp"
     />
   </div>
   <div className="mb-3">
     <label htmlFor="desc" className="form-label">
       Description
     </label>
     <input
       type="text"
       className="form-control"
       id="description"
       value={uNote.description}
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
       className="form-control"
       id="tag"
       value={uNote.tag}
       name="tag"
       onChange={onchange}
     />
   </div>
   <button type="submit" disabled={uNote.title.length < 5 || uNote.description.length < 5} onClick={handleClick} className="btn btn-primary">
     Submit
   </button>
 </form>
       </div>
      
     </div>
   </div>
 </div>
   {/* ----- Modal End ----- */}


<div className="container">
 <div className="row">
   {Notes.map((note) => {
     return (
       <div key={note._id} className="col-md-4 col-l-3 mt-4">
         <ShowNotes note={note} editNote={editNote} />
         
       </div>
     );
   })}
 </div>
 </div>
 </>
  )
}
