import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faClock } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '@src/contexts/UserContext.jsx';

import Footer from '@src/components/Footer.jsx';
import Loading from '@src/components/Loading.jsx';

import { ButtonStyleNext, ButtonStylePrev } from '@src/components/Button.jsx';
import { DateUtil } from '@src/utils/DateUtil';

import { SpotifyService } from '@src/apis/services/spotify.service';
import { FirebaseService } from '@src/apis/services/firebase.service';
import { AudioAction, AudioPlayerContext } from '@src/contexts/AudioPlayerContext';

const PlaylistPage = () => {
  // fetch data from spotify web api
  const [isLoading, setLoading] = useState(true);
  const [tracks, setTracks] = useState({});
  
  const { token, authUser, db, setDB } = useContext(UserContext);
  
  // useParam should using id since route is /:id
  const { id } = useParams();

  const navigate = useNavigate();

  // audio player
  const { dispatch } = useContext(AudioPlayerContext);

  // spotify api to GET playlists and albums have different link
  const location = useLocation();
  const stateLocation = location.state == '/' ? "playlists" : "albums";
  
  const getPlaylist = useCallback(async () => {
    setLoading(true);

    try {
      const response = await SpotifyService.getPlaylistById(stateLocation, id, token);

      console.log(response);
      setTracks(response);
      setLoading(false);
    } catch(e) {
      console.log();
    }
  }, [id, token, stateLocation]);

  const handleUpdateLibrary = async () => {
    if(isLoading == true) return;

    try {
      const response = await FirebaseService.updateLibrary(authUser?.uid, tracks.id, {
        "name": tracks.name,
        "id": tracks.id,
        "images": tracks.images[0].url,
        "state": tracks.type == "playlist" ? '/' : '/album',
        "page": "album"
      });

      setDB({
        ...db,
        user_library: response
      })
      
    } catch(e) {
      console.log(`error: ${e}`);
    } finally {
      setLoading(false);
    }
    
  }

  const handleAudioPlay = (track) => {
    // console.log('get in toggle');
    dispatch({
      type: AudioAction.SET_AUDIO_SOURCE,
      payload: {
        src: tracks.type == "playlist" ?
          { ...track.track, type: "playlist"} : { ...track, images: tracks.images[0].url }
      }
    })
  }
  
  useEffect(() => {
    getPlaylist();
  }, [id, token, stateLocation, getPlaylist]);

  console.log("playlist page render");
  console.log(db?.user_library);

  return (
    <>
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <nav className='relative bg-gradient-to-b from-[#484848] to-black w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center gap-6'>
            <ButtonStylePrev />
            <ButtonStyleNext />
          </div>
          <div className='flex flex-row p-2 pb-5'>
            <section className='w-1/4 aspect-square ml-3 mt-3 shadow-black shadow-xl flex items-center justify-center'>
              {
                isLoading == true ? (
                  <Loading />
                ) : (
                  <img src={tracks?.images[0]?.url} alt={tracks?.name} className='w-full aspect-square line' />
                )
              }
            </section>
            <section className='p-2 ml-5 w-[68%]'>
              <h2 className='pt-16 font-scbk'>Playlist</h2>
              {
                isLoading == true ? (
                  <Loading />
                ) : (
                  <>
                    <h1 className='text-6xl mb-6 line-clamp-1 pt-1'>{tracks?.name}</h1>
                    <p className='text-sm opacity-80 line-clamp-4 text-justify'>{tracks.type == "playlist" ? tracks?.description : tracks.name}</p>
                  </>
                )
              }
            </section>
          </div>
        </nav>

        <main className='bg-black-1 w-full pb-10'>
          <section className='w-full pl-5 pt-3 pb-3 flex flex-row items-center gap-8'>
            <div className='cursor-not-allowed w-14 flex items-center justify-center aspect-square rounded-full bg-green hover:scale-105 hover:opacity-90'>
              <FontAwesomeIcon icon={faPlay} size='lg' className='text-black'/>
            </div>
            <div className='cursor-pointer hover:scale-105 hover:opacity-90'>
              <FontAwesomeIcon
                icon={faHeart}
                size='2xl'
                style={{ color: db?.user_library?.filter((curr) => curr.id === tracks.id).length == 1 && isLoading == false ? 'red' : 'white' }}
                onClick={ handleUpdateLibrary }
              />
            </div>
          </section>

          <section className='pb-5 mt-5 flex flex-col items-center'>
            <table className='border-b w-[96%] p-3 opacity-80 mb-2'>
              <tbody>
                <tr className='font-scl text-sm'>
                  <th className='pb-2 w-[5%] text-center'>#</th>
                  <th className='pb-2 w-[30%] text-left'>Title</th>
                  <th className='pb-2 w-[30%] text-left'>Album</th>
                  <th className='pb-2 w-[20%] text-left'>Data Added</th>
                  <th className='pb-2 w-[15%] text-left pl-9'><FontAwesomeIcon icon={faClock}/></th>
                </tr>
              </tbody>
            </table>
            {
              isLoading == true ? (
                <Loading />
              ) : (
                <div className='w-[97%]'>
                  {
                    tracks.tracks.items.map((track, index) => (
                      <div
                        key={index}
                        className='group cursor-pointer w-[96%] flex flex-row m-1 p-2 items-center hover:bg-black-3'
                        onClick={() => handleAudioPlay(track) }
                      >
                        <div className='w-[3%] flex items-center justify-center mr-2'>
                          <h1 className='group-hover:hidden opacity-80'>{index + 1}</h1>
                          <FontAwesomeIcon icon={faPlay} className='hidden group-hover:block' />
                        </div>
                        <div className='w-[30%] flex flex-row items-center'>
                          <div className='w-[15%] aspect-square mr-3'>
                            <img src={tracks.type == "playlist" ? track?.track?.album?.images[0]?.url : tracks?.images[0]?.url} alt="" className='w-full h-full' />
                          </div>
                          <div className='w-full'>
                            <h1
                              className='underline underline-offset-2 decoration-transparent cursor-pointer hover:decoration-current font-scbk line-clamp-1'
                              onClick={() => navigate(`/search/${encodeURIComponent(tracks.type == "playlist" ? track?.track?.name : track?.name)}`)}
                            >
                              {tracks.type == "playlist" ? track?.track?.name : track?.name}
                            </h1>
                            <p
                              className='underline underline-offset-2 decoration-transparent cursor-pointer hover:decoration-current opacity-80 text-sm font-scbk'
                              onClick={() => navigate(`/artist/${tracks.type == "playlist" ? track?.track?.artists[0]?.id : tracks?.artists[0]?.id}`)}
                            >
                              {tracks.type == "playlist" ? track?.track?.artists[0]?.name : track?.artists[0]?.name}
                            </p>
                          </div>
                        </div>
                        <div className='w-[30%]'>
                          <h1 className='text-sm line-clamp-1 underline underline-offset-2 decoration-transparent cursor-not-allowed hover:decoration-current opacity-80 pl-3 font-scbk'>
                            {tracks.type == "playlist" ? track?.track?.album?.name : tracks?.name}
                          </h1>
                        </div>
                        <div className='w-[22%]'>
                          <h1 className='font-scbk line-clamp-1 text-sm opacity-80 pl-9'>
                            {tracks.type == "playlist" ? DateUtil.extractYearMonthDay(new Date(track?.added_at)) : new Date(tracks?.release_date)}
                          </h1>
                        </div>
                        <div className='w-[15%] pl-3 opacity-80 font-scbk text-sm text-center'>
                          {DateUtil.convertMsToMMSS(tracks.type == "playlist" ? track?.track?.duration_ms : track?.duration_ms)}
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default PlaylistPage;
