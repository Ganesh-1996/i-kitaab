const mongoose=require('mongoose')
const uri='mongodb+srv://ganesh:Ganesh@cluster0.iiqudho.mongodb.net/?retryWrites=true&w=majority'
const connectToMon= async()=>{
await mongoose.connect(uri,()=>{
    console.log("connected")
})}
module.exports=connectToMon;


