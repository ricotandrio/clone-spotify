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

  useEffect(() => {
    fetch('../../public/datas.json')
    .then(response => response.json())
    .then(data => {
      setSongDatas(data.playlists);
      setUserData(data.users);
      setLoading(false);
    })
    .catch(e => {
      console.error(e)
      setLoading(false);
    });
  }, []);

  const location = useLocation();
  if(stillLoading == true){
    return (
      <>
        <div className='relative w-full h-full'>
          <div className='h-screen flex items-center justify-center'>
            <h1 className='text-2xl'>LOADING </h1>
            <FontAwesomeIcon icon={faSpinner} spin className='ml-5 mb-2' size='xl' />
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

