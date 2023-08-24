import React, { useEffect, useState } from 'react'
import {
  Route,
  Routes,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import Home from './components/Home.jsx'
import Error from './components/part_components/Error.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import fetchdata from './FetchData.jsx';
import Profile from '../pages/Profile.jsx';
import Search from '../search/Search.jsx';
import ShowQuery from '../search/ShowQuery.jsx';
import DefaultQuery from '../search/DefaultQuery.jsx';

import { fetchingData } from './Test.jsx';
import key from '../public/key.jsx';

export default function RouterRedirect() {

  const [userdatas, setuserData] = useState({data: [], isLoading: true, errorMessage: ''});
  const [songdatas, setsongData] = useState({data: [], isLoading: true, errorMessage: ''});

  const [query, setQuery] = useState();

  fetchdata('http://localhost:3000/users', setuserData);
  fetchdata('http://localhost:3000/playlists', setsongData);

  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState();
  useEffect(() => {
    fetchingData(
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(key.CLIENT_ID + ':' + key.CLIENT_SECRET),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      }, 'https://accounts.spotify.com/api/token'
    ).then((response) => {
      setToken(response.access_token);
      setLoading(false);
    })
  }, []);

  if(userdatas.isLoading == true || songdatas.isLoading == true || isLoading == true){
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
      <Routes>
        <Route path='/' element={<Home _songdata={songdatas.data} />}/>
        <Route path='*' element={<Error />}/>
        <Route path='/login' element={<Login _userdata={userdatas.data}/>}/>
        <Route path='/register' element={<Register _userdata={userdatas.data}/>}/>
        <Route path='/profile' element={<Profile _userdata={userdatas.data}/>}/>

        <Route path='/search' element={<Search _query={ query } _setQuery={ setQuery }/>}>
          <Route index element={<DefaultQuery/>}/>
          <Route path=':query' element={<ShowQuery token={token} _setQuery={ setQuery }/>}/>
        </Route>

      </Routes>
    </>
  )
}

