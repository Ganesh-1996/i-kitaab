const express= require('express')
const router = express.Router()
const Notes = require('../Models/Notebook')
const app = express()
const jwt=require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
const fetchUser = require('../Middleware/fetchUser')

//Add note
router.post('/addNotes',fetchUser,body('title','length is small').isLength({min : 5}),body('description',"Enter Description").exists(),body('tag').exists(),(req,res)=>{
const error=validationResult(req)
//console.log("1")
if(!error.isEmpty())
{
    return res.status(400).json({error: error.array()})
}
//console.log("2")
const {title,description,tag} = req.body
const note = new Notes(
    {
        title : title,
        description : description,
        tag : tag,
        user: req._user.id
    }
)
note.save()
return res.json(note)
})
//Fetch all notes
router.get('/fetchNotes', fetchUser, async (req,res)=>{
    console.log('user id: ' + req._user.id)
const notes = await Notes.find({user : req._user.id})
res.json(notes)
}
)
//Delete note
router.delete('/deleteNotes/:id',fetchUser, async (req,res)=>{
    const note = await Notes.findById(req.params.id)
    if(note.user.toString() !== req._user.id)
    {
        return res.status(400).json({error : "not the user"})
    }else {


const newN = await Notes.findByIdAndDelete(req.params.id)
return res.json(newN)



    }
})

//Update Note
router.put('/updateNotes/:id',fetchUser, async (req,res)=>{
    const note = await Notes.findById(req.params.id)
    if(note.user.toString() !== req._user.id)
    {
        return res.status(400).json({error : "not the user"})
    }else {
const {title, description, tag} = note
const newNote = {}
if(title){ newNote.title = req.body.title}
if(description){ newNote.description = req.body.description}
if(tag){ newNote.tag = req.body.tag}
console.log("updates nores : " + newNote.title)
const newN = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote})
return res.json(newN)



    }
})
module.exports = router