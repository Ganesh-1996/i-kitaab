import React from 'react'
import { useContext } from 'react'
import context from '../Context/context'

export const ShowNotes = (props) => {
    const {note,editNote}=props
    const res = useContext(context)
    const {delNote} = res
    const deleteNote=(id)=>{
      delNote(id)

    }
  return (
    <div>
    <div className="card">
  <div className="card-header">
    {note.title}
  </div>
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <p>{note.description}</p>
      <footer className="blockquote-footer"><cite title="Source Title">{note.tag}</cite></footer>
    </blockquote>
    <i className="fa-solid fa-trash-can mt-2 cursor-pointer" onClick={()=>deleteNote(note._id)}></i>
    <i className="fa-solid fa-file-pen mx-4 mt-2 cursor-pointer" onClick={() => editNote(note)}></i>  </div>
  
</div>

    </div>
  )
}
