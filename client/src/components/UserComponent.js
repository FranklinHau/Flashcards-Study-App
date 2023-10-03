import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';

const UserComponent = () => {
  // Initilize user state 
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: ''});

  // Load existing users when components mounts 
  useEffect(() => {
    axios.get(`${config.apiBaseURL}/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.log(error));
  }, []);
  // Function to create a new user 
  const createUser = () => {
    axios.post(`${config.apiBaseURL}/users`, newUser)
    .then(response => {
      // update user state with new user
      setUsers([...users, response.data]);
    })
    .catch(error => console.log(error));
  };
  // function to delete a user 
  const deleteUser = (id) => {
    axios.delete(`${config.apiBaseURL}/users/${id}`)
      .then(response => {
        // remove deleted user from state)
        setUsers(users.filter(user => user.id !== id));
  })
    .catch(error => console.log(error));
  };

  // function to update a user 
  const updateUser = (id, updateUser) => {
    axios.put(`${config.apiBaseURL}/users/${id}`, updateUser)
      .then(response => {
        // update state with updated user 
        setUsers(users.map(user => (user.id === id ? updateUser : user)));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      {/* Display existing users */}
      <ul>
        {users.map(user => (
          <li key={user.id}> 
            {user.username} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
        ))}
      </ul>

      {/* Form to create a new user */}
      <input
        type='text'
        placeholder='Username'
        value={newUser.username}
        onChange={e => setNewUser({ ...newUser, username: e.target.value})}
      />
      <input
        type='email'
        placeholder='Email'
        value={newUser.email}
        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type='password'
        placeholder='Password'
        value={newUser.password}
        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={createUser}>Create User</button>
    </div>
  );
};

export default UserComponent; 