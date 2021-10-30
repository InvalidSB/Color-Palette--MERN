import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import './login.css'





function Signup() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    const history = useHistory();
const[message,setMessage]=useState(null)

const Signup=(e)=>{
// e.preventDefault()
    if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setMessage("Email you just enter dosn't exist");
      return;
    }
    fetch("/api/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage("Some error occured,try again");
        } else {
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };


    return (
        <div className="logincontainer">
             <div class="login-page">
                 {message ? <p>{message}</p>:null}
      <div class="form">
        <div class="login">
          <div class="login-header">
            <h3>SIGN UP</h3>
            <p>Please enter all the  credentials to register.</p>
          </div>
        </div>
        <div class="login-form">
          <input type="text" placeholder="username"value={name} onChange={(e)=>setName(e.target.value)}/>
          <input type="email" placeholder="email" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="password" value={password}  onChange={(e)=>setPassword(e.target.value)}/>
          <button onClick={()=>Signup()}>Signup</button>
          <p class="message">Already have an accoun? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
        </div>
    )
}

export default Signup
