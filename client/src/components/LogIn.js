import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

// LogIn Functional Component
function LogIn({ handleAccount }) {
  // Hook to navigate between routes
  const navigate = useNavigate();

  // State to manage public decks
  const [publicDecks, setPublicDecks] = useState([]);

  // Validation schema for the form
  const formSchema = yup.object().shape({
    email: yup.string().required("Email is required").max(20),
    password: yup.string().required("Password is required").max(20),
  });

  // useFormik hook to manage the form state and handle submission
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      // Logic to handle form submission and user login
      const res = await fetch("/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Handling the response from the server
      if (res.ok) {
        const user = await res.json();
        handleAccount(user);
        navigate("/profile");
      } else {
        // Handling errors or unsuccessful login
      }
    },
  });

  // useEffect hook to fetch public decks when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/public_decks', {
          credentials: 'include', 
        });
        if (response.ok) {
          const fetchedDecks = await response.json();
          setPublicDecks(fetchedDecks);
        } else {
          console.error("Failed to fetch data: ", response.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      }
    };
  
    fetchData(); // Calling the fetchData function
  }, []);

  // Rendering the UI of the LogIn component
  return (
    <div>
      <h1>Welcome to FLASHCARDS Study App</h1>

      {/* Form for user login */}
      <Form onSubmit={formik.handleSubmit}>
        {/* ... (Form fields and buttons here) ... */}
      </Form>
      
      {/* Links and list of public decks */}
      <p>Not registered? <Link to="/signup">Sign Up</Link></p>
      <h2>Public Decks:</h2>
      <ul>
      {/* Mapping through public decks and rendering them */}
      {publicDecks.map((deck, index) => (
        <li key={index}>
          {/* ... (Deck details here) ... */}
        </li>
      ))}
    </ul>
    </div>
  );
}

// Exporting the LogIn component as default
export default LogIn;


