import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faUser } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "@src/contexts/UserContext.jsx";

import Footer from "@src/components/Footer.jsx";
import Loading from "@src/components/Loading.jsx";
import UserOption from "@src/components/UserOption.jsx";

import { ButtonStyleNext, ButtonStylePrev } from "@src/components/Button.jsx";

import { SpotifyService } from "@src/apis/services/spotify.service";
import { FirebaseService } from "@src/apis/services/firebase.service";
import { ArtistAlbumCard } from "@src/components/Card";

const ArtistPage = () => {
  const [profileVisible, setProfileVisible] = useState(false);

  // fetch data from spotify web api
  const [isLoading, setLoading] = useState(true);
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();

  const { login, token, db, setDB, authUser } = useContext(UserContext);
  const { id } = useParams(); // get id from browser link

  const getArtist = useCallback(async () => {
    try {
      setLoading(true);
      const responseArtist = await SpotifyService.getArtistById(token, id);
      const responseAlbum = await SpotifyService.getAlbumByArtist(token, id);

      if (responseArtist != null) {
        setArtist(responseArtist);
        setLoading(false);
      }

      if (responseAlbum != null) {
        setAlbums(responseAlbum);
      }
    } catch (e) {
      console.log(`error: ${e.message}`);
    }
  }, [id, token]);

  useEffect(() => {
    if (token) getArtist();
  }, [id, token, getArtist]);

  const updateArtistLibrary = async () => {
    if (isLoading == true) return;

    try {
      const response = await FirebaseService.updateLibrary(
        authUser?.uid,
        artist.id,
        {
          name: artist.name,
          id: artist.id,
          images: artist.images[0].url,
          state: artist.type == "playlist" ? "/" : "/album",
          page: "artist",
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

  if (isLoading == true)
    return (
      <div className="left-0 top-0 ml-1 h-full w-full pr-2 pt-2">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="left-0 top-0 ml-1 h-full w-full pr-2 pt-2">
        <nav className="h-22 relative w-full rounded-t-xl bg-black-1 pt-1">
          <div className="fixed top-4 z-[999] flex h-16 w-3/4 items-center justify-between pb-2 pl-8 pr-2 backdrop-blur-sm">
            <div className="relative flex gap-6">
              <ButtonStylePrev />
              <ButtonStyleNext />
            </div>

            <div className="relative -right-20 flex flex-row sm:right-8">
              {login == "false" ? (
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
        </nav>

        <div className="w-full bg-gradient-to-b from-[#484848] to-[#282828] p-8 pt-20">
          <div className="flex w-full flex-row">
            <div className="relative flex h-[20vw] w-[20vw] items-center justify-center overflow-hidden rounded-md bg-[#282828] shadow-xl">
              <img
                src={artist?.images[0]?.url}
                alt=""
                className="h-full w-full"
              />
            </div>
            <div className="pl-5 sm:pt-14">
              <h1 className="pb-5 text-7xl">{artist?.name}</h1>
              <h1 className="font-scbk text-xl">
                Followers: {artist?.followers?.total}
              </h1>
              <div className="flex flex-row">
                <div className="mt-5 flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-full bg-darkerGreen p-5 hover:scale-105">
                  <FontAwesomeIcon icon={faPlay} color="black" size="lg" />
                </div>
                <div
                  className="ml-4 mt-5 flex cursor-pointer items-center justify-center rounded-full bg-white pl-5 pr-5 text-black hover:scale-105"
                  onClick={updateArtistLibrary}
                >
                  <h1 className="m-3 w-20 pl-1 pr-3 text-center">
                    {db?.user_library?.filter((curr) => curr.id === artist.id)
                      .length >= 1 && isLoading == false
                      ? "Following"
                      : "Follow"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 w-full rounded-b-md bg-black-1">
          <div className="p-5">
            <h1 className="pt-4 text-2xl">Discography</h1>
          </div>

          {albums?.items?.length == 0 ? (
            <h1 className="pl-5 text-xl">No albums found</h1>
          ) : (
            <div className="mt-5 flex w-full flex-row flex-wrap items-center justify-start gap-2 overflow-hidden pb-3 pl-5 pr-5">
              {albums?.items?.map((album, index) => (
                <ArtistAlbumCard key={index} data={album} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ArtistPage;
