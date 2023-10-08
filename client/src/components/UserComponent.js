import React, { useState } from 'react';
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
      // Your Axios call here
      try {
        await axios.post(`${config.apiBaseURL}/users`, values);
        alert('User successfully registered');
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
        <input
          type="text"
          name="username"
          placeholder="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}

        <input
          type="checkbox"
          name="termsAccepted"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.termsAccepted}
        />
        <label htmlFor="termsAccepted">I accept the terms and conditions</label>
        {formik.touched.termsAccepted && formik.errors.termsAccepted ? <div>{formik.errors.termsAccepted}</div> : null}

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserComponent;