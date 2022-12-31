import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './Context/AuthContext';
import './i18nextInit'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.addEventListener("DOMContentLoaded", () => {
  const start = new Date().getTime();
  window.addEventListener("beforeunload", () => {
    const end = new Date().getTime();
    const totalTime = (end - start) / 1000
    const data = {
      time: totalTime
    }
    axios.post("http://localhost:8080/api/pulledStr/averageTime", data)
    console.log(JSON.parse(localStorage.getItem("data")._id))
  });
});
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="35955249464-jdrpq4e1o11i7dohrns44m27uqnh6q5s.apps.googleusercontent.com">

      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();