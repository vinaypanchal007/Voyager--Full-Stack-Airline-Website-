import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/FlightFind.css';
import { FormContext } from './FormContext';

function FlightFind() {
  const [flightData] = useContext(FormContext);
  const [routes, setRoutes] = useState([]);
  const { from = '', to = '', ecocount = 0, bizcount = 0, firstcount = 0 } = flightData;

  const ecoCount = Number(ecocount);
  const bizCount = Number(bizcount);
  const firstCount = Number(firstcount);

  const dep = from.match(/\(([^)]+)\)/);
  const depIATA = dep ? dep[1] : '';
  const arr = to.match(/\(([^)]+)\)/);
  const arrIATA = arr ? arr[1] : '';

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

  const matchedRoutes = routes
    .filter((r) => r.from.includes(depIATA) && r.to.includes(arrIATA))
    .map((r) => ({
      ...r,
      economyPrice: Number(r.economyPrice),
      businessPrice: Number(r.businessPrice),
      firstClassPrice: Number(r.firstClassPrice),
    }));

  const isLoggedIn = localStorage.getItem('user') !== null;

  return (
    <div className="ff">
      <div className="route">
        <p className="from">{depIATA}</p>
        <p className="mark">-------------------------------------</p>
        <p className="to">{arrIATA}</p>
      </div>
      <div className="cards">
        {matchedRoutes.length === 0 && <p>No routes available</p>}
        {matchedRoutes.map((route, index) => {
          const economyTotal = ecoCount > 0 ? ecoCount * route.economyPrice : 0;
          const businessTotal = bizCount > 0 ? bizCount * route.businessPrice : 0;
          const firstClassTotal = firstCount > 0 ? firstCount * route.firstClassPrice : 0;

          const totalPrice = economyTotal + businessTotal + firstClassTotal;

          return (
            totalPrice > 0 && (
              <div key={index} className="route-card">
                <div className="time-card">
                  <h4>{route.from}</h4>
                  <h4>{route.to}</h4>
                  <p>Departure Time: {route.depTime}</p>
                  {economyTotal > 0 && <p>{ecoCount} x Economy Class = {economyTotal.toFixed(2)} Fr.</p>}
                  {businessTotal > 0 && <p>{bizCount} x Business Class = {businessTotal.toFixed(2)} Fr.</p>}
                  {firstClassTotal > 0 && <p>{firstCount} x First Class = {firstClassTotal.toFixed(2)} Fr.</p>}
                  <p>Total Price: {totalPrice.toFixed(2)} Fr.</p>
                  <Link to={isLoggedIn ? "/FlightFind/PersonalInfo" : "/Login"} className="book-button">
                    {isLoggedIn ? 'Book' : 'Login'}
                  </Link>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default FlightFind;
