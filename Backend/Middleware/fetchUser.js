const jwta=require('jsonwebtoken')
const JWT_SEC = "asdaf$sdfs";
const fetchUser=(req,res,next)=>{
console.log('inside fetchuser')
    const token = jwta.verify(req.header('authtoken'),JWT_SEC)
    console.log(token)
    if(!token)
    { return res.status(401).json({error : "Wront auth token"}) }  else { 
        req._user = token._user;
        console.log(token._user);
    }
    
    next();

}
module.exports = fetchUser;