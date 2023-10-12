import React from 'react';  
import ReactDOM from 'react-dom';  
import { Provider } from 'react-redux';  
import ErrorBoundary from './components/ErrorBoundary';  
import store from './components/store'; 
import App from './components/App';  

// Rendering the root component into the DOM
ReactDOM.render(
  <Provider store={store}>  {/* Wrapping the app inside the Provider to pass the Redux store down to the rest of the components */}
    <ErrorBoundary>  {/* ErrorBoundary to catch any errors occurring in the component tree and display a fallback UI instead of crashing */}
      <App />  {/* Root App component where the main part of the application resides */}
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')  // Specifying the root DOM node to render the React element into
);



