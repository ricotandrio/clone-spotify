import { createContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from 'prop-types';

import key from "../../public/key";
import { FetchSpotify } from "../../reusable/Spotify";

export const UserContext = createContext();

// switch command for audioplayer UseReducer
export const AudioAction = {
  SET_AUDIO_SOURCE: 'SET_AUDIO_SOURCE',
  SET_PLAY: 'SET_PLAY',
  SET_VOLUME: 'SET_VOLUME',
  SET_ELAPSE: 'SET_ELAPSE',
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
  _setLoading: PropTypes.func.isRequired
}

export default function UserProvider({ children, _setLoading: setLoading }){
  // app login status
  const [login, setLogin] = useState(false);
  useEffect(() => {
    return () => {
      if(localStorage.getItem('login')){
        console.log(`Login info is "${JSON.parse(localStorage.getItem('login')).status}"`);
        setLogin(JSON.parse(localStorage.getItem('login')).status);
      }
    }
  }, []);

  // get spotify web api token
  const [token, setToken] = useState();
  useEffect(() => {
    return () => {
      FetchSpotify(
        {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(key.CLIENT_ID + ':' + key.CLIENT_SECRET),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=client_credentials',
        }, 'https://accounts.spotify.com/api/token'
      ).then((response) => {
        console.log(response);
        setToken(response.access_token);
        setLoading(false);
      })
    }
  }, [setLoading]);

  // audio player initialize value
  const InitAudioPlayer = {
    audioSource: '',
    audioRef: useRef(null),
    isPlaying: false,
    maxDuration: 0,
    elapseDuration: 0,
    volume: 1,
  }

  // audio reducer function dispatch
  const AudioReducer = (state, action) => {
    switch(action.type) {
      case AudioAction.SET_AUDIO_SOURCE:
        // console.log('progress in audioaction.setaudiosource');
        if(state.isPlaying == true){
          state.audioRef.current.pause();
          state.audioSource = '';
        }
        return {
          ...state,
          audioSource: action.payload.src,
          maxDuration: action.payload.src.duration_ms,
          elapseDuration: 0,
          isPlaying: false,
        };
      case AudioAction.SET_PLAY:
        // console.log('progress in audioaction.setplay');
        if(state.isPlaying == true){
          state.audioRef.current.pause();
        } else {
          state.audioRef.current.play();
        }
        return {
          ...state,
          isPlaying: !state.isPlaying,
          maxDuration: (state.audioRef.current.duration) * 1000,
        }
      case AudioAction.SET_VOLUME:
        // console.log('progress in audioaction.setvolume');
        state.audioRef.current.volume = action.payload.value < 0.2 ? 0 : action.payload.value;
        return {
          ...state,
          volume: action.payload.value < 0.2 ? 0 : action.payload.value,
        }
      case AudioAction.SET_ELAPSE:
        // console.log('progress in audioaction.setelapse');
        return {
          ...state,
          elapseDuration: action.payload.duration,
        }
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(AudioReducer, InitAudioPlayer);

  return(
    <UserContext.Provider value={{ login, setLogin, token, state, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}

