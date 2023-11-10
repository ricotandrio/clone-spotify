import { useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/__test__/Login_copy.jsx';
import Register from './pages/Register/__test__/Register_copy.jsx';
import Profile from './pages/Profile/__test__/Profile_copy.jsx';
import Search from './pages/Search/Search.jsx';
import ShowQuery from './pages/Search/ShowQuery.jsx';
import DefaultQuery from './pages/Search/DefaultQuery.jsx';
import Artists from './pages/Artists/Artists.jsx';
import Playlist from './pages/Playlists/Playlist.jsx';

import Error from './components/Error.jsx';
import Loading from './components/Loading.jsx';
import Sidebar from './components/Sidebar.jsx';

import { useGetData } from './hooks/useGetData.jsx';

import UserProvider from './context/UserContext.jsx';
import QueryProvider from './context/QueryContext.jsx';

import userdata from './data/datas.json';

export default function App() {
  // local json-server data
  const [userdatas, setuserData] = useState({data: userdata, isLoading: false, errorMessage: ''});
  // useGetData('http://localhost:3000/users', setuserData);
  // useGetData('../../public/datas.json', setuserData);

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
        <UserProvider _loading={ isLoading } _setLoading={ setLoading }>
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

                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<Error />}/>
              </Routes>
            )
          }
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

