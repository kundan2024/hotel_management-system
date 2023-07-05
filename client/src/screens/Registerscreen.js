import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator'; // Importing validator.js for form validation
import Success from "../components/Success";
import Loader from "../components/Loader";

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [error, setError] = useState(null); // State variable for error handling


  const [loading, setLoading] = useState(false);
  const [success , setSuccess] = useState(false);

  async function register() {
    setError(null); // Resetting the error state before making the API request

    // Form validation
    if (!name || !email || !password || !cpassword) {
      setError('All fields are required');
      return;
    }
    if (!validator.isEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password !== cpassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    // Register new user
    try {
      const user = {
        name,
        email,
        password,
      };

      setLoading(true);

      const result = await axios.post('/api/users/register', user);

      setLoading(false);
      setSuccess(true);

      setName('');
      setEmail('');
      setPassword('');
      setCPassword('');
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
      {loading&&(<Loader/>)}
      {success&&(<Success message='Registration Successfull !!'/>)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bs">
          <h1>Register</h1>
          {error && <div className="alert alert-danger">{error}</div>} {/* Displaying error messages */}
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          /><br/>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          /><br/>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          /><br/>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
          /><br/>
          <button className="btn btn-primary mt-3" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
