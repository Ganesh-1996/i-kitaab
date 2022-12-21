const mongoose = require('mongoose')
let noteSchema=new mongoose.Schema({
    title:{type: String},
    user: { type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    description:{type: String},
    tag:{type: String}
})

module.exports=mongoose.model('Notebook',noteSchema)