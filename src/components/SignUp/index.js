import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { api } from '../../constants';
import './style.css';

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  const handleName = (event) => setName(event.target.value);
  const handleSurname = (event) => setSurname(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);

  useEffect(() => {
    localStorage.passportId && history.replace('/');
  }, []);

  const onSignUp = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          surname,
          password
        }),
      }
      const response = await fetch(`${api}/signup`, options);
      const { err, token } = await response.json();
      if (!err) {
        localStorage.token = token;
        history.replace('/transaction');
      } else {
        alert(err);
      }
    } catch (err) { console.log(err); }
  }
  
  return (
      <div className="login-back">
      <form onSubmit={onSignUp}>
          <h3>Fullfill form below: </h3> 
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
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" required value={name} id="name" onChange={handleName} placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" className="form-control" required value={surname} onChange={handleSurname} id="surname" placeholder="Enter surname" />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
  );
}

export default SignUp;
