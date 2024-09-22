import React, { useState } from 'react';
import '../Styles/Help.css';
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Helmet } from 'react-helmet';

function Help() {

  const initialState = {
    username: '',
    email: '',
    issuemsg: ''
  };
  let [input, setInput] = useState(initialState);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input); // Log the form data (you can replace this with your desired logic)
    setInput(initialState); // Clear form inputs after submission
    alert('Report submitted')
  };

  return (
    <div className='help'>
      <Helmet>
        <title>Customer Support</title> 
      </Helmet>
      <div className='box'>
        <div className='header'><h1>Help Center</h1></div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='user'>
            <FaUser className='usericon'/>
            <input type='text' className='userinput' placeholder='Enter User Name' name='username' value={input.username} onChange={handleChange} />
          </div>
          <div className='email'>
            <MdOutlineEmail className='emailicon'/>
            <input type='email' className='emailinput' placeholder='Enter Email-Id' name='email' value={input.email} onChange={handleChange} />
          </div>
          <div className='issue_msg'>
            <textarea className='msg' placeholder='Describe your issue' name='issuemsg' value={input.issuemsg} onChange={handleChange}></textarea>
          </div>
          <div className='btn-submit'>
            <button type='submit' className='submit'>Report Issue</button>
          </div>
          <div className='helpline'>
            <FaPhoneAlt /> - +090 1111-2222-3333
          </div>
          <div className='help_email'>
            <MdOutlineEmail /> - CustomerSupport@AuraAir.com
          </div>
        </form>
      </div>
    </div>
  );
}

export default Help;
