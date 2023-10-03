import React from 'react';
import UserComponent from './UserComponent';
import config from './config';

function App() {
  return (
    <div className='App'>
      <h1>User Management</h1>
      <UserComponent/>
    </div>
  )
}
axios.get(`${config.apiBaseURL}/users`)
export default App;