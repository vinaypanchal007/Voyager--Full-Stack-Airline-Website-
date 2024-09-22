import React from 'react';
import '../Styles/AdminControls.css';
import { useNavigate } from 'react-router-dom';

function AdminControls() {  // Changed the component name to start with an uppercase letter
    const navigate = useNavigate();

    const handleAirport = async() => {
        navigate('/adminpanel/Airports');
    }

    const handleroute = async() => {
        navigate('/adminpanel/Routes');
    }

    const handleUsers = async() => {
        navigate('/adminpanel/User');
    }

    return (
        <div className='admin'>
            <div className='adbox'>
                <h2 className='title'>Admin Panel</h2>
                <button className='airport-btn' onClick={handleAirport}>Airport</button><br/>
                <button className='route-btn' onClick={handleroute}>Routes</button><br/>
                <button className='user-btn' onClick={handleUsers}>Users</button>
            </div>
        </div>
    );
}

export default AdminControls;  // Changed the export to match the new component name
