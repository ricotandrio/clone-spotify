import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '@src/contexts/UserContext.jsx';
import { DateUtil } from '@src/utils/DateUtil';
import '@src/assets/global.css';
import { AudioPlayerContext } from '@src/contexts/AudioPlayerContext';


export const SearchResultCard = (props) => {
  const audio = useRef(null);
  const [played, setPlayed] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const { state, dispatch } = useContext(AudioPlayerContext);
  const navigate = useNavigate();

  const handleMusic = () => {
    if(state.isPlaying == true){
      dispatch({ type: 'SET_STOP' });
    }

    if(played == false){
      if(props.currentlyPlaying != null){
        // pause the song that is currently playing before play new song
        props.currentlyPlaying.ref.current.pause();
        props.currentlyPlaying._setPlayed(false);
      }
      audio.current.play();
      setTimeout(() => { setPlayed(false) }, 30000); // used to reset the play icon logo to pause after the preview song ends.
      setPlayed(true);
      props.setCurrentlyPlaying({ref: audio, name: props.track.name, _setPlayed: setPlayed});
    } else {
      audio.current.pause();
      setPlayed(false);
      props.setCurrentlyPlaying(null);
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
        <audio ref={audio} src={props.track?.preview_url} />
        <FontAwesomeIcon icon={played == true ? faPause : faPlay} size='lg' className='text-white'/>
      </div>
      <div className='w-16 p-2 aspect-square'>
        <img src={props.track?.album?.images[0].url} alt={props.track?.track_img} className=''/>
      </div>
      <div className='w-1/2 pt-2'>
        <h1 className='inline-block font-scbk text-md cursor-not-allowed line-clamp-1'>
          {props.track?.name}
        </h1>
        <br />
        <h2
          className='inline-block font-scbk text-sm opacity-80 cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1 z-20'
          onClick={() => navigate(`/artist/${props.track?.artists[0]?.id}`)}
        >
          {props.track?.artists[0]?.name}
        </h2>
      </div>

      <div className='w-1/4 text-sm opacity-80 font-scbk cursor-not-allowed underline underline-offset-2 decoration-transparent hover:decoration-inherit line-clamp-1'>
        {props.track?.album?.name}
      </div>

      <div className='text-sm opacity-80 font-scbk'>
        {DateUtil.convertMsToMMSS(props.track?.duration_ms)}
      </div>
    </div>
  )
}

SearchResultCard.propTypes = { 
  track: PropTypes.object,
  currentlyPlaying: PropTypes.object,
  setCurrentlyPlaying: PropTypes.func
}

export const HomePlaylistCard = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { authUser } = useContext(UserContext);

  return (
    <div
      key={ props.id }
      className=' group/button relative cursor-pointer w-[31%] sm:w-[24%] bg-innerBlack flex flex-col items-center p-3 rounded-xl ease-in-out duration-300hover:bg-black-3'
      onClick={() => {
        if(authUser){
          navigate(`/album/${encodeURIComponent(props.id)}`, {state: location.pathname});
        }
      }}
    >

      <div className='w-full  shadow-white drop-shadow-lg'>
        <img src={ props.images[0].url } alt={ props.name } className='w-full h-full relative rounded-lg' />
      </div>
        <div className='w-48 pt-2 pl-2 sm:pl-0'>
        <h1 className='pt-2 line-clamp-1'>{ props.name }</h1>
        <p className='line-clamp-2 opacity-80 text-sm pt-2 font-scbk'>{ props.description }</p>
      </div>

      {
        // I have to declare this button twice for both the playlist page and the artists page due to size constraints.
        location.pathname == '/' ? (
          <div
            className='absolute w-12 h-12 bg-darkerGreen flex items-center justify-center rounded-full p-5 bottom-[6rem] right-[1.5rem] opacity-0 ease-linear duration-300
            hover:z-[5] hover:bg-green hover:opacity-80 hover:scale-110
            group-hover/button:bottom-[40%] group-hover/button:opacity-100'
          >
            <FontAwesomeIcon icon={faPlay} color='black' size='lg'/>
          </div>
        ) : (
          <div
            className='absolute w-12 h-12 bg-darkerGreen flex items-center justify-center rounded-full p-5 bottom-[20%] right-[1.5rem] opacity-0 ease-linear duration-300
            hover:z-[5] hover:bg-green hover:opacity-80 hover:scale-110
            group-hover/button:bottom-[30%] group-hover/button:opacity-100'
          >
            <FontAwesomeIcon icon={faPlay} color='black' size='lg'/>
          </div>
        )
      }

    </div>
  )
}

HomePlaylistCard.propTypes = { 
  id: PropTypes.string,
  images: PropTypes.array,
  name: PropTypes.string,
  description: PropTypes.string
}