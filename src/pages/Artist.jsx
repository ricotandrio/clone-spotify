import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faUser } from '@fortawesome/free-solid-svg-icons';

import { SpotifyController } from '@apis/controllers/spotify.controller';
import { FirebaseController } from '@apis/controllers/firebase.controller';
import { UserContext } from '@contexts/UserContext.jsx';

import Footer from '@components/Footer.jsx';
import Loading from '@components/Loading.jsx';
import UserOption from '@components/UserOption.jsx';

import SongSection from '@pages/Home/SongSection.jsx';

import { ButtonStyleNext, ButtonStylePrev } from '@components/Button.jsx';

import '@assets/global.css';

export default function Artists() {
  const [profileVisible, setProfileVisible] = useState(false);

  // fetch data from spotify web api
  const [isLoading, setLoading] = useState(true);
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();

  const { login, token, db, setDB, authUser } = useContext(UserContext);
  const { id } = useParams(); // get id from browser link

  useEffect(() => {
    const getArtist = async () => {
      setLoading(true);
      const responseArtist = await SpotifyController.getArtist(token, id);
      const responseAlbum = await SpotifyController.getAlbumByArtist(token, id);

      if(responseArtist != null){
        setArtist(responseArtist);
        setLoading(false);
      }

      if(responseAlbum != null){
        setAlbums(responseAlbum);
      }
    }

    if(token) getArtist();
  }, [id, token]);

  const updateArtistState = () => {

    if(isLoading == true) return;

    const found = db?.user_library?.filter((curr) => curr.id === artist.id);

    if(found.length === 1){
      // remove it from database
      const newlibrary = db?.user_library?.filter((curr) => curr.id !== artist.id);
      
      setDB({ ...db, user_library: newlibrary });
      
      pushLibraryService(authUser?.uid, newlibrary);
    } else if(db?.user_library.length > 3){
      // alert maximum library 
      window.alert("The library has reached its maximum size.");
    } else if(found.length == 0){
      // insert it into database
      const newlibrary = [ ...db?.user_library, {
        "name": artist.name,
        "id": artist.id,
        "images": artist.images[0].url,
        "state": artist.type == "playlist" ? '/' : '/album',
        "page": "artist"
      } ];

      setDB({ ...db, user_library: newlibrary });
      
      pushLibraryService(authUser?.uid, newlibrary);
    }
  }

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
          <div className='w-3/4 h-16 pl-8 pr-2 pb-2 flex items-center fixed justify-between top-4 backdrop-blur-sm z-[999]'>
            <div className='gap-6 flex relative'>
              <ButtonStylePrev/>
              <ButtonStyleNext />
            </div>

            <div className='relative flex flex-row -right-20 sm:right-8'>
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
              <div className='flex flex-row'>
                <div className='w-14 h-14 bg-darkerGreen flex items-center justify-center rounded-full p-5 cursor-not-allowed hover:scale-105 mt-5' >
                  <FontAwesomeIcon icon={faPlay} color='black' size='lg'/>
                </div>
                <div
                  className='bg-white flex text-black items-center justify-center rounded-full ml-4 pl-5 pr-5 cursor-pointer hover:scale-105 mt-5'
                  onClick={ updateArtistState }
                >
                  <h1 className='m-3 pl-1 pr-3 w-20 text-center'>
                    { db?.user_library?.filter((curr) => curr.id === artist.id).length >= 1 && isLoading == false ? "Following" : "Follow" }
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-black-1 w-full rounded-b-md mb-3'>
          <div className='p-5'>
            <h1 className='text-2xl pt-4'>Discography</h1>
          </div>
          
          {
            albums?.items?.length == 0 ? (
              <h1 className='text-xl pl-5'>No albums found</h1>
            ) : (
              <SongSection data={albums?.items} playlists_name='' />
            )
          }
        </div>

        <Footer />
      </div>
    </>
  )
}
