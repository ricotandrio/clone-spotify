import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart, faClock } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "@src/contexts/UserContext.jsx";

import Footer from "@src/components/Footer.jsx";
import Loading from "@src/components/Loading.jsx";

import { ButtonStyleNext, ButtonStylePrev } from "@src/components/Button.jsx";
import { DateUtil } from "@src/utils/DateUtil";

import { SpotifyService } from "@src/apis/services/spotify.service";
import { FirebaseService } from "@src/apis/services/firebase.service";
import {
  AudioAction,
  AudioPlayerContext,
} from "@src/contexts/AudioPlayerContext";

const PlaylistPage = () => {
  // fetch data from spotify web api
  const [isLoading, setLoading] = useState(true);
  const [tracks, setTracks] = useState({});

  const { token, authUser, db, setDB } = useContext(UserContext);
  const { id } = useParams();
  const { dispatch } = useContext(AudioPlayerContext);

  const navigate = useNavigate();
  const location = useLocation(); // spotify api to GET playlists and albums have different path link

  const stateLocation = location.state == "/" ? "playlists" : "albums";

  // useCallback to prevent infinite loop
  const getPlaylist = useCallback(async () => {
    try {
      setLoading(true);
      const response = await SpotifyService.getPlaylistById(
        stateLocation,
        id,
        token,
      );

      // console.log(response);
      setTracks(response);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  }, [id, token, stateLocation]);

  // update user library handler function works as controller from firebase service
  const handleUpdateLibrary = async () => {
    if (isLoading == true) return;

    try {
      const response = await FirebaseService.updateLibrary(
        authUser?.uid,
        tracks.id,
        {
          name: tracks.name,
          id: tracks.id,
          images: tracks.images[0].url,
          state: tracks.type == "playlist" ? "/" : "/album",
          page: "album",
        },
      );

      setDB({
        ...db,
        user_library: response,
      });
    } catch (e) {
      console.log(`error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  // handle audio play function
  const handleAudioPlay = (track) => {
    // console.log('get in toggle');
    dispatch({
      type: AudioAction.SET_AUDIO_SOURCE,
      payload: {
        src:
          tracks.type == "playlist"
            ? { ...track.track, type: "playlist" }
            : { ...track, images: tracks.images[0].url },
      },
    });
  };

  useEffect(() => {
    if (token) getPlaylist();
  }, [id, token, stateLocation, getPlaylist]);

  return (
    <>
      <div className="left-0 top-0 ml-1 h-full w-full pr-2 pt-2">
        <nav className="h-22 relative w-full rounded-t-xl bg-gradient-to-b from-[#484848] to-black pt-2">
          <div className="flex h-16 w-full items-center gap-6 pb-2 pl-8 pr-2">
            <ButtonStylePrev />
            <ButtonStyleNext />
          </div>
          <div className="flex flex-row p-2 pb-5">
            <section className="ml-3 mt-3 flex aspect-square w-1/4 items-center justify-center shadow-xl shadow-black">
              {isLoading == true ? (
                <Loading />
              ) : (
                <img
                  src={tracks?.images[0]?.url}
                  alt={tracks?.name}
                  className="line aspect-square w-full"
                />
              )}
            </section>
            <section className="ml-5 w-[68%] p-2">
              <h2 className="pt-16 font-scbk">Playlist</h2>
              {isLoading == true ? (
                <Loading />
              ) : (
                <>
                  <h1 className="mb-6 line-clamp-1 pt-1 text-6xl">
                    {tracks?.name}
                  </h1>
                  <p className="line-clamp-4 text-justify text-sm opacity-80">
                    {tracks.type == "playlist"
                      ? tracks?.description
                      : tracks.name}
                  </p>
                </>
              )}
            </section>
          </div>
        </nav>

        <main className="w-full bg-black-1 pb-10">
          <section className="flex w-full flex-row items-center gap-8 pb-3 pl-5 pt-3">
            <div className="flex aspect-square w-14 cursor-not-allowed items-center justify-center rounded-full bg-green hover:scale-105 hover:opacity-90">
              <FontAwesomeIcon icon={faPlay} size="lg" className="text-black" />
            </div>
            <div className="cursor-pointer hover:scale-105 hover:opacity-90">
              <FontAwesomeIcon
                icon={faHeart}
                size="2xl"
                style={{
                  color:
                    db?.user_library?.filter((curr) => curr.id === tracks.id)
                      .length == 1 && isLoading == false
                      ? "red"
                      : "white",
                }}
                onClick={handleUpdateLibrary}
              />
            </div>
          </section>

          <section className="mt-5 flex flex-col items-center pb-5">
            <table className="mb-2 w-[96%] border-b p-3 opacity-80">
              <tbody>
                <tr className="font-scl text-sm">
                  <th className="w-[5%] pb-2 text-center">#</th>
                  <th className="w-[30%] pb-2 text-left">Title</th>
                  <th className="w-[30%] pb-2 text-left">Album</th>
                  <th className="w-[20%] pb-2 text-left">Data Added</th>
                  <th className="w-[15%] pb-2 pl-9 text-left">
                    <FontAwesomeIcon icon={faClock} />
                  </th>
                </tr>
              </tbody>
            </table>
            {isLoading == true ? (
              <Loading />
            ) : (
              <div className="w-[97%]">
                {tracks?.tracks?.items?.map((track, index) => (
                  <div
                    key={index}
                    className="group m-1 flex w-[96%] cursor-pointer flex-row items-center p-2 hover:bg-black-3"
                    onClick={() => handleAudioPlay(track)}
                  >
                    <div className="mr-2 flex w-[3%] items-center justify-center">
                      <h1 className="opacity-80 group-hover:hidden">
                        {index + 1}
                      </h1>
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="hidden group-hover:block"
                      />
                    </div>

                    <div className="flex w-[30%] flex-row items-center">
                      <div className="mr-3 aspect-square w-[15%]">
                        <img
                          src={
                            tracks.type == "playlist"
                              ? track?.track?.album?.images[0]?.url
                              : tracks?.images[0]?.url
                          }
                          alt=""
                          className="h-full w-full"
                        />
                      </div>
                      <div className="w-full">
                        <h1
                          className="line-clamp-1 cursor-pointer font-scbk underline decoration-transparent underline-offset-2 hover:decoration-current"
                          onClick={() =>
                            navigate(
                              `/search/${encodeURIComponent(tracks.type == "playlist" ? track?.track?.name : track?.name)}`,
                            )
                          }
                        >
                          {tracks.type == "playlist"
                            ? track?.track?.name
                            : track?.name}
                        </h1>
                        <p
                          className="cursor-pointer font-scbk text-sm underline decoration-transparent underline-offset-2 opacity-80 hover:decoration-current"
                          onClick={() =>
                            navigate(
                              `/artist/${tracks.type == "playlist" ? track?.track?.artists[0]?.id : tracks?.artists[0]?.id}`,
                            )
                          }
                        >
                          {tracks.type == "playlist"
                            ? track?.track?.artists[0]?.name
                            : track?.artists[0]?.name}
                        </p>
                      </div>
                    </div>

                    <div className="w-[30%]">
                      <h1 className="line-clamp-1 cursor-not-allowed pl-3 font-scbk text-sm underline decoration-transparent underline-offset-2 opacity-80 hover:decoration-current">
                        {tracks?.type == "playlist"
                          ? track?.track?.album?.name
                          : tracks?.name}
                      </h1>
                    </div>
                    <div className="w-[22%]">
                      <h1 className="line-clamp-1 pl-9 font-scbk text-sm opacity-80">
                        {tracks?.type == "playlist"
                          ? DateUtil.extractYearMonthDay(
                              new Date(track?.added_at),
                            )
                          : DateUtil.extractYearMonthDay(
                              new Date(tracks?.release_date),
                            )}
                      </h1>
                    </div>
                    <div className="w-[15%] pl-3 text-center font-scbk text-sm opacity-80">
                      {DateUtil.convertMsToMMSS(
                        tracks.type == "playlist"
                          ? track?.track?.duration_ms
                          : track?.duration_ms,
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlaylistPage;
