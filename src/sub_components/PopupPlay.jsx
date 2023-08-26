import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

import '../index.css';
import { convertMsToMMSS } from '../../reusable/ConvertMMSS';
import { useState } from 'react';

PopupPlay.propTypes = {
  _song: PropTypes.object,
  _play: PropTypes.bool,
  _setPlay: PropTypes.func,
  reference: PropTypes.object,
}

export default function PopupPlay({ _song, _play: play, _setPlay: setPlay, reference }) {
  const [position, setPosition] = useState(1);

  if(!_song) return (<div />);
  
  console.log(_song.name);
  return (
    <>
      <main className='fixed bottom-0 z-[999] w-full h-[14%] bg-black flex items-center justify-center gap-3'>
        <section className='w-1/5 p-3 flex flex-row'>
          <div className='w-1/4 aspect-square mr-4'>
            <img src="" alt="" />
          </div>
          <div className='flex flex-col justify-center'>
            <h2 className='cursor-pointer text-sm line-clamp-1 underline underline-offset-2 decoration-transparent hover:decoration-current'>{_song.name}</h2>
            <h1 className='cursor-pointer text-xs opacity-80 underline underline-offset-2 decoration-transparent hover:decoration-current'>{_song.artists[0].name}</h1>
          </div>
        </section>

        <section className='w-1/2 flex flex-col items-center justify-center'>
          <div className='flex flex-row gap-8 justify-center items-center'>
            <span className='cursor-pointer opacity-80 hover:opacity-100 pt-1'>
              <FontAwesomeIcon icon={faBackward}/>
            </span>
            <audio src={_song.preview_url} ref={reference}></audio>
            <div
              title='play'
              className='cursor-pointer p-3 border rounded-full w-10 aspect-square flex items-center justify-center bg-white hover:scale-105'
              onClick={() => {
                let time = setInterval(() => {
                  if(position < 100) setPosition(position => position + 3.2);
                }, 1000);
                setTimeout(() => {
                  setPosition(1);
                  clearInterval(time);
                }, 30000);
                if(play == false){
                  reference.current.play();
                } else {
                  reference.current.pause();
                }
                setPlay(!play);
              }}
            >
              <FontAwesomeIcon icon={play == false ? faPlay : faPause} size='sm' className='text-black'/>
            </div>
            <span className='cursor-pointer opacity-80 hover:opacity-100 pt-1'>
              <FontAwesomeIcon icon={faForward}/>
            </span>

          </div>
          <div className='flex flex-row items-center w-full justify-center gap-2 mt-2'>
            <h1 className='text-xs opacity-90'>00:00</h1>
            <div className='w-1/2 bg-gray-1 h-1 rounded-full flex'>
              <div
                className='bg-white rounded-full aspect-square'
                style={{width: `${position - 1}%`}}
              />
            </div>
            <h1 className='text-xs opacity-90'>{convertMsToMMSS(_song.duration_ms)}</h1>
          </div>
        </section>

        <section className='w-1/4 flex flex-row gap-3 justify-end items-center '>
          <div className='mt-1'>
            <FontAwesomeIcon icon={faVolumeHigh}/>
          </div>
          <input type="range" />
        </section>
      </main>
    </>
  )
}
