//serves as the entry point for my React application. 
//It's responsible for rendering the App component
import React from "react";
import App from './components/App';
import "./index.css";
import {createRoot} from "react-dom/client";

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(<App />);

