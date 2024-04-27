import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { UserContext } from "@src/contexts/UserContext.jsx";

import UserOption from "@src/components/UserOption.jsx";
import Footer from "@src/components/Footer.jsx";

import { ButtonStyleNext, ButtonStylePrev } from "@src/components/Button.jsx";
import { FirebaseService } from "@src/apis/services/firebase.service";
import { DateUtil } from "@src/utils/DateUtil";

const ProfilePage = () => {
  const { authUser, db, setDB } = useContext(UserContext);

  const [isLoading, setLoading] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const topArtists = await FirebaseService.getTopArtists(authUser.uid);

        const topTracks = await FirebaseService.getTopTracks(authUser.uid);

        setTopArtists(topArtists);
        setTopTracks(topTracks);

        // console.log(topArtists);
        // console.log(topTracks);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) fetchData();
  }, [authUser, db, setDB]);
  // console.log(db.top_artists);

  if (!authUser) navigate("/login");

  return (
    <>
      <div className="left-0 top-0 ml-1 h-full w-[90%] pr-2 pt-2 sm:w-full">
        <div className="h-22 relative w-full rounded-t-xl bg-[#484848] pt-2">
          <div className="flex h-16 w-full items-center pb-2 pl-8 pr-2">
            <div className="flex gap-6">
              <ButtonStylePrev />
              <ButtonStyleNext />
            </div>

            <div className="absolute right-8 flex flex-row">
              <div className="mr-8 flex cursor-pointer items-center rounded-full bg-white p-2 pl-5 pr-5 text-center text-black hover:scale-105 hover:opacity-90">
                Explore Premium
              </div>
              <div
                className="full-rounded cursor-pointer p-2 duration-200 ease-in-out hover:scale-110"
                onClick={() => {
                  setProfileVisible(!profileVisible);
                }}
              >
                <FontAwesomeIcon icon={faUser} size="lg" />
              </div>
            </div>
            {profileVisible == true && (
              <UserOption _setProfileVisible={setProfileVisible} />
            )}
          </div>
        </div>

        <div className="w-full bg-gradient-to-b from-[#484848] to-[#282828] p-8">
          <div className="flex w-full flex-row">
            <div className="relative flex h-[20vw] w-[20vw] items-center justify-center rounded-full bg-[#282828] p-5 shadow-xl">
              <FontAwesomeIcon
                icon={faUser}
                size="4x"
                style={{ color: "gray" }}
              />
            </div>
            <div className="pl-5 sm:pt-14">
              <h5>Profile</h5>
              <h1 className="text-8xl">{db?.name}</h1>
            </div>
          </div>
        </div>

        <div className="mb-3 w-full rounded-b-md bg-black-1">
          <div className="p-5">
            <h1 className="text-2xl">Top artists this month</h1>
            <h2 className="font-scbk text-sm opacity-80">
              Only visible to you
            </h2>
          </div>
          <>
            {isLoading ? (
              <div>
                <h1 className="text-2xl opacity-80">... no data</h1>
              </div>
            ) : (
              <div className="flex w-full flex-row items-center p-5">
                {topArtists?.map((artist, index) => (
                  <div
                    key={index}
                    className="group/button relative m-2 flex w-1/4 cursor-pointer flex-col items-center justify-center rounded-xl bg-black-1 duration-300
                    ease-in-out hover:bg-[#282828]"
                    onClick={() =>
                      navigate(
                        `/artist/${encodeURIComponent(artist.songArtist)}`,
                      )
                    }
                  >
                    <div className="m-4 flex h-40 w-3/4 items-center justify-center overflow-hidden rounded-full">
                      <img
                        src={artist.songImage}
                        alt={artist.songArtist}
                        className="aspect-square rounded-full"
                      />
                    </div>
                    <div className="mb-8 mt-2 w-3/4">
                      <h1 className="">{artist.songArtist}</h1>
                      <h2 className="text-md font-scbk opacity-80">Artist</h2>
                    </div>

                    <div
                      className="absolute bottom-[6rem] right-[1.5rem] flex h-12 w-12 items-center justify-center rounded-full bg-darkerGreen p-5 opacity-0 duration-300 ease-linear
                        hover:z-[5] hover:scale-110 hover:bg-green hover:opacity-80
                        group-hover/button:bottom-[7rem] group-hover/button:opacity-100"
                    >
                      <FontAwesomeIcon icon={faPlay} color="black" size="lg" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>

          <div className="p-5">
            <h1 className="text-2xl">Top tracks this month</h1>
            <h2 className="font-scbk text-sm opacity-80">
              Only visible to you
            </h2>
          </div>
          <>
            {isLoading ? (
              <div className="ml-5 mt-3">
                <h1 className="text-2xl opacity-80">... no data</h1>
              </div>
            ) : (
              <div>
                {topTracks?.map((track, index) => (
                  <div
                    key={index}
                    className="relative m-2 ml-5 mr-5 flex h-14 flex-row items-center gap-2 bg-black-1 hover:bg-[#282828]"
                  >
                    <div className="flex h-full w-12 items-center justify-center opacity-80">
                      {index + 1}
                    </div>
                    <div className="h-full w-14 p-2">
                      <img
                        src={track.songImage}
                        alt={track.songName}
                        className=""
                      />
                    </div>
                    <div className="w-1/2">
                      <h1
                        className="text-md cursor-pointer font-scbk underline decoration-transparent underline-offset-2 hover:decoration-current"
                        onClick={() =>
                          navigate(
                            `/search/${encodeURIComponent(track.songName)}`,
                          )
                        }
                      >
                        {track.songName}
                      </h1>
                      <h2 className="font-scbk text-sm opacity-80">
                        {track.songArtist}
                      </h2>
                    </div>

                    <div className="w-1/4 font-scbk text-sm opacity-80">
                      {track.songAlbum}
                    </div>

                    <div className="font-scbk text-sm opacity-80">
                      {DateUtil.convertMsToMMSS(track.duration)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
