import { useRef } from "react";

// switch command for audioplayer UseReducer
export const AudioAction = {
  SET_AUDIO_SOURCE: 'SET_AUDIO_SOURCE',
  SET_PLAY: 'SET_PLAY',
  SET_VOLUME: 'SET_VOLUME',
  SET_ELAPSE: 'SET_ELAPSE',
}

// audio reducer action management
export const AudioReducerBuilder = (state, action) => {
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

// initial value for audio player
// const IntialAudioPlayer = {
//   audioSource: '',
//   audioRef: useRef(null),
//   isPlaying: false,
//   maxDuration: 0,
//   elapseDuration: 0,
//   volume: 1,
// }