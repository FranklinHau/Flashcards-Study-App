import React, { useState } from 'react';
import axios from 'axios';
import config from './config';
import { ReCAPTCHA } from 'react-google-recaptcha';



const UserComponent = () => {
  // Initilize user state 
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false); 
  

  // Funtion to handle CAPTCHA
  const handleCaptcha = (value) => {
    if (value) {
      setIsCaptchaValid(true);
    } else {
      setCaptchaValue(false);
    }
  }
  // Function to create a new user 
  const createUser = async () => {
    // validation
    if (!newUser.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setMessage('Invalid email format');
      return;
    }
    if (newUser.password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    if (!termsAccepted) {
      setMessage('You must accept the terms and conditions');
      return;
    }
    if (!isCaptchaValid) {
      setMessage('Invalid CAPTCHA'); 
      return;
    }

    setIsLoading(true); // starts loading 

    try {
      await axios.post(`${config.apiBaseURL}/users`, newUser);
      setMessage('User successfully registered');
    } catch (error) {
      setMessage('An error occurred');
      console.log('Error', error);
    }
    setIsLoading(false); // stops loading 
  };

    return (
      <div className='Registration-container'>
        <h2>Register</h2>
        {message && <div className='message'>{message}</div>}
        {isLoading ? <div>Loading...</div> : null}

        {/* Form to create a new user */}
        <input
          type='text'
          placeholder='Username'
          value={newUser.username}
          onChange={e => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type='email'
          placeholder='Email'
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={newUser.confirmPassword}
          onChange={e => setNewUser({ ...newUser, confirmPassword: e.target.value })}
        />
        <input
          type='checkbox'
          id='terms'
          checked={termsAccepted}
          onChange={e => setTermsAccepted(e.target.checked)}
        />
        <input
          type='text'
          placeholder='Enter CAPTCHA'
          value={captchaValue}
          onChange={e => {
            const value = e.target.value;
            setCaptchaValue(value);
            handleCaptcha(value);
          }}
          />
          <ReCAPTCHA
            sitekey='YOUR_RECAPTCHA_SITE_KEY_HERE'
            onChange={handleCaptcha}
          />
        <label htmlFor='terms'>I accept the terms and conditions</label>
        <button onClick={createUser}>Create User</button>
      </div>
    );
  };

  export default UserComponent;