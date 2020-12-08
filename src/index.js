import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Axios from 'axios';

Axios.defaults.baseURL = "http://localhost:8000";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



