import React, { useEffect, useState } from 'react'
import {
  Route,
  Routes,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import Home from './components/Home.jsx'
import Error from './sub_components/Error.jsx'
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
import Playlist from './sub_components/Playlist.jsx';
import Loading from '../reusable/Loading.jsx';

export default function RouterRedirect() {

  const [userdatas, setuserData] = useState({data: [], isLoading: true, errorMessage: ''});
  const [songdatas, setsongData] = useState({data: [], isLoading: true, errorMessage: ''});

  const [query, setQuery] = useState();

  fetchdata('http://localhost:3000/users', setuserData);
  fetchdata('http://localhost:3000/playlists', setsongData);

  const [token, setToken] = useState(''); // spotify web api token
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
      <div className='relative w-full h-screen flex flex-col items-center justify-center'>
        <Loading />
      </div>
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

        <Route path='/playlist/:name' element={<Playlist _songdata={songdatas.data} />}/>

        <Route path='/search' element={<Search _query={ query } _setQuery={ setQuery }/>}>
          <Route index element={<DefaultQuery/>}/>
          <Route path=':query' element={<ShowQuery token={token} _setQuery={ setQuery }/>}/>
        </Route>

      </Routes>
    </>
  )
}

