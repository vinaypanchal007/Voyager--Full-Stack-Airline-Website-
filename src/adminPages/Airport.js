import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Airport.css';

function Airport() {
  const [airportName, setAirportName] = useState('');
  const [airports, setAirports] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const response = await axios.get('http://localhost:8000/airport');
      setAirports(response.data);
    } catch (error) {
      console.error('Error fetching airports:', error);
    }
  };

  const handleAddUpdate = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:8000/airport/${editId}`, { airport: airportName });
        setEditId(null);
      } else {
        await axios.post('http://localhost:8000/airport', { airport: airportName });
      }
      setAirportName('');
      fetchAirports();
    } catch (error) {
      console.error('Error adding/updating airport:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/airport/${id}`);
      fetchAirports();
    } catch (error) {
      console.error('Error deleting airport:', error);
    }
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setAirportName(name);
  };

  return (
    <div className='airport-crud'>
      <div className='box'>
        <h2>{editId ? 'Edit Airport' : 'Add Airport'}</h2>
        <input 
          type='text' 
          placeholder='Enter Airport Name' 
          className='airport-input' 
          value={airportName} 
          onChange={(e) => setAirportName(e.target.value)} 
        />
        <button className='airport-add' onClick={handleAddUpdate}>
          {editId ? 'Update' : 'Add'}
        </button>
      </div>
      <table className='airport-table'>
        <thead className='airport-head'>
          <tr><th>Airport Name</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {airports.map((airport) => (
            <tr key={airport._id}>
              <td>{airport.airport}</td>
              <td>
                <button onClick={() => handleEdit(airport._id, airport.airport)}>Edit</button>
                <button onClick={() => handleDelete(airport._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Airport;
