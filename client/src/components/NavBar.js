import React from "react";
import { Link, useHistory } from "react-router-dom";
import './css/NavBar.css';

// NavBar Functional Component
function NavBar({ user, handleLogout }) {
  // Hook for programmatic navigation
  const history = useHistory();

  // Function to handle logout and navigation
  const logoutAndNavigate = () => {
    // Confirming logout action with the user
    const confirmLogout = window.confirm("You're about to be logged out from your account. Do you wish to continue?");
    
    if (confirmLogout) {
      handleLogout(); // Calling logout handler passed as prop
      history.push("/login"); // Navigating to login page
    }
  };
  // Rendering the NavBar UI
  return (
    <nav className="mainContainer">
      {user ? (
        <>
          <button className="homeButton" onClick={logoutAndNavigate}>Home</button>  {/* Button to trigger logout and navigate to login page */}
        </>
      ) : (
        <Link className="homeButton" to="/login">Home</Link>  //{/* Link to navigate to login page if user is not authenticated */}
      )}
    </nav>
  );
}

export default NavBar;
