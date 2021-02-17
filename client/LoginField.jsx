import React, { useEffect, useState } from 'react';
import './fashion.css';

function LoginField({saveUser}) {
  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(username);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={username} onChange={handleChange}/>
      </label>
      <input type="submit" value="Switch User" />
    </form>
  )
}

export default LoginField;