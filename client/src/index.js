import React from "react";
import App from "./App";
import "./index.css";
import { ReactDOM } from "react-dom";
import config from './config';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    document.getElementById('root')
);


axios.get(`${config.apiBaseURL}/users`)