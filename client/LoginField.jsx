import React, { useEffect, useState } from 'react';
import './fashion.css';

/*
  Dual-purpose login and signup
*/

function LoginField({saveUser, closeModal}) {
  // IN THE MORNING - 
  // Fix this to hold username and password, 
  // update the handleChange method below, and add the submit new user method to the main app.
  const [creds, setCreds] = useState({username: '', password: ''});

  const handleChange = (e) => {
    setCreds({...creds, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(creds);
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={creds.username} onChange={handleChange}/>
      </label>
      <label>
        Password:
        <input type="password" name="password" value={creds.password} onChange={handleChange}/>
      </label>
      <input type="submit" value="Login" />
    </form>
  )
}

export default LoginField;