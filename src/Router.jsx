import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Home from './components/Home.jsx'
import Error from './components/Error.jsx'

export default function RouterRedirect() {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </>
  )
}

