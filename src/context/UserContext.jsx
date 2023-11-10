import { createContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from 'prop-types';

import { FetchSpotify } from "../utils/Spotify";
import { Route, Routes } from "react-router-dom";

import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DefaultQuery from "../pages/Search/DefaultQuery";
import Search from "../pages/Search/Search";
import Home from "../pages/Home/Home";
import Sidebar from "../components/Sidebar";
import Error from "../components/Error";
import QueryProvider from "./QueryContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { mydb } from "../config/firebase";

export const UserContext = createContext();

// switch command for audioplayer UseReducer
export const AudioAction = {
  SET_AUDIO_SOURCE: 'SET_AUDIO_SOURCE',
  SET_PLAY: 'SET_PLAY',
  SET_VOLUME: 'SET_VOLUME',
  SET_ELAPSE: 'SET_ELAPSE',
}

// prototype for export default
UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
  _loading: PropTypes.bool.isRequired,
  _setLoading: PropTypes.func.isRequired,
}

export default function UserProvider({ children, _loading: loading, _setLoading: setLoading }){
  const [CLIENT, SET_CLIENT] = useState({
    CLIENT_ID: import.meta.env.VITE_SP_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_SP_CLIENT_SECRET
  });

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
        }, import.meta.env.VITE_SP_TOKEN_SRC
      ).then((response) => {
        // console.log(response);
        setToken(response.access_token);
        setLoading(false);
      })
    }
  }, [CLIENT, setLoading]);

  // userdata for profile
  const [authUser, setAuthUser] = useState(null);
  const [db, setDB] = useState({});

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      setAuthUser(user ? user : null);
    });

    return () => {
      setLoading(true);
      authState();
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if(authUser) {
      try {
        const fillDB = async () => {
          const data = await getDocs(collection(mydb, "account"));
          console.log(data);

          const promises = data.docs.map(async (curr) => {
            if(curr.id === authUser?.uid) {
              console.log({ ...curr.data() });
              return { ...curr.data() };
            }
            return null;
          });
          
          const results = await Promise.all(promises); // make sure all promises is done
          setDB(results.filter(Boolean)); // Filter out null values
          setLoading(false);
        };

        fillDB();
      } catch (e) {
        console.error(e);
      }
    }
  }, [authUser]);

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

  const [state, dispatch] = useReducer(AudioReducer, InitAudioPlayer);

  return(
    <>
      {
        loading == false ? (
          <>
            <UserContext.Provider value={{ token, state, dispatch, db, authUser }}>
              { children }
            </UserContext.Provider>
          </>
        ) : (
          <UserContext.Provider value={{ token, state, dispatch, db, authUser }}>
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

