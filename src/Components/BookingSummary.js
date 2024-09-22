import React, { useContext, useEffect, useState, useMemo } from 'react';
import { FormContext } from './FormContext';
import '../Styles/BookingSummary.css';
import { Link } from 'react-router-dom';

function generateSeatNames(count) {
  const seatsPerRow = 9;
  const seatNames = [];
  
  for (let i = 0; i < count; i++) {
    const row = Math.floor(Math.random() * 50) + 1;
    const seat = String.fromCharCode(65 + (i % seatsPerRow));
    seatNames.push(`${row}${seat}`);
  }

  return seatNames;
}

function BookingSummary() {
  const [formData, setFormData] = useContext(FormContext);
  const [routes, setRoutes] = useState([]);

  const { from, to, dateFrom, ecocount, bizcount, firstcount, title, firstName, lastName, email, phone, voyagerPlus } = formData;

  const depIATA = from.match(/\(([^)]+)\)/)?.[1] || '';
  const arrIATA = to.match(/\(([^)]+)\)/)?.[1] || '';

  // Fetch routes once on component mount
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('http://localhost:8000/routes');
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };
    fetchRoutes();
  }, []);

  const fullname = `${title} ${firstName} ${lastName}`;

  const matchedRoute = useMemo(() => {
    return routes.find((r) => r.from.includes(depIATA) && r.to.includes(arrIATA));
  }, [routes, depIATA, arrIATA]);

  const totalEcoPrice = matchedRoute ? ecocount * matchedRoute.economyPrice : 0;
  const totalBizPrice = matchedRoute ? bizcount * matchedRoute.businessPrice : 0;
  const totalFirstPrice = matchedRoute ? firstcount * matchedRoute.firstClassPrice : 0;

  let totalPrice = (totalEcoPrice + totalBizPrice + totalFirstPrice).toFixed(2);
  if (voyagerPlus) {
    totalPrice = (totalPrice * 1.05).toFixed(2);
  }

  const economySeats = useMemo(() => generateSeatNames(ecocount), [ecocount]);
  const businessSeats = useMemo(() => generateSeatNames(bizcount), [bizcount]);
  const firstClassSeats = useMemo(() => generateSeatNames(firstcount), [firstcount]);

  const allSeats = useMemo(() => {
    return [...economySeats, ...businessSeats, ...firstClassSeats];
  }, [economySeats, businessSeats, firstClassSeats]);

  // Update FormContext with new data including the name
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      totalPrice,
      economySeats,
      businessSeats,
      firstClassSeats,
      voyagerPlus,
      selectedSeats: allSeats,
      name: fullname,
      depTime: matchedRoute ? matchedRoute.depTime : null
    }));
  }, [totalPrice, economySeats, businessSeats, firstClassSeats, voyagerPlus, allSeats, matchedRoute, fullname, setFormData]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="booking-summary-container">
      <div className="summary-box">
        <h2>Booking Summary</h2>
        <div className="summary-details">
          <div className="summary-item">
            <strong>From:</strong>
            <p>{from}</p>
          </div>
          <div className="summary-item">
            <strong>To:</strong>
            <p>{to}</p>
          </div>
          <div className="summary-item">
            <strong>Departure Date:</strong>
            <p>{dateFrom ? formatDate(dateFrom) : 'N/A'}</p>
          </div>
          {matchedRoute && (
            <div className="summary-item">
              <strong>Departure Time:</strong>
              <p>{matchedRoute.depTime}</p>
            </div>
          )}
          {ecocount > 0 && matchedRoute && (
            <>
              <div className="summary-item">
                <strong>Economy Class:</strong>
                <p>{matchedRoute.economyPrice} Fr. per Seat</p>
              </div>
              <div className="summary-item">
                <strong>No. of Seats:</strong>
                <p>{ecocount} x Economy Class Seat</p>
              </div>
              <div className="summary-item">
                <strong>Seats:</strong>
                <p>{economySeats.join(', ')}</p>
              </div>
            </>
          )}
          {bizcount > 0 && matchedRoute && (
            <>
              <div className="summary-item">
                <strong>Business Class:</strong>
                <p>{matchedRoute.businessPrice} Fr. per Seat</p>
              </div>
              <div className="summary-item">
                <strong>No. of Seats:</strong>
                <p>{bizcount} x Business Class Seat</p>
              </div>
              <div className="summary-item">
                <strong>Seats:</strong>
                <p>{businessSeats.join(', ')}</p>
              </div>
            </>
          )}
          {firstcount > 0 && matchedRoute && (
            <>
              <div className="summary-item">
                <strong>First Class:</strong>
                <p>{matchedRoute.firstClassPrice} Fr. per Seat</p>
              </div>
              <div className="summary-item">
                <strong>No. of Seats:</strong>
                <p>{firstcount} x First Class Seat</p>
              </div>
              <div className="summary-item">
                <strong>Seats:</strong>
                <p>{firstClassSeats.join(', ')}</p>
              </div>
            </>
          )}
          <div className="summary-item">
            <strong>Voyager Plus:</strong>
            <p>{voyagerPlus ? 'Yes' : 'No'}</p>
          </div>
          <div className="summary-item">
            <strong>Total Price:</strong>
            <p>{totalPrice} Fr.</p>
          </div>
          <div className="summary-item">
            <strong>Passenger Name:</strong>
            <p>{fullname}</p>
          </div>
          <div className="summary-item">
            <strong>Email:</strong>
            <p>{email}</p>
          </div>
          <div className="summary-item">
            <strong>Phone:</strong>
            <p>{phone}</p>
          </div>
        </div>
        <Link to="/Payment">Pay Now</Link>
      </div>
    </div>
  );
}

export default BookingSummary;
