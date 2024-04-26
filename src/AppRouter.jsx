import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import RegisterPage from '@src/pages/RegisterPage.jsx';
import LoginPage from '@src/pages/LoginPage.jsx';
import SearchPage from './pages/Search/SearchPage';
import QueryProvider from './contexts/QueryContext';
import DefaultOutlet from './pages/Search/DefaultOutlet';
import QueryResultOutlet from './pages/Search/QueryResultOutlet';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';
import ArtistPage from './pages/ArtistPage';
import HomePage from './pages/Home/HomePage';
import Sidebar from './components/Sidebar';
import AudioPlayerProvider from './contexts/AudioPlayerContext';
import LocationWatcher from './components/LocationWatcher';

const AppRouter = () => {
    
  return (
    <>
      <BrowserRouter>
      <AudioPlayerProvider>
      <LocationWatcher>
        
        <Routes>

          <Route path='/' element={<Sidebar />}>

            <Route index element={<HomePage />}/>
            <Route path='/album/:id' element={<PlaylistPage />}/>

            <Route path='/profile' element={<ProfilePage />}/>
            <Route
              path='/search'
              element={
                <QueryProvider>
                  <SearchPage/>
                </QueryProvider>
              }
              >
              <Route index element={<DefaultOutlet/>}/>
              <Route path=':query' element={<QueryResultOutlet/>}/>
            </Route>

            <Route path='/artist/:id' element={<ArtistPage />}/>
            
          </Route>

          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>

      </LocationWatcher>
      </AudioPlayerProvider>
      </BrowserRouter>
    </>
  )
}

export default AppRouter;