import { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Error from '@components/Error.jsx';
import Loading from '@components/Loading.jsx';
import Sidebar from '@components/Sidebar.jsx';

import UserProvider from '@contexts/UserContext.jsx';
import QueryProvider from '@contexts/QueryContext.jsx';

import userdata from '@assets/datas/datas.json';
import Home from '@pages/Home/Home.jsx';
import Login from '@pages/Login.jsx';
import Register from '@pages/Register.jsx';
import Profile from '@pages/Profile.jsx';
import Search from '@pages/Search/Search.jsx';
import ShowQuery from '@pages/Search/ShowQuery.jsx';
import DefaultQuery from '@pages/Search/DefaultQuery.jsx';
import Artists from '@pages/Artist.jsx';
import Playlist from '@pages/Playlist.jsx';

export default function App() {
  const [userdatas, setuserData] = useState({data: userdata, isLoading: false, errorMessage: ''});

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
                  <Route path='/album/:id' element={<Playlist />}/>

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

