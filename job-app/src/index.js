import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import ErrorBoundary from './ErrorBoundry'; // Import ErrorBoundary

// Polyfill for process
window.process = {
  env: {
    NODE_ENV: 'development' // or 'production', as needed
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* Wrap the app with Provider and pass the store */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();