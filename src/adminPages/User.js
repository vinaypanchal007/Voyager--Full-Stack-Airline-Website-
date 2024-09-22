import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/User.css';

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '' });
  const [editing, setEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const response = await axios.put(`http://localhost:8000/users/${currentUserId}`, newUser);
        setUsers(users.map(user => user._id === currentUserId ? response.data : user));
        setEditing(false);
        setNewUser({ username: '', email: '', password: '', role: '' });
        setCurrentUserId(null);
      } else {
        const response = await axios.post('http://localhost:8000/users', newUser);
        setUsers([...users, response.data]);
        setNewUser({ username: '', email: '', password: '', role: '' });
      }
    } catch (error) {
      console.error('Error submitting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUserId(user._id);
    setNewUser({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='user-crud'>
      <div className='user-box'>
        <h2>{editing ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' name='username' placeholder='Enter Username' value={newUser.username} onChange={handleChange} className='username-input' />
          <input type='email' name='email' placeholder='Enter Email' value={newUser.email} onChange={handleChange} className='email-input' />
          <input type='text' name='password' placeholder='Enter Password' value={newUser.password} onChange={handleChange} className='password-input' />
          <input type='text' name='role' placeholder='Enter Role' value={newUser.role} onChange={handleChange} className='role-input' />
          <button type='submit' className='submit-button'>{editing ? 'Update' : 'Submit'}</button>
        </form>
      </div>
      <table className='user-table'>
        <thead className='user-head'>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;