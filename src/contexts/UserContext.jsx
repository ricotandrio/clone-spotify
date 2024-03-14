import { createContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from 'prop-types';

import { Route, Routes, useLocation } from "react-router-dom";

import Register from "@src/pages/Register";
import Login from "@src/pages/Login";
import DefaultQuery from "@pages/Search/DefaultQuery";
import Search from "@pages/Search/Search";
import Home from "@pages/Home/Home";
import Sidebar from "@components/Sidebar";
import Error from "@components/Error";
import QueryProvider from "@contexts/QueryContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth, mydb } from "@configs/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { getTokenService } from "@apis/spotify_services/token_service";
import { getUserService } from "@apis/firebase_services/user_service";
import { AudioReducerBuilder } from "@contexts/AudioReducer";

export const UserContext = createContext();

// prototype for export default
UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
  _loading: PropTypes.bool.isRequired,
  _setLoading: PropTypes.func.isRequired,
}

export default function UserProvider({ children, _loading: loading, _setLoading: setLoading }){
  const [token, setToken] = useState();
  const [db, setDB] = useState();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      setLoading(true);
      const response = await getTokenService();

      if(response != null){
        setToken(response.access_token);
        setLoading(false);
      } 
    }
    getToken();
  }, [])

  // always check auth user status
  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      setAuthUser(user ? user : null);
    });

    return () => {
      setLoading(true);
      authState();
    }
  }, []);

  // get authUser firestore storage
  useEffect(() => {
    const getCurrUser = async () => {
      setLoading(true);
      
      const response = await getUserService(authUser?.uid);

      if(response != null){
        setDB(response);
        setLoading(false);
      }
    }

    if(authUser != null) getCurrUser();
  }, [authUser]);

  const DefaultAudioPlayer = {
    audioSource: '',
    audioRef: useRef(null),
    isPlaying: false,
    maxDuration: 0,
    elapseDuration: 0,
    volume: 1,
  }
  
  const AudioReducer = (state, action) => {
    switch(action.type) {
      case AudioAction.SET_AUDIO_SOURCE:
        // console.log('progress in audioaction.setaudiosource');
        // console.log(action.payload);
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

  
  const location = useLocation();

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    }
  }, [location]);
  

  /*  AudioReducerBuilder() will return function that take action with state and switch action.type  
  */
  const [state, dispatch] = useReducer(AudioReducer, DefaultAudioPlayer);
  
  const ContextValue = { token, state, dispatch, db, authUser, setDB };
  
  return(
    <>
      {
        loading == false ? (
          <>
            <UserContext.Provider value={ ContextValue }>
              { children }
            </UserContext.Provider>
          </>
        ) : (
          <UserContext.Provider value={ ContextValue }>
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

              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='*' element={<Error />}/>
            </Routes>
          </UserContext.Provider>
        )
      }
    </>
  )
}

