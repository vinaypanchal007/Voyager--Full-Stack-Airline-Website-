import React, { useState } from 'react';
import user from '../Images/user.png';
import password from '../Images/password.png';
import email from '../Images/email.png';
import '../Styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

function Register() {
  const initialState = {
    username: "", 
    email: "",
    password: "",
    showPassword: false
  };

  const [userInput, setUserInput] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setUserInput(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }));
  };

  const validateInputs = () => {
    let formErrors = {};
  
    if (!userInput.username.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) {
      formErrors.username = "Username must include symbols, capital letters, and numbers.";
    }
  
    if (!userInput.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      formErrors.email = "Email format is not correct.";
    }
  
    if (!userInput.password.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) {
      formErrors.password = "Password must include symbols, capital letters, and numbers.";
    }
  
    setErrors(formErrors);
  
    return Object.keys(formErrors).length === 0;
  };  

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
        const response = await axios.post('http://localhost:8000/register', userInput);
        navigate('/Login');
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred during registration. Please try again later.");
          console.error("Error details:", error);
        }
      }
    }
  };

  return (
    <div className='register'>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className='box'>
        <div className='header'>
          <h1>Register</h1>
        </div>
        <div className='user'>
          <img src={user} alt='user icon' className='userimg'/>
          <input
            type='text'
            placeholder='Enter Username'
            name='username'
            value={userInput.username}
            onChange={handleChange}
          />
        </div>
        {errors.username && <span className='error'>{errors.username}</span>}
        <div className='email'>
          <img src={email} alt='email icon' className='emailimg'/>
          <input
            type='text'
            placeholder='Enter Email'
            name='email'
            value={userInput.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <span className='error'>{errors.email}</span>}
        <div className='pass'>
          <img src={password} alt='password icon' className='passimg'/>
          <input
            type={userInput.showPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            name='password'
            value={userInput.password}
            onChange={handleChange}
          />
          <button type="button" onClick={togglePasswordVisibility} className='toggle-password'>
            {userInput.showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <span className='error'>{errors.password}</span>}
        <div className='btn'>
          <button type='submit' className='btn-logic' onClick={handleSubmit}>Register</button>
        </div>
        <div className='login-link'>
          Already have an account? <Link to='/Login'>Login Here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
