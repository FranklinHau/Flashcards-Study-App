import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from './config';

// Form validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
});

function Home() {
  const formikRef = useRef(null);
  const historyRef = useRef(null);

  // Using Formik for form handling
  formikRef.current = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${config.apiBaseURL}/login`, values);

        if (response.status === 200) {
          historyRef.current.push('/profile');
        }
      } catch (error) {
        alert('An error occurred during login');
        console.error(error);
      }
      setSubmitting(false);
    },
  });

  historyRef.current = useHistory();

  const navigateToRegister = () => {
    historyRef.current.push('/register');
  };

  return (
    <div className="home-container">
      <h1>Welcome to The Flashcard App!</h1>
      <div className="auth-section">
        <form onSubmit={formikRef.current.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={formikRef.current.handleChange}
            onBlur={formikRef.current.handleBlur}
            value={formikRef.current.values.email}
          />
          {formikRef.current.touched.email && formikRef.current.errors.email ? <div>{formikRef.current.errors.email}</div> : null}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formikRef.current.handleChange}
            onBlur={formikRef.current.handleBlur}
            value={formikRef.current.values.password}
          />
          {formikRef.current.touched.password && formikRef.current.errors.password ? <div>{formikRef.current.errors.password}</div> : null}

          <button type="submit">Login</button>
        </form>
        <button onClick={navigateToRegister}>Register</button>
      </div>
    </div>
  );
}

export default Home;
