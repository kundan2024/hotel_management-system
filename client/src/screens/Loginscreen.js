import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator'; // Importing validator.js for form validation

const pastuser=JSON.parse(localStorage.getItem('currentUser'));

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State variable for error handling
  const [loading, setLoading] = useState(false);
  const [success , setSuccess] = useState(false);

  async function login() {
    setError(null); // Resetting the error state before making the API request

    // Form validation
    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }
    if (!validator.isEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    // Log in user
    try {
      const user = {
        email,
        password,
      };
      setLoading(true);
      const result = await axios.post('/api/users/login', user);
      setLoading(false);

      localStorage.setItem('currentUser' , JSON.stringify(result));
      window.location.href='/home';

      // Handle success response here
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }

  return (
    <div>
      
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bs">
          <div className="round bs my-auto">
          <br/>
          <h3 style={{color: 'white',marginTop:'-13px'}}>Login</h3>
          </div>
          {error && <div className="alert alert-danger">{error}</div>} {/* Displaying error messages */}
          <input
            type="text"
            className="form-control "
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br/>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="btn btn-primary mt-3" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
