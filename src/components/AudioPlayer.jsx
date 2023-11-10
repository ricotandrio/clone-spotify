import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { convertMsToMMSS } from '../utils/ConvertMMSS';
import { AudioAction, UserContext } from '../context/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faHeadset, faListUl, faMicrophone, faMicrophoneAlt, faPause, faPlay, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

import '../assets/index.css';

export default function AudioPlayer() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if(state.audioSource && state.isPlaying){
      interval = setInterval(() => {
        console.log('song is playing');
        dispatch({
          type: AudioAction.SET_ELAPSE,
          payload: {
            duration: Math.floor(state.audioRef?.current?.currentTime),
          }
        })
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isPlaying]);

  return (
    <>
      <audio
        ref={state.audioRef}
        src={state?.audioSource?.preview_url}
      />

      {
        !state.audioSource ? (
          <div/>
        ) : (
          <main className='fixed bottom-0 z-[999] w-full h-[14%] bg-black flex items-center justify-center gap-3'>
            <section className='w-1/5 p-3 flex flex-row'>
              <div className='w-1/4 aspect-square mr-4'>
                <img src={state.audioSource.type == "playlist" ? state.audioSource.album.images[0].url : state.audioSource.images} alt="" />
              </div>
              <div className='flex flex-col justify-center'>
                <h2 className='cursor-not-allowed text-sm line-clamp-1 underline underline-offset-2 decoration-transparent'>
                  {state.audioSource.name}
                </h2>
                <h1
                  className='cursor-pointer text-xs opacity-80 underline underline-offset-2 decoration-transparent hover:decoration-current'
                  onClick={() => navigate(`/artist/${state.audioSource.artists[0].id}`)}
                >
                  {state.audioSource.artists[0].name}
                </h1>
              </div>
            </section>

            <section className='w-1/2 flex flex-col items-center justify-center'>
              <div className='flex flex-row gap-8 justify-center items-center'>
                <span className='cursor-pointer opacity-80 hover:opacity-100 pt-1'>
                  <FontAwesomeIcon icon={faBackward}/>
                </span>
                <div
                  className='relative cursor-pointer p-3 border rounded-full w-10 aspect-square flex items-center justify-center bg-white hover:scale-105'
                  onClick={() => {
                    console.log(Math.ceil(state.elapseDuration), 'to' , Math.floor(state.maxDuration/1000));
                    if(Math.ceil(state.elapseDuration) == Math.floor(state.maxDuration / 1000)){
                      state.elapseDuration = 0;
                      state.isPlaying = false;
                    }
                    dispatch({ type: AudioAction.SET_PLAY })
                  }}
                >
                  <FontAwesomeIcon icon={state.isPlaying == false || state?.audioRef?.current?.paused ? faPlay : faPause} size='sm' className='text-black'/>
                </div>
                <span className='cursor-pointer opacity-80 hover:opacity-100 pt-1'>
                  <FontAwesomeIcon icon={faForward}/>
                </span>

              </div>
              <div className='flex flex-row items-center w-full justify-center gap-2 mt-2'>
                <h1 className='text-xs opacity-90'>{convertMsToMMSS(state.elapseDuration * 1000)}</h1>
                <div className='w-1/2 bg-gray-1 h-1 rounded-full flex'>
                  <div
                    className='bg-white rounded-full aspect-square'
                    style={{width: `${Math.ceil((state.elapseDuration))/Math.floor(state.maxDuration/1000) * 100}%`}}
                  />
                </div>
                <h1 className='text-xs opacity-90'>{convertMsToMMSS(Math.floor(state.maxDuration))}</h1>
              </div>
            </section>

            <section className='w-1/4 flex flex-row gap-3 justify-end items-center '>
              <div className='group flex relative'>
                <span
                  className="group-hover:opacity-100 transition-opacity bg-transparent
                  text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-7 -translate-y-11
                  opacity-0 m-4 mx-auto "
                >
                  Connect
                </span>
                <FontAwesomeIcon icon={ faHeadset } className='cursor-pointer'/>
              </div>
              <div className='group flex relative'>
                <span
                  className="group-hover:opacity-100 transition-opacity bg-transparent
                  text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-5 -translate-y-11
                  opacity-0 m-4 mx-auto "
                >
                  Lyrics
                </span>
                <FontAwesomeIcon icon={ faListUl } className='cursor-pointer'/>
              </div>
              <div className='group flex relative'>
                <span
                  className="group-hover:opacity-100 transition-opacity bg-transparent
                  text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-6 -translate-y-11
                  opacity-0 m-4 mx-auto "
                >
                  {state.volume > 0.2 ? "Volume" : "Muted"}
                </span>
                <FontAwesomeIcon icon={state.volume > 0.2 ? faVolumeHigh : faVolumeMute} className='cursor-pointer'/>
              </div>
              <input
                className='w-[80%] sm:w-20 mr-3'
                type="range"
                value={state.volume * 100}
                onChange={
                  (e) => dispatch({
                    type: AudioAction.SET_VOLUME,
                    payload: { value: e.target.value / 100 }
                  })
                }
              />
            </section>
          </main>
        )
      }
    </>
  )
}
