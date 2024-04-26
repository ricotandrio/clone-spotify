import { useNavigate } from "react-router-dom";
import { memo, useContext, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faHeadset,
  faListUl,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import { DateUtil } from "@src/utils/DateUtil";
import "@src/assets/global.css";
import {
  AudioAction,
  AudioPlayerContext,
} from "@src/contexts/AudioPlayerContext";
import { FirebaseService } from "@src/apis/services/firebase.service";
import { UserContext } from "@src/contexts/UserContext";

const AudioControllerBar = () => {
  const { state, dispatch } = useContext(AudioPlayerContext);
  const { authUser } = useContext(UserContext);
  // console.log("audio controller bar render");

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (state.audioSource && state.isPlaying) {
      interval = setInterval(() => {
        // console.log('song is playing');
        dispatch({
          type: AudioAction.SET_ELAPSE,
          payload: {
            duration: Math.floor(state.audioRef?.current?.currentTime),
          },
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isPlaying, dispatch, state.audioSource, state.audioRef]);

  const playButtonHandler = () => {
    // console.log(Math.ceil(state.elapse), 'to' , Math.floor(state.maxDuration/1000));
    if (Math.ceil(state.elapse) == Math.floor(state.audioMaxDuration / 1000)) {
      state.elapse = 0;
      state.isPlaying = false;
    }

    // console.log(state?.audioSource);
    FirebaseService.pushListeningHistory(
      authUser?.uid,
      state?.audioSource?.id,
      state?.audioSource?.type == "playlist"
        ? state?.audioSource?.album?.images[0]?.url
        : state?.audioSource?.images,
      state?.audioSource?.name,
      state?.audioSource?.artists[0]?.name,
      state?.audioSource?.album?.name,
      state?.audioSource?.duration_ms,
    );

    dispatch({ type: AudioAction.SET_PLAY });
  };

  return (
    <>
      <audio ref={state?.audioRef} src={state?.audioSource?.preview_url} />

      {!state.audioSource ? (
        <div />
      ) : (
        <main className="fixed bottom-0 z-[999] flex h-[14%] w-full items-center justify-center gap-3 bg-black">
          <section className="flex w-1/5 flex-row p-3">
            <div className="mr-4 aspect-square w-1/4">
              <img
                src={
                  state.audioSource.type == "playlist"
                    ? state.audioSource.album.images[0].url
                    : state.audioSource.images
                }
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="line-clamp-1 cursor-not-allowed text-sm underline decoration-transparent underline-offset-2">
                {state.audioSource.name}
              </h2>
              <h1
                className="cursor-pointer text-xs underline decoration-transparent underline-offset-2 opacity-80 hover:decoration-current"
                onClick={() =>
                  navigate(`/artist/${state.audioSource.artists[0].id}`)
                }
              >
                {state.audioSource.artists[0].name}
              </h1>
            </div>
          </section>

          <section className="flex w-1/2 flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-8">
              <span className="cursor-pointer pt-1 opacity-80 hover:opacity-100">
                <FontAwesomeIcon icon={faBackward} />
              </span>
              <div
                className="relative flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full border bg-white p-3 hover:scale-105"
                onClick={() => playButtonHandler()}
              >
                <FontAwesomeIcon
                  icon={
                    state.isPlaying == false || state?.audioRef?.current?.paused
                      ? faPlay
                      : faPause
                  }
                  size="sm"
                  className="text-black"
                />
              </div>
              <span className="cursor-pointer pt-1 opacity-80 hover:opacity-100">
                <FontAwesomeIcon icon={faForward} />
              </span>
            </div>
            <div className="mt-2 flex w-full flex-row items-center justify-center gap-2">
              <h1 className="text-xs opacity-90">
                {DateUtil.convertMsToMMSS(state.elapse * 1000)}
              </h1>
              <div className="flex h-1 w-1/2 rounded-full bg-gray-1">
                <div
                  className="aspect-square rounded-full bg-white"
                  style={{
                    width: `${(Math.ceil(state.elapse) / Math.floor(state.audioMaxDuration / 1000)) * 100}%`,
                  }}
                />
              </div>
              <h1 className="text-xs opacity-90">
                {DateUtil.convertMsToMMSS(Math.floor(state.audioMaxDuration))}
              </h1>
            </div>
          </section>

          <section className="flex w-1/4 flex-row items-center justify-end gap-3 ">
            <div className="group relative flex">
              <span
                className="absolute left-1/2 m-4
                  mx-auto -translate-x-7 -translate-y-11 rounded-md bg-transparent text-sm text-gray-100
                  opacity-0 transition-opacity group-hover:opacity-100 "
              >
                Connect
              </span>
              <FontAwesomeIcon icon={faHeadset} className="cursor-pointer" />
            </div>
            <div className="group relative flex">
              <span
                className="absolute left-1/2 m-4
                  mx-auto -translate-x-5 -translate-y-11 rounded-md bg-transparent text-sm text-gray-100
                  opacity-0 transition-opacity group-hover:opacity-100 "
              >
                Lyrics
              </span>
              <FontAwesomeIcon icon={faListUl} className="cursor-pointer" />
            </div>
            <div className="group relative flex">
              <span
                className="absolute left-1/2 m-4
                  mx-auto -translate-x-6 -translate-y-11 rounded-md bg-transparent text-sm text-gray-100
                  opacity-0 transition-opacity group-hover:opacity-100 "
              >
                {state.volume > 0.2 ? "Volume" : "Muted"}
              </span>
              <FontAwesomeIcon
                icon={state.volume > 0.2 ? faVolumeHigh : faVolumeMute}
                className="cursor-pointer"
              />
            </div>
            <input
              className="mr-3 w-[80%] sm:w-20"
              type="range"
              value={state.volume * 100}
              onChange={(e) =>
                dispatch({
                  type: AudioAction.SET_VOLUME,
                  payload: { value: e.target.value / 100 },
                })
              }
            />
          </section>
        </main>
      )}
    </>
  );
};

const fc = memo(AudioControllerBar);
export { fc as AudioControllerBar };
