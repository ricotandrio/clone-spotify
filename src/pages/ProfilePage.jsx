import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import { UserContext } from '@src/contexts/UserContext.jsx';

import UserOption from '@src/components/UserOption.jsx';
import Footer from '@src/components/Footer.jsx';
import Error from '@src/pages/ErrorPage.jsx';

import { ButtonStyleNext, ButtonStylePrev } from '@src/components/Button.jsx';
import { FirebaseService } from '@src/apis/services/firebase.service';

const ProfilePage = () => {

  const { authUser, db, setDB } = useContext(UserContext);

  const [profileVisible, setProfileVisible] = useState(false);

  const navigate = useNavigate();


  const [isLoading, setLoading] = useState(false);

  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  
  useEffect(() => {

    const fetchData = async () => {

      try {
        setLoading(true);
        const topArtists = await FirebaseService.getTopArtists(authUser.uid); 

        const topTracks = await FirebaseService.getTopTracks(authUser.uid);

        setTopArtists(topArtists);
        setTopTracks(topTracks);

        console.log(topArtists);
        console.log(topTracks);

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    if(authUser) {
      fetchData();
    }
  }, [authUser, db, setDB]);
  // console.log(db.top_artists);
  
  
  if(!authUser || !db) return <Error />
  return (
    <>
      <div className='w-full h-full ml-1 pt-2 pr-2 top-0 left-0'>
        <div className='relative bg-[#484848] w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center'>
            <div className='gap-6 flex'>
              <ButtonStylePrev/>
              <ButtonStyleNext />
            </div>

            <div className='absolute flex flex-row right-8'>
              <div className='cursor-pointer mr-8 p-2 pl-5 pr-5 flex items-center text-center rounded-full bg-white text-black hover:opacity-90 hover:scale-105'>
                Explore Premium
              </div>
              <div
                className='ease-in-out duration-200 full-rounded p-2 hover:scale-110 cursor-pointer'
                onClick={() => { setProfileVisible(!profileVisible) }}
              >
                <FontAwesomeIcon icon={faUser} size='lg'/>
              </div>
            </div>
            { profileVisible == true && ( <UserOption _setProfileVisible={setProfileVisible}/> )}
          </div>
        </div>

        <div className='bg-gradient-to-b from-[#484848] to-[#282828] w-full p-8'>
          <div className='w-full flex flex-row'>
            <div className='bg-[#282828] relative p-5 w-[20vw] h-[20vw] rounded-full flex items-center justify-center shadow-xl'>
              <FontAwesomeIcon icon={faUser} size='4x' style={{color: 'gray'}}/>
            </div>
            <div className='sm:pt-14 pl-5'>
              <h5>Profile</h5>
              <h1 className='text-8xl'>{db?.name}</h1>
            </div>
          </div>
        </div>

        <div className='bg-black-1 w-full rounded-b-md mb-3'>
          <div className='p-5'>
            <h1 className='text-2xl'>Top artists this month</h1>
            <h2 className='font-scbk opacity-80 text-sm'>Only visible to you</h2>
          </div>
          <>
            {
              isLoading ? (
                <div>
                  <h1 className='text-2xl opacity-80'>... no data</h1>
                </div>
              ) : (
                <div className='p-5 w-full flex flex-row items-center'>{
                  topArtists?.map((artist, index) => (
                    <div
                      key={index}
                      className='w-1/4 m-2 flex flex-col items-center justify-center relative cursor-pointer bg-black-1 rounded-xl ease-in-out duration-300
                    hover:bg-[#282828] group/button'
                      onClick={() => navigate(`/artist/${encodeURIComponent(artist.songArtist)}`)}
                    >
                      <div className='w-3/4 m-4 h-40 rounded-full overflow-hidden flex items-center justify-center'>
                        <img src={artist.songImage} alt={artist.songArtist} className='rounded-full aspect-square'/>
                      </div>
                      <div className='mt-2 mb-8 w-3/4'>
                        <h1 className=''>{artist.songArtist}</h1>
                        <h2 className='text-md font-scbk opacity-80'>Artist</h2>
                      </div>

                      <div
                        className='absolute w-12 h-12 bg-darkerGreen flex items-center justify-center rounded-full p-5 bottom-[6rem] right-[1.5rem] opacity-0 ease-linear duration-300
                        hover:z-[5] hover:bg-green hover:opacity-80 hover:scale-110
                        group-hover/button:bottom-[7rem] group-hover/button:opacity-100'
                      >
                        <FontAwesomeIcon icon={faPlay} color='black' size='lg'/>
                      </div>
                    </div>

                  ))
                }</div>
              )
            }
          </>

          <div className='p-5'>
            <h1 className='text-2xl'>Top tracks this month</h1>
            <h2 className='font-scbk opacity-80 text-sm'>Only visible to you</h2>
          </div>
          <>
            {
              isLoading ? (
                <div className='ml-5 mt-3'>
                  <h1 className='text-2xl opacity-80'>... no data</h1>
                </div>
              ) : (
                <div>{
                  topTracks?.map((track, index) => (
                    <div key={index}
                      className='relative flex flex-row items-center h-14 gap-2 m-2 ml-5 mr-5 bg-black-1 hover:bg-[#282828]'
                    >
                      <div className='w-12 flex items-center justify-center h-full opacity-80'>
                        {index + 1}
                      </div>
                      <div className='w-14 p-2 h-full'>
                        <img src={track.songImage} alt={track.songName} className=''/>
                      </div>
                      <div className='w-1/2'>
                        <h1
                          className='font-scbk text-md cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-current'
                          onClick={() => navigate(`/search/${encodeURIComponent(track.songName)}`)}
                        >
                          {track.songName}
                        </h1>
                        <h2 className='font-scbk text-sm opacity-80'>{track.songArtist}</h2>
                      </div>

                      <div className='w-1/4 text-sm opacity-80 font-scbk'>
                        {track.songAlbum}
                      </div>

                      <div className='text-sm opacity-80 font-scbk'>
                        {track.duration || `00:00`}
                      </div>
                    </div>
                  ))
                }</div>
              )
            }
          </>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default ProfilePage;

