import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';

import '@assets/global.css';
import UserProvider from '@contexts/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
)
