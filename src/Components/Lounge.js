import React from 'react';
import '../Styles/Lounge.css';
import l1 from '../Images/Lounge2.jpg';
import f1 from '../Images/food_L.jpg';
import { Helmet } from 'react-helmet';

function Lounge() {
  return (
    <div className='Lounge'>
      <Helmet>
        <title>Lounge</title>
      </Helmet>
      <div className='innerbox'>
        <h2>
          Welcome to Voyager Lounge: 
        </h2>
        <h4>
          Your Gateway to Comfort and Luxury in the Sky.
        </h4>
        <p className='header'> 
          At Voyager Air, we believe that your journey should be an experience of unparalleled comfort and sophistication from the moment you step into our lounge. Relax, unwind, and enjoy a range of premium amenities designed to enhance your travel experience. Whether you're preparing for a long-haul flight or a short trip, our lounge offers the perfect sanctuary to begin your journey in style. With our VoyagerAirPlus Membership you and your family can access premium lounges with excellent comfort and food services while ur flight to your destination arrives.
        </p>
        <div className='underline'></div>
        <div className='al'>
          <h3>Voyager Air Plus Lounges..</h3>
          <div className='image'>
            <img src={l1} alt='l1' className='lounge1'></img>
            <p className='imagedesc'>
              Step into luxury with Voyager Air Plus Membership. Our exclusive lounges offer a haven of comfort and sophistication, designed to elevate your travel experience. Enjoy personalized service, gourmet cuisine, and a tranquil ambiance before your flight. Whether you're traveling for business or pleasure, our lounges ensure you start your journey in style, ensuring every moment is memorable.
            </p>
          </div>
          <div className='foodimage'>
            <p className='food_desc'>Indulge in culinary delights at the Voyager Air Plus lounges. From gourmet meals to refreshing beverages, our dedicated chefs curate a menu that reflects both local flavors and international cuisine. Enjoy Swiss culinary delights alongside a selection of global favorites, ensuring a truly memorable dining experience in a luxurious setting.</p>
            <img src={f1} alt='foodpic' className='food'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lounge;
