import './App.css';

import React from 'react';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  function handleLogin() {
    console.log(username, password);

    fetch("http://localhost:3001", {
      method: "POST",
      headers : {
        "content-type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className='form'>
      <input type="text"
        name="username"
        id="username"
        placeholder="Enter Username"
        onChange={
          (e) => {
            setUsername(e.target.value)
          }
        }
        value={username}
      />

      <input
        type="text"
        name="password"
        id="password"
        placeholder="Enter Password"
        onChange={
          (e) => {
            setPassword(e.target.value)
          }
        }
        value={password}
      />
      <button
        onClick={() => {
          handleLogin()
        }}>
        Login
      </button>
    </div>
  )
}

function App() {
  return (
    <>
      <h1>Heading</h1>
      <Login />
    </>
  );
}

export default App;
