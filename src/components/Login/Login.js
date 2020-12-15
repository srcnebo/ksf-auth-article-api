import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(username, password) {
  const token = await axios
    .post(
      'https://persona.api.ksfmedia.fi/v1/login',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      const userToken = res.data;
      console.log('userTOKEN', res);
      sessionStorage.setItem('token', JSON.stringify(userToken));
      // return userToken;
    })
    .catch((err) => {
      console.log(err.response);
    });
  return await token;
}

function Login({ getData, currentArticleId }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await loginUser(username, password);
    getData(currentArticleId, token);
  };

  return (
    <div className='login-wrapper'>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type='text' onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
