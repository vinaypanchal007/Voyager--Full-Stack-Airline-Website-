import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Routecrud.css';

function Routecrud() {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({
    airport: '', from: '', to: '', depTime: '', economyPrice: '', businessPrice: '', firstClassPrice: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentRouteId, setCurrentRouteId] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/routes');
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const handleChange = (e) => {
    setNewRoute({
      ...newRoute,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const response = await axios.put(`http://localhost:8000/routes/${currentRouteId}`, newRoute);
        setRoutes(routes.map(route => route._id === currentRouteId ? response.data : route));
        setEditing(false);
        setNewRoute({ airport: '', from: '', to: '', depTime: '', economyPrice: '', businessPrice: '', firstClassPrice: '' });
        setCurrentRouteId(null);
      } else {
        const response = await axios.post('http://localhost:8000/routes', newRoute);
        setRoutes([...routes, response.data]);
        setNewRoute({ airport: '', from: '', to: '', depTime: '', economyPrice: '', businessPrice: '', firstClassPrice: '' });
      }
    } catch (error) {
      console.error(`Error ${editing ? 'updating' : 'adding'} route:`, error);
    }
  };

  const handleEdit = (route) => {
    setEditing(true);
    setCurrentRouteId(route._id);
    setNewRoute({
      from: route.from,
      to: route.to,
      depTime: route.depTime,
      economyPrice: route.economyPrice,
      businessPrice: route.businessPrice,
      firstClassPrice: route.firstClassPrice
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/routes/${id}`);
      setRoutes(routes.filter(route => route._id !== id));
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  return (
    <div className='r'>
      <div className='rbox'>
        <h2>{editing ? 'Edit Route' : 'Add Route'}</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' name='from' placeholder='Enter Departure Airport' value={newRoute.from} onChange={handleChange} className='dinput' />
          <input type='text' name='to' placeholder='Enter Arrival Airport' value={newRoute.to} onChange={handleChange} className='ainput' />
          <input type='text' name='depTime' placeholder='Enter Departure Time' value={newRoute.depTime} onChange={handleChange} className='tinput' />
          <input type='text' name='economyPrice' placeholder='Enter Economy Price' value={newRoute.economyPrice} onChange={handleChange} className='eprice' />
          <input type='text' name='businessPrice' placeholder='Enter Business Price' value={newRoute.businessPrice} onChange={handleChange} className='bprice' />
          <input type='text' name='firstClassPrice' placeholder='Enter First Class Price' value={newRoute.firstClassPrice} onChange={handleChange} className='fprice' />
          <button type='submit' className='submit-btn'>{editing ? 'Update' : 'Submit'}</button>
        </form>
      </div>
      <table className='route-table'>
        <thead className='route-head'>
          <tr>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Departure Time</th>
            <th>Economy Price</th>
            <th>Business Price</th>
            <th>First Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {routes.map(route => (
            <tr key={route._id}>
              <td>{route.from}</td>
              <td>{route.to}</td>
              <td>{route.depTime}</td>
              <td>{route.economyPrice}</td>
              <td>{route.businessPrice}</td>
              <td>{route.firstClassPrice}</td>
              <td>
                <button onClick={() => handleEdit(route)}>Edit</button>
                <button onClick={() => handleDelete(route._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Routecrud;
