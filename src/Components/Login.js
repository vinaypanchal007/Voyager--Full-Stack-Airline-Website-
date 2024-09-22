import React, { useState } from 'react';
import '../Styles/Login.css';
import userimg from '../Images/user.png';
import password from '../Images/password.png';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({ username: '', password: '', showPassword: false });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setUser(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }));
  };

  const validateInputs = () => {
    let formErrors = {};

    if (!user.username.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) {
      formErrors.username = "Username must include uppercase letters and numbers.";
    }

    if (!user.password.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) {
      formErrors.password = "Password must include uppercase letters and numbers.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle login click
  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        // Make a POST request to the backend login API
        const response = await axios.post('http://localhost:8000/login', {
          username: user.username,
          password: user.password,
        });

        console.log(response.data); // Check the response object for debugging

        // If successful login, process token and user details
        if (response.status === 200) {
          const decodedToken = jwtDecode(response.data.token); // Decode JWT token
          console.log(decodedToken.role); // Log user role for debugging

          // Store the token and user details in localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('username', JSON.stringify(response.data.user.username));

          // Navigate based on role
          if (decodedToken.role === 'admin') {
            navigate('/adminpanel');
          } else {
            navigate('/');
          }

          // Reload to ensure proper state update
          window.location.reload();
        }
      } catch (error) {
        console.error("Login error: ", error.response ? error.response.data.message : error.message); // Debugging error
        alert(error.response ? error.response.data.message : "An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <div className='login'>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='box'>
        <div className='header'>
          <h1 className='name'>Login</h1>
        </div>
        <form onSubmit={handleLoginClick}>
          <div className='user'>
            <img src={userimg} alt='User Icon' className='userimg'/>
            <input
              type='text'
              placeholder='Enter Username'
              name='username'
              value={user.username}
              onChange={handleChange}
            />
          </div>
          {errors.username && <span className='error'>{errors.username}</span>}
          <div className='pass'>
            <img src={password} alt='Password Icon' className='passimg'/>
            <input
              type={user.showPassword ? 'text' : 'password'}
              placeholder='Enter Password'
              name='password'
              value={user.password}
              onChange={handleChange}
            />
            <button type="button" onClick={togglePasswordVisibility} className='toggle-password'>
              {user.showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <span className='error'>{errors.password}</span>}
          <div className='forget'>
            Create Account? <Link to='/Login/Register'>Click Here</Link>
          </div>
          <div className='btn'>
            <button type='submit' className='btn-logic' onClick={handleLoginClick}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
