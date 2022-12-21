import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [creds, setCreds] = useState({email:"" , password:""})
    const navigate = useNavigate()
    const onchange =(e) =>{
        setCreds({...creds , [e.target.name]:e.target.value})
    }
    const onsubmit=async (e)=>{
        e.preventDefault()
        console.log('email : '+ creds.email)
        console.log('password : '+ creds.password)
        const response = await fetch("http://localhost:3030/api/user/login",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({email: creds.email , pass: creds.password})

        })
        
        const json= await response.json()
        console.log(json.success)
        if(json.success){
            localStorage.setItem('token', json.AuthToken)
            navigate("/")
        } else {
            alert("invalid password")
        }
    }
    
    return (
        <div className="container"><form onSubmit={onsubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" onChange={onchange} minLength={5} name="email" value={creds.email} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" onChange={onchange} minLength={5} value={creds.password} id="exampleInputPassword1" />
            </div>
            <button type="submit"  className="btn btn-primary">Submit</button>
        </form></div>
    )
}

export default Login;