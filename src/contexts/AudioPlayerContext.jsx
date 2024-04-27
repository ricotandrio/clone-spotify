import { createContext, createRef, useReducer } from "react";
import PropTypes from "prop-types";

export const AudioPlayerContext = createContext();

export const AudioAction = {
  SET_AUDIO_SOURCE: "SET_AUDIO_SOURCE",
  SET_PLAY: "SET_PLAY",
  SET_VOLUME: "SET_VOLUME",
  SET_ELAPSE: "SET_ELAPSE",
  SET_NEXT: "SET_NEXT",
  SET_PREV: "SET_PREV",
  SET_STOP: "SET_STOP",
};

const AudioReducer = (state, action) => {
  switch (action.type) {
    case AudioAction.SET_AUDIO_SOURCE:
      // console.log('progress in audioaction.setaudiosource');
      // console.log(action.payload);
      if (state.isPlaying == true) {
        state.audioRef.current.pause();
        state.audioSource = "";
      }

      return {
        ...state,
        audioSource: action.payload.src,
        audioMaxDuration: action.payload.src.duration_ms,
        audioAlbum: action?.payload?.src?.id,
        audioAlbumIndex: action.payload.src.track_number,
        elapse: 0,
        isPlaying: false,
      };
    case AudioAction.SET_PLAY:
      // console.log('progress in audioaction.setplay');
      if (state.isPlaying == true) {
        state.audioRef.current.pause();
      } else {
        state.audioRef.current.play();
      }

      return {
        ...state,
        isPlaying: !state.isPlaying,
        audioMaxDuration: state.audioRef.current.duration * 1000,
        audioAlbum: state.audioAlbum,
        audioAlbumIndex: state.audioAlbumIndex,
      };
    case AudioAction.SET_VOLUME:
      return {
        ...state,
        volume: action.payload.value < 0.2 ? 0 : action.payload.value,
      };
    case AudioAction.SET_ELAPSE:
      return {
        ...state,
        elapse: action.payload.duration,
      };
    case AudioAction.SET_NEXT:
      if (state.isPlaying == true) {
        state.audioRef.current.pause();
        state.audioSource = "";
      }

      var nextIndex = (state.audioAlbumIndex + 1) % state.audioAlbum.length;

      return {
        ...state,
        audioSource: state.audioAlbum[nextIndex].src,
        audioMaxDuration: state.audioAlbum[nextIndex].duration_ms,
        audioAlbum: state.audioAlbum,
        audioAlbumIndex: nextIndex,
        elapsed: 0,
        isPlaying: true,
      };
    case AudioAction.SET_PREV:
      if (state.isPlaying == true) {
        state.audioRef.current.pause();
        state.audioSource = "";
      }

      var prevIndex =
        state.audioAlbumIndex === 0
          ? state.audioAlbum.length - 1
          : state.audioAlbumIndex - 1;

      return {
        ...state,
        audioSource: state.audioAlbum[prevIndex].src,
        audioMaxDuration: state.audioAlbum[prevIndex].duration_ms,
        audioAlbum: state.audioAlbum,
        audioAlbumIndex: prevIndex,
        elapsed: 0,
        isPlaying: true,
      };
    case AudioAction.SET_STOP:
      state.audioRef.current.pause();

      return {
        ...state,
        isPlaying: false,
      };
    default:
      break;
  }
};

const AudioPlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AudioReducer, {
    audioSource: "",
    audioMaxDuration: 0,
    audioRef: createRef(),
    audioAlbum: "",
    audioAlbumIndex: 0,
    volume: 1,
    elapse: 0,
    isPlaying: false,
  });

  return (
    <AudioPlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

AudioPlayerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AudioPlayerProvider;
