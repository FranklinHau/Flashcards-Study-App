
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

function LogIn({ handleAccount }) {
  const navigate = useNavigate();
  const [publicDecks, setPublicDecks] = useState([]);

  const formSchema = yup.object().shape({
    email: yup.string().required("Email is required").max(20),
    password: yup.string().required("Password is required").max(20),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      // Perform your login logic here
      const res = await fetch("/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const user = await res.json();
        handleAccount(user);
        navigate("/profile");
      } else {
        //
      }
    },
  });

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
  
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to FLASHCARDS Study App</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label style={{ marginBottom: '1rem' }}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div>{formik.errors.email}</div>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="label-spacing">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div>{formik.errors.password}</div>}
        </Form.Group>
        
        <Button type="submit">Sign In</Button>
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

