import { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Footer from '@src/components/Footer.jsx';
import Loading from '@src/components/Loading.jsx';
import UserOption from '@src/components/UserOption.jsx';

import { UserContext } from '@src/contexts/UserContext.jsx';

import SongSection from '@src/pages/Home/SongSection.jsx';

import { ButtonStyleNext, ButtonStylePrev } from '@src/components/Button.jsx';

import '@src/assets/global.css';
import { FirebaseService } from '@src/apis/services/firebase.service';
import { SpotifyService } from '@src/apis/services/spotify.service';

const HomePage = () => {
  const { token, authUser } = useContext(UserContext);
  
  const [isLoading, setLoading] = useState(true);
  const [profileVisible, setProfileVisible] = useState(false);
  const [featuredPlaylists, setFeaturedPlaylists] = useState({});
  
  console.log("sdf");

  const getFeaturedPlaylist = async (token) => {
    setLoading(true);
    const response = await SpotifyService.getFeaturedPlaylists(token);
    
    if(response != null){
      setFeaturedPlaylists(response);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(token) getFeaturedPlaylist(token);
  }, [token]);

  return (
    <>
      <div className='w-full h-full ml-1 pt-2 pr-2 top-0 left-0'>
        <div className='relative bg-black-1 w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center'>
            <div className='gap-6 flex'>
              <ButtonStylePrev/>
              <ButtonStyleNext />
            </div>

            <div className='absolute flex flex-row right-8'>
            {
              !authUser ? (
                <>
                  <Link to='/register'>
                    <div className='w-28 h-12 rounded-full flex items-center justify-center ease-in-out duration-300 hover:scale-110 opacity-80 hover:opacity-100'>
                      Sign Up
                    </div>
                  </Link>

                  <Link to='/login'>
                    <div className='w-28 h-12 rounded-full bg-white text-black flex items-center justify-center ease-in-out duration-300 hover:scale-110 opacity-100 hover:opacity-80'>
                      Log in
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <div className='cursor-pointer mr-8 p-2 pl-5 pr-5 flex items-center text-center rounded-full bg-white text-black hover:opacity-90 hover:scale-105'>
                    Explore Premium
                  </div>
                  <div
                    className='ease-in-out duration-200 full-rounded p-2 hover:scale-110 cursor-pointer'
                    onClick={() => { setProfileVisible(!profileVisible) }}
                  >
                    <FontAwesomeIcon icon={faUser} size='lg'/>
                  </div>
                </>
              )
            }
            </div>
            {
              profileVisible == true && ( <UserOption _setProfileVisible={setProfileVisible}/> )
            }
          </div>
        </div>
        <div className='relative bg-gradient-to-b from-black-2 to-black-1 w-full text-white font-sbbs'>
          {
            isLoading == true ? (
              <div className='w-full p-10 pb-16 flex flex-col items-center justify-center'>
                <Loading />
              </div>
            ) : (
              <>
                <SongSection data={featuredPlaylists.playlists.items} playlists_name={featuredPlaylists.message} />
                <Footer/>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default HomePage;