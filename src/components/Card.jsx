import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "@src/contexts/UserContext.jsx";
import { DateUtil } from "@src/utils/DateUtil";
import { AudioPlayerContext } from "@src/contexts/AudioPlayerContext";

export const SearchResultCard = (props) => {
  const audio = useRef(null);
  const [played, setPlayed] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const { state, dispatch } = useContext(AudioPlayerContext);
  const navigate = useNavigate();

  const handleMusic = () => {
    if (state.isPlaying == true) {
      dispatch({ type: "SET_STOP" });
    }

    if (played == false) {
      if (props.currentlyPlaying != null) {
        // pause the song that is currently playing before play new song
        props.currentlyPlaying.ref.current.pause();
        props.currentlyPlaying._setPlayed(false);
      }
      audio.current.play();
      setTimeout(() => {
        setPlayed(false);
      }, 30000); // used to reset the play icon logo to pause after the preview song ends.
      setPlayed(true);
      props.setCurrentlyPlaying({
        ref: audio,
        name: props.track.name,
        _setPlayed: setPlayed,
      });
    } else {
      audio.current.pause();
      setPlayed(false);
      props.setCurrentlyPlaying(null);
    }
  };

  return (
    <div
      className="relative m-2 ml-5 mr-5 flex h-20 cursor-pointer flex-row items-center gap-2 rounded-md bg-black-1 pl-3 hover:bg-black-3"
      // onClick={ handleMusic }
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute left-5 flex aspect-square w-12 cursor-pointer items-center justify-center bg-[#00000080] p-2"
        onClick={handleMusic}
        style={{ opacity: played || isHovered ? 1 : 0 }}
      >
        <audio ref={audio} src={props.track?.preview_url} />
        <FontAwesomeIcon
          icon={played == true ? faPause : faPlay}
          size="lg"
          className="text-white"
        />
      </div>
      <div className="aspect-square w-16 p-2">
        <img
          src={props.track?.album?.images[0].url}
          alt={props.track?.track_img}
          className=""
        />
      </div>
      <div className="w-1/2 pt-2">
        <h1 className="text-md mb-2 line-clamp-1 cursor-not-allowed font-scbk">
          {props.track?.name}
        </h1>
        <h2
          className="z-20 line-clamp-1 inline-block cursor-pointer font-scbk text-sm underline decoration-transparent underline-offset-2 opacity-80 hover:decoration-inherit"
          onClick={() => navigate(`/artist/${props.track?.artists[0]?.id}`)}
        >
          {props.track?.artists[0]?.name}
        </h2>
      </div>

      <div className="line-clamp-1 w-1/4 cursor-not-allowed font-scbk text-sm underline decoration-transparent underline-offset-2 opacity-80 hover:decoration-inherit">
        {props.track?.album?.name}
      </div>

      <div className="font-scbk text-sm opacity-80">
        {DateUtil.convertMsToMMSS(props.track?.duration_ms)}
      </div>
    </div>
  );
};

SearchResultCard.propTypes = {
  track: PropTypes.object,
  currentlyPlaying: PropTypes.object,
  setCurrentlyPlaying: PropTypes.func,
};

export const HomePlaylistCard = (props) => {
  const navigate = useNavigate();

  const { authUser } = useContext(UserContext);

  return (
    <div
      key={props?.data?.id}
      className=" group/button bg-innerBlack duration-300hover:bg-black-3 relative flex w-[31%] cursor-pointer flex-col items-center rounded-xl p-3 ease-in-out sm:w-[24%]"
      onClick={() => {
        if (authUser) {
          navigate(`/album/${encodeURIComponent(props?.data?.id)}`, {
            state: "/",
          });
        }
      }}
    >
      <div className="w-full  shadow-white drop-shadow-lg">
        <img
          src={props?.data?.images[0].url}
          alt={props?.data?.name}
          className="relative h-full w-full rounded-lg"
        />
      </div>
      <div className="w-48 pl-2 pt-2 sm:pl-0">
        <h1 className="line-clamp-1 pt-2">{props?.data?.name}</h1>
        <p className="line-clamp-2 pt-2 font-scbk text-sm opacity-80">
          {props?.data?.description}
        </p>
      </div>

      <div
        className="absolute bottom-[6rem] right-[1.5rem] flex h-12 w-12 items-center justify-center rounded-full bg-darkerGreen p-5 opacity-0 duration-300 ease-linear
        hover:z-[5] hover:scale-110 hover:bg-green hover:opacity-80
        group-hover/button:bottom-[40%] group-hover/button:opacity-100"
      >
        <FontAwesomeIcon icon={faPlay} color="black" size="lg" />
      </div>
    </div>
  );
};

HomePlaylistCard.propTypes = {
  data: PropTypes.object,
};

export const ArtistAlbumCard = (props) => {
  const navigate = useNavigate();

  const { authUser } = useContext(UserContext);

  return (
    <>
      <div
        key={props?.data?.id}
        className=" group/button bg-innerBlack duration-300hover:bg-black-3 relative flex w-[31%] cursor-pointer flex-col items-center rounded-xl p-3 ease-in-out sm:w-[24%]"
        onClick={() => {
          if (authUser) {
            navigate(`/album/${encodeURIComponent(props?.data?.id)}`, {
              state: "/artists",
            });
          }
        }}
      >
        <div className="w-full  shadow-white drop-shadow-lg">
          <img
            src={props?.data?.images[0]?.url}
            alt={props?.data?.name}
            className="relative h-full w-full rounded-lg"
          />
        </div>
        <div className="w-48 pl-2 pt-2 sm:pl-0">
          <h1 className="line-clamp-1 pt-2">{props?.data?.name}</h1>
          <p className="line-clamp-2 pt-2 font-scbk text-sm opacity-80">
            {props?.data?.description}
          </p>
        </div>

        <div
          className="absolute bottom-[20%] right-[1.5rem] flex h-12 w-12 items-center justify-center rounded-full bg-darkerGreen p-5 opacity-0 duration-300 ease-linear
          hover:z-[5] hover:scale-110 hover:bg-green hover:opacity-80
          group-hover/button:bottom-[30%] group-hover/button:opacity-100"
        >
          <FontAwesomeIcon icon={faPlay} color="black" size="lg" />
        </div>
      </div>
    </>
  );
};

ArtistAlbumCard.propTypes = {
  data: PropTypes.object,
};
