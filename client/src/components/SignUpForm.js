import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, InputGroup, Row, Col, Alert } from "react-bootstrap";


function SignUpForm({ handleAccount }) {
  // State to hold feedback messages and loading status
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form validation schema using Yup
  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required").max(20),
    email: yup.string().required("Email is required").email("Invalid email address").max(100),
    password: yup.string().required("Password is required").max(20),
    bio: yup.string().optional(),
    profile_image: yup.string().optional(),
  });

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      profile_image: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const res = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setIsLoading(false);

      // Handle different server responses
      if (res.ok) {
        const user = await res.json();
        handleAccount(user);
        navigate("/profile");
      } else if (res.status === 422) {
        setMessage("Username or Email already exists");
      } else {
        setMessage("An unexpected error occurred");
      }
    },
  });

  return (
    <Form className="signUpForm" onSubmit={formik.handleSubmit}>
      <h2 className="addAccount">Sign Up</h2>
      {/* Display error messages */}
      {message && <Alert variant="danger">{message}</Alert>}
      <div>
        <InputGroup>
          <Row>
            {/* Username field */}
            <Col lg="10">
              <Form.Label htmlFor="username">Username:</Form.Label>
              <Form.Control
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <p style={{ color: "red" }}>{formik.errors.username}</p>
            </Col>
            {/* Email field */}
            <Col lg="10">
              <Form.Label style={{ marginRight: '10px' }} htmlFor="email">Email:</Form.Label>
              <Form.Control
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            </Col>
            {/* Password field */}
            <Col lg="10">
              <Form.Label style={{ marginRight: '10px' }} htmlFor="password">Password:</Form.Label>
              <Form.Control
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <p style={{ color: "red" }}>{formik.errors.password}</p>
            </Col>
            {/* Bio field */}
            <Col lg="10">
              <Form.Label htmlFor="bio">Bio:</Form.Label>
              <Form.Control
                id="bio"
                type="text"
                name="bio"
                placeholder="Tell us about yourself"
                onChange={formik.handleChange}
                value={formik.values.bio}
              />
            </Col>
            {/* Profile Image field */}
            <Col lg="10">
              <Form.Label htmlFor="profile_image">Profile Image URL:</Form.Label>
              <Form.Control
                id="profile_image"
                type="text"
                name="profile_image"
                placeholder="Enter profile image URL"
                onChange={formik.handleChange}
                value={formik.values.profile_image}
              />
            </Col>
          </Row>
        </InputGroup>
      </div>
      {/* Submit button */}
      <Button className="formSubmit" variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign Up"}
      </Button>
    </Form>
  );
}

export default SignUpForm;



