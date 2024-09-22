import React, { useEffect, useState } from 'react';
import '../Styles/MyBooking.css';
import { Helmet } from 'react-helmet';

function MyBooking() {
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(error)
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const username = JSON.parse(localStorage.getItem('username')); // Retrieve the username from localStorage

        if (username) {
          const response = await fetch(`http://localhost:8000/gettickets?username=${username}`);

          if (!response.ok) {
            throw new Error(`Failed to fetch bookings: ${response.statusText}`);
          }

          const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
            setBookingData(data);
          } else {
            setError('No bookings found.');
          }
        } else {
          setError('User not logged in.');
        }
      } catch (err) {
        console.error('Error fetching booking data:', err);
        setError('An error occurred while fetching booking data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, []);

  const handleDelete = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:8000/deleteticket/${ticketId}`, { method: 'DELETE' });
      alert('Ticket Deleted Successfully')
      if (!response.ok) {
        throw new Error('Failed to delete the booking');
      }
      setBookingData(bookingData.filter(ticket => ticket._id !== ticketId));
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Failed to delete the booking');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='mBook'>
      <Helmet>
        <title>Your Bookings</title>
      </Helmet>
      {bookingData && bookingData.length > 0 ? (
        <div className='booking-list'>
          {bookingData.map((ticket, index) => (
            <div key={index} className='booking-box'>
              <div className='booking-item'><strong>From:</strong> {ticket.from}</div>
              <div className='booking-item'><strong>To:</strong> {ticket.to}</div>
              <div className='booking-item'><strong>Number of Passengers:</strong> {ticket.selectedSeats.length}</div>
              <div className='booking-item'><strong>Selected Seats:</strong> {ticket.selectedSeats.join(', ')}</div>
              <div className='booking-item'><strong>Departure Date:</strong> {new Date(ticket.dateFrom).toLocaleDateString()}</div>
              <div className='booking-item'><strong>Departure Time:</strong> {ticket.depTime}</div>
              <div className='booking-item'><strong>Name:</strong> {ticket.name}</div>
              <div className='booking-item'><strong>Email:</strong> {ticket.email}</div>
              <div className='booking-item'><strong>Phone:</strong> {ticket.phone}</div>
              <div className='booking-item'><strong>Voyager Plus:</strong> {ticket.voyagerPlus ? 'Yes' : 'No'}</div>
              <div className='booking-item'><strong>Total Price:</strong> {ticket.totalPrice} Fr.</div>
              <button className='delete-button' onClick={() => handleDelete(ticket._id)}>
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No Bookings Found</p>
      )}
    </div>
  );
}

export default MyBooking;
