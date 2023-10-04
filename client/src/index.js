//serves as the entry point for my React application. 
//It's responsible for rendering the App component
import React from "react";
import App from './components/App';
import "./index.css";
import ReactDOM from "react-dom";


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

