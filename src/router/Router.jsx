import { useState } from 'react'
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

import Playlist from '../../pages/Playlist.jsx';
import Loading from '../../reusable/Loading.jsx';

import UserProvider from '../context/UserContext.jsx';
import QueryProvider from '../context/QueryContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Artists from '../../pages/Artists.jsx';

import userdata from '../../public/datas.json';
import AudioPlayer from '../sub_components/AudioPlayer.jsx';

export default function RouterRedirect() {

  // local json-server data
  const [userdatas, setuserData] = useState({data: userdata, isLoading: false, errorMessage: ''});
  // fetchdata('http://localhost:3000/users', setuserData);
  // fetchdata('../../public/datas.json', setuserData);

  const [favorite, setFavorite] = useState([]);
  // favorite data
  const handleFavoriteButton = (isLoading, tracks, pageIdentifier) => {
    // console.log(tracks);

    if(isLoading === false){
      const found = favorite.filter((curr) => curr.name === tracks.name);
      if(found.length == 1){
        setFavorite(favorite.filter((curr) => curr.name !== tracks.name));
      } else if(favorite.length > 3){
        window.alert(`You've reached the maximum limit of 4 favorite playlists`);
      } else if(found.length == 0 && favorite.length <= 3){
        // console.log(tracks);
        setFavorite([
          ...favorite, {
             "name": tracks.name,
             "id": tracks.id,
             "images": pageIdentifier == "AlbumPage" ? tracks.images[0].url : tracks.images,
             "state": tracks.type == "playlist" ? '/' : '/album',
             "page": pageIdentifier == "AlbumPage" ? "album" : "artist"
          }
        ]);
      }
    }
  }

  // set loading for user provider
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <BrowserRouter>
        <UserProvider _loading={ isLoading } _setLoading={ setLoading } _userdata={userdatas.data}>
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
                  <Route
                    path='/search'
                    element={
                      <QueryProvider>
                        <Search/>
                      </QueryProvider>
                    }
                  >
                    <Route index element={<DefaultQuery/>}/>
                    <Route path=':query' element={<ShowQuery/>}/>
                  </Route>

                  <Route path='/artist/:id' element={<Artists _handleFavoriteButton={handleFavoriteButton} _favorite={favorite} />}/>
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

