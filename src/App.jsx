import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterRedirect from './Router.jsx';

import '../public/index.css';

export default function App() {
  return (
    <>
      <Router>
        <RouterRedirect />
      </Router>
    </>
  );
};
