import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [creds, addCreds] = useState({name:"", email:"", password:""})
    const navigate = useNavigate()
    const handleSignup= async(e)=>{
        e.preventDefault()
        console.log('name : '+ creds.name)
        console.log('email : '+ creds.email)
        console.log('pass : '+ creds.password)
        const response = await fetch("http://localhost:3030/api/user/create",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({name: creds.name, email: creds.email , pass: creds.password})

        })
        
        const json= await response.json()
        console.log(json.success)
        if(json.success){
            localStorage.setItem('token', json.AuthToken)
            navigate("/")
        } else {
            alert(json.error)
        }
    }
    
    const onchange = (e)=>{
        addCreds({...creds, [e.target.name] : e.target.value})
    }
  return (
    <div className="conatainer"><form onSubmit={handleSignup}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="text" className="form-control" id="username" minLength={5} value={creds.name} onChange={onchange} name="name" aria-describedby="emailHelp" />
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" minLength={5} value={creds.email} onChange={onchange} name="email" aria-describedby="emailHelp" />
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" name="password" minLength={5} value={creds.pass} onChange={onchange} id="exampleInputPassword1" />
    </div>
    
    
    <button type="submit" className="btn btn-primary">Submit</button>
  </form></div>
  )
}

export default Signup;