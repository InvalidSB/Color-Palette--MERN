import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";


import { UserContext } from "../../App";


function Login() {
  const history = useHistory();
  const [message, setMessage] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(UserContext);

  const SignIn = (e) => {
    // e.preventDefault()
    if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setMessage("Email you just enter dosn't exist");
      return;
    }
    fetch("/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data, err) => {
        if (data.error) {
          console.log(err);
          localStorage.clear();
          setInterval(() => {
            setMessage(data.error);
            
          }, 5000);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="logincontainer">
      <div class="login-page">
        {message ? <p>{message}</p> : null}
        <div class="form">
          <div class="login">
            <div class="login-header">
              <h3>LOGIN</h3>
              <p>Please enter your credentials to login.</p>
            </div>
          </div>
          <div class="login-form">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => SignIn()}>login</button>
            <p class="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
