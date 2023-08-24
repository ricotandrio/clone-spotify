import React, { useState } from 'react'
import {
  Route,
  Routes,
  useSearchParams,
} from 'react-router-dom';

import Home from './components/Home.jsx'
import Error from './components/part_components/Error.jsx'
import Login from './components/pages/Login.jsx'
import Register from './components/pages/Register.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import fetchdata from './FetchData.jsx';
import Profile from './components/pages/Profile.jsx';
import Search from './components/search/Search.jsx';
import ShowQuery from './components/search/ShowQuery.jsx';
import DefaultQuery from './components/search/DefaultQuery.jsx';

export default function RouterRedirect() {

  const [userdatas, setuserData] = useState({data: [], isLoading: true, errorMessage: ''});
  const [songdatas, setsongData] = useState({data: [], isLoading: true, errorMessage: ''});
  const [tracks, setTracks] = useState({data: [], isLoading: true, errorMessage: ''});

  fetchdata('http://localhost:3000/users', setuserData);
  fetchdata('http://localhost:3000/playlists', setsongData);
  fetchdata('http://localhost:3000/tracks', setTracks);

  const [query, setQuery] = useState();

  if(userdatas.isLoading == true || songdatas.isLoading == true || tracks.isLoading == true){
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
        <Route path='/' element={<Home _songdata={songdatas.data}/>}/>
        <Route path='*' element={<Error />}/>
        <Route path='/login' element={<Login _userdata={userdatas.data}/>}/>
        <Route path='/register' element={<Register _userdata={userdatas.data}/>}/>
        <Route path='/profile' element={<Profile _userdata={userdatas.data}/>}/>

        <Route path='/search' element={<Search _query={ query } _setQuery={ setQuery }/>}>
          <Route index element={<DefaultQuery/>}/>
          <Route path=':query' element={<ShowQuery _tracksdata={tracks} />}/>
        </Route>

      </Routes>
    </>
  )
}

