import React from 'react';
import ReactDOM from 'react-dom/client';
import StoichiometryGenerator from './StoichiometryGenerator.jsx'; // Adjust the path if needed
import './index.css'; // Or potentially import your StoichiometryGenerator.css if you want

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoichiometryGenerator />
  </React.StrictMode>
);