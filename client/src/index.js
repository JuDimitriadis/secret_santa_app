import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Start from './start';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

fetch("/api/user")
    .then((res) => res.json())
    .then((result) => {
        if (result.success === false) {
          root.render(
            <React.StrictMode>
              <Start />
            </React.StrictMode>
          );
        } else {
          root.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>
          );
    }}) ;



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
