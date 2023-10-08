import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


// Form validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
  });
  
  function Home() {
    const history = useHistory();
  
    // Using Formik for form handling
    const formik = useFormik({
      initialValues: { email: '', password: '' },
      validationSchema: validationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          const response = await axios.post('http://localhost:5555/login', values);
          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access_token);
            history.push('/profile');
          }
        } catch (error) {
          alert('An error occurred during login');
          console.error(error);
        }
        setSubmitting(false);
      },
    });
  
    const navigateToRegister = () => {
      history.push('/register');
    };
  
    return (
      <div className="home-container">
        <h1>Welcome to The Flashcard App!</h1>
        <div className="auth-section">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
  
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
  
            <button type="submit">Login</button>
          </form>
          <button onClick={navigateToRegister}>Register</button>
        </div>
      </div>
    );
  }
  
  export default Home;