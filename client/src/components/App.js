import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
  // Initilize user state 
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: ''});

  // Load existing users when components mounts 
  useEffect(() => {
    axios.get('/users')
      .then(responde => {
        setUsers(response.data);
      })
      .catch(error => console.log(error));
  }, []);
  // Function to create a new user 
  const createUser = () => {
    axios.post('/users', newUser)
    .then(response => {
      // update user state with new user
      setUsers([...users, response.data]);
    })
    .catch(error => console.log(error));
  };
  
}

