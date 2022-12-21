const { getNodeText } = require("@testing-library/react");
const express = require("express");
const connectToMon = require("./db");
const cors=require('cors')
const app = express();
connectToMon();

app.use(cors())

app.use(express.json());
app.use('/api/user',require('./Router/user'))
app.use('/api/notes', require('./Router/notes') )

// console.log("before insert");
// let user1 = new us({
//   name: "Ganesh",
//   age: 26,
//   gender: "M",
// });
// let user2 = new us({
//     name: "saGanesh",
//     age: 16,
//     gender: "M",
//   });
// console.log("after insert");
// const add = async () => {
//   await user1
//     .save()
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
//     console.log("aftersave");

//     await user2
//     .save()
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
//     console.log("aftersave");
// };
// app.get("/api/v1/user", (req, res) => {
//   res.send("reqparams");
// });
app.listen(3030);
