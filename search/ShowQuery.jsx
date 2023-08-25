import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPause, faPlay, faSpinner, faTruckLoading } from '@fortawesome/free-solid-svg-icons';

import { fetchingData } from '../src/Test';
import '../src/index.css';

import Loading from '../reusable/Loading';
import { convertMsToMMSS } from '../reusable/ConvertMMSS';

const AudioCard = ({ track, currentlyPlaying, setCurrentlyPlaying }) => {
  const audio = useRef(null);
  const [played, setPlayed] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleMusic = () => {
    if(played == false){
      if(currentlyPlaying != null){
        // pause the song that is currently playing before play new song
        currentlyPlaying.ref.current.pause();
        currentlyPlaying._setPlayed(false);
      }
      audio.current.play();
      setTimeout(() => { setPlayed(false) }, 30000); // used to reset the play icon logo to pause after the preview song ends.
      setPlayed(true);
      setCurrentlyPlaying({ref: audio, name: track.name, _setPlayed: setPlayed});
    } else {
      audio.current.pause();
      setPlayed(false);
      setCurrentlyPlaying(null);
    }
  }

  return (
    <div
      className='cursor-pointer relative flex flex-row items-center h-20 gap-2 m-2 ml-5 mr-5 pl-3 bg-black-1 hover:bg-black-3 rounded-md'
      onClick={ handleMusic }
    >
      <div className='absolute w-12 p-2 left-5 bg-[#00000080] aspect-square flex items-center justify-center cursor-pointer'
        onClick={ handleMusic }
        onMouseOver={() => setHovered(true) }
        onMouseLeave={() => setHovered(false) }
        style={{ opacity: played || isHovered ? 1 : 0 }}
      >
        <audio ref={audio} src={track.preview_url} />
        <FontAwesomeIcon icon={played == true ? faPause : faPlay} size='lg' className='text-white'/>
      </div>
      <div className='w-16 p-2 aspect-square'>
        <img src={track.album.images[0].url} alt={track.track_img} className=''/>
      </div>
      <div className='w-1/2 pt-2'>
        <h1 className='inline-block font-scbk text-md cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1'>{track.name}</h1>
        <br />
        <h2 className='inline-block font-scbk text-sm opacity-80 cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1'>{track.artists[0].name}</h2>
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

export default function ShowQuery({ token, _setQuery }) {
  const { query } = useParams();
  const [_tracksdata, setTracks] = useState();
  const [isLoading, setLoading] = useState(true);

  // this use state must be in format {ref: useRef(), name: song_title, _setPlayed: function to setplayed to false}
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // output song that currently playing
  useEffect(() => { console.log(currentlyPlaying) }, [currentlyPlaying]);

  // update song query when user searches via param
  useEffect(() => { _setQuery(query) }, []);

  // make a 'GET' API call to retrieve a list of songs from Spotify
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
        console.log(response.tracks.items[0]);
        setCurrentlyPlaying(null);
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
            { isLoading == true && ( <Loading /> ) }

            {
              isLoading == false && (
                <div>{
                  _tracksdata.map((track) => (
                    <AudioCard key={track.id} track={track} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying}/>
                  ))
                }</div>
              )
            }
        </div>
      </div>
    </>
  )
}
