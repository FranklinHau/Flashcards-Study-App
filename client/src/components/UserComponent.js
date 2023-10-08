import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import config from './config';

const UserComponent = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match")
        .required('Required'),
      termsAccepted: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions'),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Sending this data to server: ", values);
        console.log("API Base URL: ", config.apiBaseURL);

        // Removed the Authorization header and token-related code
        const response = await axios.post(`${config.apiBaseURL}/users`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check the response status before showing the alert
        if (response.status === 201) {
          alert('User successfully registered');
        } else {
          alert('An error occurred');
        }
      } catch (error) {
        alert('An error occurred');
        console.log('Error', error);
      }
    },
  });

  return (
    <div className="Registration-container">
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* ...existing form fields... */}
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default UserComponent;
