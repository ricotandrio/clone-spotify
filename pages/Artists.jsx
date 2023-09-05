import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faUser } from '@fortawesome/free-solid-svg-icons';

import AudioPlayer from '../src/sub_components/AudioPlayer.jsx';
import Footer from '../src/components/Footer.jsx';
import Loading from '../reusable/Loading.jsx';
import { FetchSpotify } from '../reusable/Spotify.jsx';
import { UserContext } from '../src/context/UserContext.jsx';

import '../src/index.css';
import UserOption from '../src/sub_components/UserOption.jsx';
import SongSection from '../src/sub_components/SongSection.jsx';
import { ButtonStyleNext, ButtonStylePrev } from '../reusable/ForwardBackwardButton.jsx';

export default function Artists() {
  const [profileVisible, setProfileVisible] = useState(false);

  // fetch data from spotify web api
  const [isLoading, setLoading] = useState(true);
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();

  const { login, token } = useContext(UserContext);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    scrollTo(0, 0);
    setLoading(true);
    FetchSpotify(
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }, `https://api.spotify.com/v1/artists/${id}`
    ).then((response) => {
      // console.log(response);
      if(response != null){
        setArtist(response);

        FetchSpotify(
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }, `https://api.spotify.com/v1/artists/${id}/albums`
        ).then((response) => {
          // console.log(response);
          if(response != null){
            setAlbums(response);
            setLoading(false);
          }
        })

      }
    })

  }, [id, token]);

  if(isLoading == true){
    return (
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <nav className='relative bg-black-1 w-full h-22 pt-1 rounded-t-xl'>
          <div className='w-3/4 h-16 pl-8 pr-2 pb-2 flex items-center fixed justify-between top-4'>
            <div className='gap-6 flex relative'>
              <ButtonStylePrev/>
              <ButtonStyleNext />
            </div>

            <div className='relative flex flex-row right-8'>
            {
              login == "false" ? (
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

        </nav>

        <div className='bg-gradient-to-b from-[#484848] to-[#282828] w-full p-8 pt-20'>
          <div className='w-full flex flex-row'>
            <div className='bg-[#282828] relative w-[20vw] h-[20vw] rounded-md overflow-hidden flex items-center justify-center shadow-xl'>
              <img src={artist?.images[0]?.url} alt="" className='w-full h-full'/>
            </div>
            <div className='sm:pt-14 pl-5'>
              <h1 className='text-7xl pb-5'>{artist?.name}</h1>
              <h1 className='text-xl font-scbk'>
                Followers: {artist?.followers?.total}
              </h1>
              <div className='absolute w-14 h-14 bg-darkerGreen flex items-center justify-center rounded-full p-5 cursor-not-allowed hover:scale-105 mt-5' >
                <FontAwesomeIcon icon={faPlay} color='black' size='lg'/>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-black-1 w-full rounded-b-md mb-3'>
          <div className='p-5'>
            <h1 className='text-2xl pt-4'>Discography</h1>
          </div>

          <SongSection data={albums?.items} playlists_name='' />
        </div>

        <Footer />
      </div>
      <AudioPlayer/>
    </>
  )
}
