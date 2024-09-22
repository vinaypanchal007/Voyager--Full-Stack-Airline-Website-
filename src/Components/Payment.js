import React, { useContext, useState } from 'react';
import '../Styles/Payment.css';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';
import axios from 'axios';

function Payment() {
  const [formData] = useContext(FormContext);  
  const { 
    name,
    email,
    phone,
    from,
    to,
    dateFrom,
    depTime,
    ecocount,
    bizcount,
    firstcount,
    totalPrice,
    voyagerPlus,
    selectedSeats 
  } = formData;

  console.log(formData.name)
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      setPaymentData({ ...paymentData, [name]: formattedValue });
    } else {
      setPaymentData({ ...paymentData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem('username');
    const cleanUsername = storedUsername.replace(/\\|"|'/g, '');
    let username = cleanUsername;
    const ticketData = {
      username,
      name,
      email,
      phone,
      from,
      to,
      dateFrom,
      depTime,
      ecocount,
      bizcount,
      firstcount,
      totalPrice,
      voyagerPlus,
      selectedSeats
    };
  
    try {
      const response = await axios.post('http://localhost:8000/savetickets', ticketData);
      if (response.status === 201) {
        alert('Payment successful! Ticket saved.');
        navigate('/Payment/SuccessPay');
      }
    } catch (error) {
      console.error('Error saving ticket:', error);
      alert('Failed to save ticket. Please try again.');
    }
  };        

  return (
    <div id="payment-wrapper">
      <div id="payment-form">
        <h2 id="payment-header">Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              maxLength="19"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="cardHolder">Card Holder's Name</label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              value={paymentData.cardHolder}
              onChange={handleChange}
              placeholder="CardHolder Name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              placeholder="CVV"
              required
            />
          </div>
          <button id='submit_btn' value='Pay' type='submit'>
            Pay {totalPrice} Fr.
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
