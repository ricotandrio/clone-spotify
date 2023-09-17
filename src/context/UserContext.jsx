import { createContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from 'prop-types';
import key from '../../public/key.jsx'

import { FetchSpotify } from "../../reusable/Spotify";
import { Route, Routes } from "react-router-dom";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import DefaultQuery from "../../search/DefaultQuery";
import Search from "../../search/Search";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";
import Error from "../sub_components/Error";
import QueryProvider from "./QueryContext";

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
  _loading: PropTypes.bool.isRequired,
  _setLoading: PropTypes.func.isRequired,
  _userdata: PropTypes.object,
}

export default function UserProvider({ children, _loading: loading, _setLoading: setLoading, _userdata }){
  const [CLIENT, SET_CLIENT] = useState({CLIENT_ID: key.CLIENT_ID, CLIENT_SECRET: key.CLIENT_SECRET});

  // app login status
  const [login, setLogin] = useState("false");
  useEffect(() => {
    if(localStorage.getItem('login')){
      const loginLocalItem = JSON.parse(localStorage.getItem('login')).status;
      console.log(`Login info is "${loginLocalItem}"`);
      setLogin(loginLocalItem);
    }
  }, []);

  // get spotify web api token
  const [token, setToken] = useState();
  useEffect(() => {
    if(CLIENT.CLIENT_ID && CLIENT.CLIENT_SECRET){
      FetchSpotify(
        {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(CLIENT.CLIENT_ID + ':' + CLIENT.CLIENT_SECRET),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=client_credentials',
        }, 'https://accounts.spotify.com/api/token'
      ).then((response) => {
        // console.log(response);
        setToken(response.access_token);
        setLoading(false);
      })
    }
  }, [CLIENT, setLoading, login]);

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
        console.log(action.payload);
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
    <>
      {
        loading == false ? (
          <>
            <UserContext.Provider value={{ login, setLogin, token, state, dispatch }}>
              { children }
            </UserContext.Provider>
          </>
        ) : (
          <UserContext.Provider value={{ login, setLogin, token, state, dispatch }}>
            <Routes>
              <Route path='/' element={<Sidebar />}>
                <Route index element={<Home />}/>
                <Route
                  path='/search'
                  element={
                    <QueryProvider>
                      <Search/>
                    </QueryProvider>
                  }
                >
                  <Route index element={<DefaultQuery/>}/>
                </Route>
              </Route>

              <Route path='/login' element={<Login _userdata={_userdata}/>}/>
              <Route path='/register' element={<Register _userdata={_userdata}/>}/>
              <Route path='*' element={<Error />}/>
            </Routes>
          </UserContext.Provider>
        )
      }
    </>
  )
}

