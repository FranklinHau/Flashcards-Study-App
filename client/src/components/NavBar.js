import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ user, handleLogout }) {
  const navigate = useNavigate();

  const logoutAndNavigate = () => {
    const confirmLogout = window.confirm("You're about to be logged out from your account. Do you wish to continue?");
    if (confirmLogout) {
    handleLogout(); 
    navigate("/login");
    }
  };

  return (
    <nav>
      {user ? (
        <>
          <button onClick={logoutAndNavigate}>Home</button>
        </>
      ) : (
        <Link to="/login">Home</Link>
      )}
    </nav>
  );
}

export default NavBar;
