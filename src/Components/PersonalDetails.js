import React, { useContext, useState } from 'react';
import { FormContext } from './FormContext';
import { Link } from 'react-router-dom';
import '../Styles/PersonalDetails.css';

const countryCodes = [
  { code: '--select--' },
  { code: '+1' },
  { code: '+7' },
  { code: '+31' },
  { code: '+33' },
  { code: '+41' },
  { code: '+44' },
  { code: '+45' },
  { code: '+46' },
  { code: '+47' },
  { code: '+48' },
  { code: '+49' },
  { code: '+61' },
  { code: '+81' },
  { code: '+91' },
  { code: '+974' },
  { code: '+971' },
  { code: '+852' },
];

function PersonalDetails() {
  const [formData, setFormData] = useContext(FormContext);
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      phone: `${countryCode}-${phoneNumber}`, // Update phone with combined country code and number
    }));
  };

  const handleCountryCodeChange = (e) => {
    e.preventDefault();
    const code = e.target.value;
    setCountryCode(code);
    setFormData((prevData) => ({
      ...prevData,
      phone: `${code}-${phoneNumber}`, // Update phone field with country code
    }));
  };

  const handlePhoneChange = (e) => {
    e.preventDefault();
    const number = e.target.value;
    setPhoneNumber(number);
    setFormData((prevData) => ({
      ...prevData,
      phone: `${countryCode}-${number}`, // Update phone field with new number
    }));
  };

  const handleVoyagerPlusChange = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, voyagerPlus: e.target.checked }));
  };

  return (
    <div className="pd">
      <div className="box">
        <div className="title">
          <select
            className="head-title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          >
            <option value="">Select Title</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss">Miss</option>
          </select>
        </div>
        <div className="name-info">
          <input
            type="text"
            placeholder="First Name"
            className="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="lastname"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="contact">
          <input
            className="email"
            type="email"
            placeholder="Enter Email ID"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <div className="phone">
            <select className="code" onChange={handleCountryCodeChange}>
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code}
                </option>
              ))}
            </select>
            <input
              className="phone"
              type="text"
              placeholder="Enter Phone Number"
              name="phone" // You can still keep this if needed
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="voyager-plus">Voyager Plus:</label>
            <input
              type="checkbox"
              id="voyager-plus"
              checked={formData.voyagerPlus}
              onChange={handleVoyagerPlusChange}
            />
          </div>
        </div>
        <Link to="/BookingSummary">Next</Link>
      </div>
    </div>
  );
}

export default PersonalDetails;
