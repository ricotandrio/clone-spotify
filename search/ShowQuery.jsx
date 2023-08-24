import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { fetchingData } from '../src/Test';
import '../src/index.css';

const AudioCard = ({ track }) => {
  const audio = useRef(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    console.log(audio)
    if(played == true){
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [played]);

  const convertMsToMMSS = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div key={track.id}
      className='relative flex flex-row items-center h-14 gap-2 m-2 ml-5 mr-5 bg-lighterBlack hover:bg-[#282828]'
    >
      <div className='absolute w-10 left-2 p-2 bg-[#00000080] aspect-square flex items-center justify-center opacity-100 hover:opacity-100 cursor-pointer'
        onClick={() => setPlayed(!played) }
      >
        <audio ref={audio}>
          <source src={track.preview_url} type='audio/mpeg'/>
        </audio>
        <FontAwesomeIcon icon={played == false ? faPlay : faPause} size='lg' className='text-white opacity-100'/>
      </div>
      <div className='w-14 p-2 aspect-square'>
        <img src={track.album.images[0].url} alt={track.track_img} className=''/>
      </div>
      <div className='w-1/2'>
        <h1 className='font-scbk text-md cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1'>{track.name}</h1>
        <h2 className='font-scbk text-sm opacity-80 cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1'>{track.artists[0].name}</h2>
      </div>

      <div className='w-1/4 text-sm opacity-80 font-scbk cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1'>
        {track.album.name}
      </div>

      <div className='text-sm opacity-80 font-scbk'>
        {convertMsToMMSS(track.duration_ms)}
      </div>
    </div>
  )
}

export default function ShowQuery({ token }) {
  const { query } = useParams();
  const [_tracksdata, setTracks] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchingData(
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }, `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&include_external=audio`
    ).then((response) => {
      setTracks(response.tracks.items);
      setLoading(false);
    })
  }, [query]);

  return (
    <>
      <div className='w-full text-white'>
        <div className='w-full'>
          <div>
            <h1 className='text-xl pl-3 pt-3'>Result for query { query }</h1>
          </div>
            {
              isLoading == false && (
                <div>{
                  _tracksdata.map((track) => (
                    <AudioCard key={track.id} track={track} />
                  ))
                }</div>
              )
            }

            {
              isLoading == true && (
                <div>
                  <h1 className='pl-3 text-xl pt-5'>Loading ...</h1>
                </div>
              )
            }

        </div>
      </div>
    </>
  )
}
