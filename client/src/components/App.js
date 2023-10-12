import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import UserProfile from "./UserProfile";  
import SignUpForm from "./SignUpForm";  
import Decks from "./Decks";
import LogIn from "./LogIn"
import CreateDeck from "./CreateDeck";
import Cards from "./Cards"; 




function App() {
  const [user, setUser] = useState(null);

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    // Navigate the user to the login page
    // Use Navigate component from react-router-dom
    return <Navigate to="/login" />;
  };

  // Auto-login using session on the server
  useEffect(() => {
    fetch("/check_session", {
      credentials: 'include'  // Include credentials for session handling
    }).then((r) => {
      if (r.ok) {
        return r.json().then((user) => setUser(user));
      } else if (r.status === 401) {
        // Handle unauthorized access, e.g., set user to null
        setUser();
      } else {
        // Handle other status codes, throw an error
      }
    }).catch((error) => {
      //
    });
  }, []);
  

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <main>
      <Routes>
        <Route path="/login" element={<LogIn handleAccount={setUser} />} />
        <Route path="/signup" element={<SignUpForm handleAccount={setUser} />} />
        <Route path="/decks" element={<Decks user={user} />} />
        <Route path="/profile" element={user ? <UserProfile user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/create-deck" element={<CreateDeck user={user} handleAccount={setUser} />} />
        <Route path="/cards" element={<Cards user={user} handleAccount={setUser}/>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      </main>
    </>
  );
}

export default App;
