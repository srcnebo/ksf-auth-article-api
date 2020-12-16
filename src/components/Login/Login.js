import React, { useState } from 'react';
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
      sessionStorage.setItem('token', JSON.stringify(userToken));
      // return userToken;
    })
    .catch((err) => {
      console.log(err);
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
    <div className='login-box-container'>
      <h1>
        Läs HBL digitalt för{' '}
        <span className='header1-underline'>endast 1€</span>
      </h1>

      <div class='login-text'>
        Redan prenumerant?
        <span class='login-link'>Logga in för att fortsätta läsa</span>
      </div>

      <div className='login-wrapper'>
        <form onSubmit={handleSubmit}>
          <label className='ksf-label'>
            <p>Username</p>
            <input
              type='text'
              onChange={(e) => setUserName(e.target.value)}
              className='ksf-input'
            />
          </label>
          <label className='ksf-label'>
            <p>Password</p>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              className='ksf-input'
            />
          </label>
          <div>
            <button type='submit' className='ksf-login-button'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  getData: PropTypes.object,
  currentArticleId: PropTypes.string,
};

export default Login;
