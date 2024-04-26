import React from 'react';
import ReactDOM from 'react-dom/client';

import '@src/assets/global.css';
import UserProvider from '@src/contexts/UserContext.jsx';
import AppRouter from '@src/AppRouter.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <AppRouter />
  </UserProvider>
)
