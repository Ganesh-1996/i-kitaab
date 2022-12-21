const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");
const fetchUser = require("../Middleware/fetchUser");
const JWT_SEC = "asdaf$sdfs";
router.post(
  "/create",
  body("name", "Min length is 3").isLength({ min: 3 }),
  body("email").isEmail(),
  body("pass").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const isUser = await User.findOne({ email: req.body.email });
    console.log(isUser);
    if (isUser) {
      res.json({ success, error: "User exists" });
    } else {
      const gens = await bcryptjs.genSalt(10);
      const secPass = await bcryptjs.hash(req.body.pass, gens);
      const user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      console.log("User Id:" + user.id)
      const data = {
        _user:{
          id:user.id
        }
        
      };
      success = true
      const AuthToken = jwt.sign(data, JWT_SEC);
      console.log("Generated Auth-Token");
      console.log(AuthToken)
      res.json({success, AuthToken});
    }
  }
);

router.post(
  "/login",
  body("email").isEmail(),
  body("pass").exists(),
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: "INVALID" });
    }
    const {email,pass} = req.body;
    console.log("Email:"+ {email})
    const findUser = await User.findOne({email});
   
    if (!findUser) {
      return res.status(400).json({success, error: "USER NOT FOUND" });
    } 
      const comparePass = await bcryptjs.compare(pass,findUser.password);
      console.log('Password:' + comparePass)
   
      if (!comparePass){
        return res.status(400).json({success, error: "Invalid PAssword" });
      }
      console.log("User Id for Login :" + findUser.id)
      const payload={
        _user:{
          id:findUser.id
        }
        
      };
      success = true
      let AuthToken = jwt.sign(payload,JWT_SEC)
      console.log("Login Auth-Token: ")
      res.json({success, AuthToken})
    
  }
);

router.get('/getUser', fetchUser, async (req,res)=>{
console.log("inside getUser")
  const user = await User.findById(req._user.id).select("-password")
  console.log("user fetched from db: " + user)
  if(!user)
  { return res.status(500).json({error : "Internal erro"})}
  else{
    return res.json({user})
  }


})
module.exports = router;
