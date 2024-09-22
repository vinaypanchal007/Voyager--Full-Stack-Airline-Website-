import React from 'react';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import { IoTicket } from "react-icons/io5";
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <div className='home'>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div className='first'>
        <h1>About Us</h1>
        <p>Voyager Air is an airline based in Switzerland with Zurich and Geneva as our hubs to fly in and out of Switzerland. At Voyager, we believe that flying should be more than just a journey, it should be an unforgettable experience. Our mission is to provide you with unparalleled comfort, exceptional service, and the highest standards of safety as you travel to your destination.</p>
        <b className='listhead'>Our Exceptional Services include -</b>
        <ul>
          <li>Superior Passenger Comfort</li>
          <li>Exceptional Cabin Service's</li>
          <li>Exclusive Amenities</li>
          <li>Global Connectivity</li>
          <li>Customer-Centric-Approach</li>
        </ul>
        <button className='btn-book'><Link to='/Booking'>Book Your Ticket's</Link><div className='icon'><IoTicket /></div></button>
      </div>
    </div>
  );
}

export default Home;
