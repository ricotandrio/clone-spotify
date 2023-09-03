import { useCallback, useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Home from '../components/Home.jsx'
import Error from '../sub_components/Error.jsx'
import Login from '../../pages/Login.jsx'
import Register from '../../pages/Register.jsx';

import fetchdata from '../FetchData.jsx';
import Profile from '../../pages/Profile.jsx';
import Search from '../../search/Search.jsx';
import ShowQuery from '../../search/ShowQuery.jsx';
import DefaultQuery from '../../search/DefaultQuery.jsx';

import Playlist from '../sub_components/Playlist.jsx';
import Loading from '../../reusable/Loading.jsx';

import UserProvider from '../context/UserContext.jsx';
import QueryProvider from '../context/QueryContext.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function RouterRedirect() {

  // local json-server data
  const [userdatas, setuserData] = useState({data: [], isLoading: true, errorMessage: ''});

  fetchdata('http://localhost:3000/users', setuserData);

  const [isLoading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);

  const handleFavoriteButton = (isLoading, tracks) => {
    if(isLoading === false){
      const found = favorite.filter((curr) => curr.name === tracks.name);
      if(found.length == 1){
        setFavorite(favorite.filter((curr) => curr.name !== tracks.name));
      } else if(favorite.length > 3){
        window.alert(`You've reached the maximum limit of 4 favorite playlists`);
      } else if(found.length == 0 && favorite.length <= 3){
        setFavorite([...favorite, { "name": tracks.name, "id": tracks.id, "images": tracks.images[0].url } ]);
      }
    }
  }

  return (
    <>
      <BrowserRouter>
        <UserProvider _setLoading={ setLoading }>
          {
            userdatas.isLoading == true || isLoading == true ? (
              <div className='relative w-full h-screen flex flex-col items-center justify-center'>
                <Loading />
              </div>
            ) : (
              <Routes>
                <Route path='/' element={<Sidebar _favorite={favorite} />}>
                  <Route index element={<Home />}/>
                  <Route path='/album/:name' element={<Playlist _handleFavoriteButton={handleFavoriteButton} _favorite={favorite} />}/>

                  <Route path='/profile' element={<Profile _userdata={userdatas.data}/>}/>
                  <Route path='/search'
                    element={
                      <QueryProvider>
                        <Search/>
                      </QueryProvider>
                    }
                    >
                    <Route index element={<DefaultQuery/>}/>
                    <Route path=':query' element={<ShowQuery/>}/>
                  </Route>
                </Route>

                <Route path='/login' element={<Login _userdata={userdatas.data}/>}/>
                <Route path='/register' element={<Register _userdata={userdatas.data}/>}/>
                <Route path='*' element={<Error />}/>
              </Routes>
            )
          }
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

