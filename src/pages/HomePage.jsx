import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import Footer from "@src/components/Footer.jsx";
import Loading from "@src/components/Loading.jsx";
import UserOption from "@src/components/UserOption.jsx";

import { UserContext } from "@src/contexts/UserContext.jsx";

import { ButtonStyleNext, ButtonStylePrev } from "@src/components/Button.jsx";

import { SpotifyService } from "@src/apis/services/spotify.service";
import { HomePlaylistCard } from "@src/components/Card";

const HomePage = () => {
  const { token, authUser } = useContext(UserContext);

  const [isLoading, setLoading] = useState(true);
  const [profileVisible, setProfileVisible] = useState(false);
  const [featuredPlaylists, setFeaturedPlaylists] = useState({});

  const getFeaturedPlaylist = async (token) => {
    setLoading(true);
    const response = await SpotifyService.getFeaturedPlaylists(token);

    if (response != null) {
      setFeaturedPlaylists(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getFeaturedPlaylist(token);
  }, [token]);

  return (
    <>
      <div className="left-0 top-0 ml-1 h-full w-[90%] pr-2 pt-2 sm:w-full">
        <div className="h-22 relative w-full rounded-t-xl bg-black-1 pt-2">
          <div className="flex h-16 w-full items-center pb-2 pl-8 pr-2">
            <div className="flex gap-6">
              <ButtonStylePrev />
              <ButtonStyleNext />
            </div>

            <div className="absolute right-8 flex flex-row">
              {!authUser ? (
                <>
                  <Link to="/register">
                    <div className="flex h-12 w-28 items-center justify-center rounded-full opacity-80 duration-300 ease-in-out hover:scale-110 hover:opacity-100">
                      Sign Up
                    </div>
                  </Link>

                  <Link to="/login">
                    <div className="flex h-12 w-28 items-center justify-center rounded-full bg-white text-black opacity-100 duration-300 ease-in-out hover:scale-110 hover:opacity-80">
                      Log in
                    </div>
                  </Link>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
            {profileVisible == true && (
              <UserOption _setProfileVisible={setProfileVisible} />
            )}
          </div>
        </div>
        <div className="font-sbbs relative w-full bg-gradient-to-b from-black-2 to-black-1 text-white">
          {isLoading == true ? (
            <div className="flex w-full flex-col items-center justify-center p-10 pb-16">
              <Loading />
            </div>
          ) : (
            <>
              <Link>
                <h1 className="inline-block cursor-pointer pl-6 pt-8 text-3xl text-white opacity-80 duration-300 ease-in-out hover:underline hover:underline-offset-8">
                  {featuredPlaylists.message}
                </h1>
              </Link>
              <div className="mt-5 flex w-full flex-row flex-wrap items-center justify-start gap-2 overflow-hidden pb-3 pl-5 pr-5">
                {featuredPlaylists?.playlists?.items?.map((prop, index) => (
                  <HomePlaylistCard key={index} data={prop} />
                ))}
              </div>
            </>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
