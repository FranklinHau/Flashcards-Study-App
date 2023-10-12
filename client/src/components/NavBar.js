import React from "react";
import { Link, useNavigate } from "react-router-dom";

// NavBar Functional Component
function NavBar({ user, handleLogout }) {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle logout and navigation
  const logoutAndNavigate = () => {
    // Confirming logout action with the user
    const confirmLogout = window.confirm("You're about to be logged out from your account. Do you wish to continue?");
    
    if (confirmLogout) {
      handleLogout(); // Calling logout handler passed as prop
      navigate("/login"); // Navigating to login page
    }
  };
  // Rendering the NavBar UI
  return (
    <nav>
      {user ? (
        <>
          <button onClick={logoutAndNavigate}>Home</button>  {/* Button to trigger logout and navigate to login page */}
        </>
      ) : (
        <Link to="/login">Home</Link>  //{/* Link to navigate to login page if user is not authenticated */}
      )}
    </nav>
  );
}

export default NavBar;
