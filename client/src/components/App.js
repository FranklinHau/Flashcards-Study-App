import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Switch, useHistory, Redirect } from 'react-router-dom';

import NavBar from "./NavBar";
import UserProfile from "./UserProfile";  
import SignUpForm from "./SignUpForm";  
import Decks from "./Decks";
import LogIn from "./LogIn"
import CreateDeck from "./CreateDeck";
import Cards from "./Cards"; 


function App() {
  // State to manage user authentication
  const [user, setUser] = useState(null);

  const history = useHistory();
  // Function to handle user logout
  const handleLogout = () => {
    // Resetting the user state to null (unauthenticated)
    setUser(null);
    // Navigating the user to the login page
    history.push('/login');
  };

  // Effect hook to auto-login user based on the server session
  useEffect(() => {
    // Fetch request to check for an active session on the server
    fetch("/check_session", {
      credentials: 'include'  // Include credentials for session handling
    }).then((r) => {
      if (r.ok) {
        // If session is active, set user state with the returned user data
        return r.json().then((user) => setUser(user));
      } else if (r.status === 401) {
        // If unauthorized, reset user state to null
        setUser();
      } else {
        // Handling other unexpected statuses
      }
    }).catch((error) => {
      // 
    });
  }, []);  
  
  
  return (
    <BrowserRouter>
      <NavBar user={user} handleLogout={handleLogout} />
      <Switch>
          <Route path="/login" render={() => <LogIn handleAccount={setUser} />} />
          <Route path="/signup" render={() => <SignUpForm handleAccount={setUser} />} />
          <Route path="/decks" render={() => <Decks user={user} />} />
          <Route path="/profile" render={() => user ? <UserProfile user={user} handleLogout={handleLogout} /> : <Redirect to="/login" />} />
          <Route path="/create-deck" render={() => <CreateDeck user={user} handleAccount={setUser} />} />
          <Route path="/cards" render={() => <Cards user={user} handleAccount={setUser}/>} />
          <Redirect from="/" to="/login" /> {/* Default redirect */}
      </Switch>
    </BrowserRouter>
  );
}


export default App;
