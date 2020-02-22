import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { api } from '../../../constants';
import './style.css';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  const handlePassword = (event) => setPassword(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);

  useEffect(() => {
    localStorage.token && history.replace('/');
  }, []);


  const onSignIn = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        }),
      }
      const response = await fetch(`${api}/signin`, options);
      const { err, token, role } = await response.json();
      if (!err) {
        localStorage.token = token;
        localStorage.role = role;
        history.replace('/');
      } else {
        alert(err);
      }

    } catch (err) { console.log(err); }
  }
  
  return (
      <div className="login-back">
        <img src="logo.png" alt="#"/>
        <form onSubmit={onSignIn}>
          <h3>Welcome!</h3> 
          <br/>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" required value={email} id="email" onChange={handleEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" required value={password} onChange={handlePassword} id="password" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>
          <div className="form-group">
            New user?<Link className="signup-link" to="/signup"> Sign up!</Link>
          </div>
        </form>
      </div>
  );
}

export default Login;
