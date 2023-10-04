//serves as the entry point for my application's frontend
import React from 'react';
import UserComponent from './UserComponent';
import Home from './Home'


function App() {
  return (
    <div className='App'>
      <h1>User Management</h1>
      <UserComponent/>
      <Home/>
    </div>
  )
}

export default App;