import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import Loading from '../reusable/Loading';
import { FetchSpotify } from '../reusable/Spotify';
import { convertMsToMMSS } from '../reusable/ConvertMMSS';
import { QueryContext } from '../src/context/QueryContext';
import { UserContext } from '../src/context/UserContext';

import '../src/index.css';

const AudioCard = ({ track, currentlyPlaying, setCurrentlyPlaying }) => {
  const audio = useRef(null);
  const [played, setPlayed] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMusic = () => {
    state?.audioRef?.current?.pause();

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
      // onClick={ handleMusic }
      onMouseOver={() => setHovered(true) }
      onMouseLeave={() => setHovered(false) }
    >
      <div className='absolute w-12 p-2 left-5 bg-[#00000080] aspect-square flex items-center justify-center cursor-pointer'
        onClick={ handleMusic }
        style={{ opacity: played || isHovered ? 1 : 0 }}
      >
        <audio ref={audio} src={track?.preview_url} />
        <FontAwesomeIcon icon={played == true ? faPause : faPlay} size='lg' className='text-white'/>
      </div>
      <div className='w-16 p-2 aspect-square'>
        <img src={track?.album?.images[0].url} alt={track?.track_img} className=''/>
      </div>
      <div className='w-1/2 pt-2'>
        <h1 className='inline-block font-scbk text-md cursor-not-allowed line-clamp-1'>
          {track?.name}
        </h1>
        <br />
        <h2
          className='inline-block font-scbk text-sm opacity-80 cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1 z-20'
          onClick={() => navigate(`/artist/${track?.artists[0]?.id}`)}
        >
          {track?.artists[0]?.name}
        </h2>
      </div>

      <div className='w-1/4 text-sm opacity-80 font-scbk cursor-not-allowed underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1'>
        {track?.album?.name}
      </div>

      <div className='text-sm opacity-80 font-scbk'>
        {convertMsToMMSS(track?.duration_ms)}
      </div>
    </div>
  )
}

AudioCard.propTypes = {
  track: PropTypes.object,
  currentlyPlaying: PropTypes.object,
  setCurrentlyPlaying: PropTypes.func,
}

export default function ShowQuery() {
  const { query } = useParams();
  const [tracksdata, setTracks] = useState();
  const [isLoading, setLoading] = useState(true);
  const { setQuery } = useContext(QueryContext);
  const { token } = useContext(UserContext);

  // this use state must be in format {ref: useRef(), name: song_title, _setPlayed: function to setplayed to false}
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // update song query when user searches via param
  useEffect(() => {
    setQuery(query);
  });

  // make a 'GET' API call to retrieve a list of songs from Spotify
  useEffect(() => {
    setLoading(true);
    FetchSpotify(
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }, `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`
    ).then((response) => {
      console.log(response);
      if(response != null){
        setTracks(response.tracks.items);
        setCurrentlyPlaying(null);
        setLoading(false);
      }
    })
  }, [query, token]);

  return (
    <>
      <div className='w-full text-white'>
        <div className='w-full'>
          <div>
            <h1 className='text-xl pl-3 pt-3'>Result for query { query }</h1>
          </div>
            {
              isLoading == true ? (
                <Loading />
              ) : (
                <div>{
                  tracksdata.map((track) => (
                    <AudioCard key={track?.id} track={track} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying}/>
                  ))
                }</div>
              )
            }
        </div>
      </div>
    </>
  )
}
