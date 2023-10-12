import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import UserProfile from "./UserProfile";  
import SignUpForm from "./SignUpForm";  
import Decks from "./Decks";
import LogIn from "./LogIn"
import CreateDeck from "./CreateDeck";
import Cards from "./Cards"; 

// Main App component
function App() {
  // State to manage user authentication
  const [user, setUser] = useState(null);

  // Function to handle user logout
  const handleLogout = () => {
    // Resetting the user state to null (unauthenticated)
    setUser(null);
    // Navigating the user to the login page
    return <Navigate to="/login" />;
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
      // Handling fetch errors
    });
  }, []);  // Empty dependency array, meaning this effect runs once after the initial render
  
  // JSX return: Structure and routing of the application
  return (
    <>
      {/* Navigation bar which receives user state and logout handler as props */}
      <NavBar user={user} handleLogout={handleLogout} />
      <main>
        {/* Defining application routes and connecting them to respective components */}
        <Routes>
          {/* Route for logging in */}
          <Route path="/login" element={<LogIn handleAccount={setUser} />} />
          
          {/* Route for signing up */}
          <Route path="/signup" element={<SignUpForm handleAccount={setUser} />} />
          
          {/* Route for viewing decks */}
          <Route path="/decks" element={<Decks user={user} />} />
          
          {/* Route for viewing the user profile, with conditional rendering based on authentication */}
          <Route path="/profile" element={user ? <UserProfile user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
          
          {/* Route for creating a new deck */}
          <Route path="/create-deck" element={<CreateDeck user={user} handleAccount={setUser} />} />
          
          {/* Route for managing cards */}
          <Route path="/cards" element={<Cards user={user} handleAccount={setUser}/>} />
          
          {/* Default route that navigates to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}


export default App;
