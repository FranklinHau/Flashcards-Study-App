import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import './css/LogIn.css';


// LogIn Functional Component
function LogIn({ handleAccount }) {
  // Hook to navigate between routes
  const history = useHistory();

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
        history.push("/profile");
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

  return (
    <div>
      <h1>Welcome to Study App</h1>
      <Form onSubmit={formik.handleSubmit} className="loginForm">
        <Form.Group controlId="email">
          <Form.Label className="formName">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.errors.email && <div>{formik.errors.email}</div>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="formPassword">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.errors.password && <div>{formik.errors.password}</div>}
        </Form.Group>

        <Button type="submit" className="formSubmit">Sign In</Button>
      </Form>

      <p>Not registered? <Link to="/signup">Sign Up</Link></p>
      <h2>Public Decks:</h2>
      <ul>
        {publicDecks.map((deck, index) => (
          <li key={index}>
            <strong>{deck.title}</strong>
            <ul>
              {deck.cards.map((card, cardIndex) => (
                <li key={cardIndex}>
                  <strong>Question:</strong> {card.question} <br />
                  <strong>Answer:</strong> {card.answer}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogIn;


