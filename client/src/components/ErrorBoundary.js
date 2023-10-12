import React, { Component } from 'react';

// Function to log errors to a service or the console
function logErrorToMyService(error, errorInfo) {
    // Log the error and the component stack trace
    console.error("Caught an error:", error, errorInfo);
}

// ErrorBoundary class component
class ErrorBoundary extends Component {
  // Constructor to initialize state
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // State to track whether an error occurred
  }

  // Lifecycle method to update state based on errors
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // Lifecycle method to catch errors and log them
  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service or console
    logErrorToMyService(error, errorInfo);
  }

  // Render method to display either the fallback UI or the children components
  render() {
    if (this.state.hasError) {
      // Render fallback UI if an error occurred
      return <h1>Something went wrong.</h1>;
    }

    // Render children components if no error occurred
    return this.props.children;
  }
}


export default ErrorBoundary;
