import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './components/users/UserContext';
import { OpenExchangeProvider } from './components/users/OpenExchangeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <OpenExchangeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OpenExchangeProvider>
    </UserProvider>
  </React.StrictMode>
)
