import { useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Search from './pages/Search/Search.jsx';
import ShowQuery from './pages/Search/ShowQuery.jsx';
import DefaultQuery from './pages/Search/DefaultQuery.jsx';
import Artists from './pages/Artists/Artists.jsx';
import Playlist from './pages/Playlists/Playlist.jsx';

import Error from './components/Error.jsx';
import Loading from './components/Loading.jsx';
import Sidebar from './components/Sidebar.jsx';

import UserProvider from './context/UserContext.jsx';
import QueryProvider from './context/QueryContext.jsx';

import userdata from './data/datas.json';

export default function App() {
  // local json-server data
  const [userdatas, setuserData] = useState({data: userdata, isLoading: false, errorMessage: ''});
  // useGetData('http://localhost:3000/users', setuserData);
  // useGetData('../../public/datas.json', setuserData);

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
                <Route path='/' element={<Sidebar />}>
                  <Route index element={<Home />}/>
                  <Route path='/album/:name' element={<Playlist />}/>

                  <Route path='/profile' element={<Profile />}/>
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

                  <Route path='/artist/:id' element={<Artists />}/>
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

