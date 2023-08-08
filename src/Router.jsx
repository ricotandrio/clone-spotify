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

export default function RouterRedirect() {
  const [songdatas, setSongDatas] = useState({});
  const [userdata, setUserData] = useState({});
  const [stillLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('../../public/datas.json')
    .then(response => response.json())
    .then(data => {
      setSongDatas(data.playlists);
      setUserData(data.users);
      setLoading(false);
    })
    .catch(e => { setErrorMessage(e) });
  }, []);

  const location = useLocation();
  if(stillLoading == true){
    return (
      <>
        <div className='relative w-full h-full'>
          <div className='h-screen flex flex-col items-center justify-center'>
            <FontAwesomeIcon icon={faSpinner} spin className='mb-5' size='xl' />
            <h1 className='text-2xl'>LOADING</h1>
            <h2 className='mb-10 font-scl'>{errorMessage}</h2>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home _songdata={songdatas}/>}/>
        <Route path='*' element={<Error />}/>
        <Route path='/login' element={<Login _userdata={userdata}/>}/>
        <Route path='/register' element={<Register _userdata={userdata} _userfunc={setUserData}/>}/>
      </Routes>
    </>
  )
}

