import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Home from './components/Home.jsx'
import Error from './components/Error.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import getData from './getData.jsx';

export default function RouterRedirect() {

  const [userdatas, setuserData] = useState({data: [], isLoading: true, errorMessage: ''});
  const [songdatas, setsongData] = useState({data: [], isLoading: true, errorMessage: ''});

  getData('http://localhost:3000/users', setuserData);
  getData('http://localhost:3000/playlists', setsongData);

  // console.log(songdatas);
  // console.log(userdatas);

  const location = useLocation();
  if(userdatas.isLoading == true || songdatas.isLoading == true){
    return (
      <>
        <div className='relative w-full h-full'>
          <div className='h-screen flex flex-col items-center justify-center'>
            <FontAwesomeIcon icon={faSpinner} spin className='mb-5' size='xl' />
            <h1 className='text-2xl'>LOADING</h1>
            <h2 className='mb-10 font-scl'>{songdatas.errorMessage}/{userdatas.errorMessage}</h2>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home _songdata={songdatas.data}/>}/>
        <Route path='*' element={<Error />}/>
        <Route path='/login' element={<Login _userdata={userdatas.data}/>}/>
        <Route path='/register' element={<Register _userdata={userdatas.data}/>}/>
      </Routes>
    </>
  )
}

