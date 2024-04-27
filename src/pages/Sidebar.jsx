import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

import { UserContext } from "@src/contexts/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faPlus,
  faLinesLeaning,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { AudioControllerBar } from "@src/components/AudioControllerBar";

const Sidebar = () => {
  const [width, setWidth] = useState(screen.width);
  const [filterBar, setFilterBar] = useState("ALL");

  const navigate = useNavigate();
  const location = useLocation();
  const outletRef = useRef(null);

  const { db, authUser } = useContext(UserContext);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(screen.width);
    };
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    outletRef.current.scrollTo(0, 0);
  }, [location.pathname]);

  const NavLinkStyle = ({ isActive }) => {
    return {
      opacity: isActive ? 1 : 0.8,
    };
  };

  const renderAudioControllerBar = useCallback(() => {
    return <AudioControllerBar />;
  }, []);

  return (
    <>
      {renderAudioControllerBar()}
      <div className="flex h-screen">
        {width >= 640 ? (
          <div className="hide-scrollbar z-10 w-1/4 overflow-y-auto rounded-b-md p-2">
            <div className="flex h-1/5 flex-col justify-center rounded-xl bg-black-1 p-2 pl-6">
              <ul className="text-l">
                <NavLink
                  to="/"
                  className="homebutton flex cursor-pointer flex-row items-center p-3 opacity-80 duration-300 ease-in-out hover:opacity-100"
                  style={NavLinkStyle}
                >
                  <FontAwesomeIcon icon={faHouse} />
                  <h1 className="ml-5 mt-1">Home</h1>
                </NavLink>
                <NavLink
                  to="/search"
                  className="searchbutton flex cursor-pointer flex-row items-center p-3 opacity-80 duration-300 ease-in-out hover:opacity-100"
                  style={NavLinkStyle}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <h1 className="ml-5 mt-1">Search</h1>
                </NavLink>
              </ul>
            </div>

            <div className="relative min-h-screen mt-2 flex flex-col rounded-xl bg-black-1 pb-10">
              <div className="ml-6 mt-6 flex flex-row items-center font-scbb">
                <div className="flex cursor-pointer flex-row items-center gap-5 opacity-80 duration-300 ease-in-out hover:opacity-100">
                  <FontAwesomeIcon icon={faLinesLeaning} size="xl" />
                  <h1 className="text-l block">Your Library</h1>
                </div>
                <div className="hidden cursor-pointer opacity-80 duration-300 ease-in-out hover:opacity-100 sm:absolute sm:right-10 sm:block">
                  <a href="">
                    <FontAwesomeIcon icon={faPlus} />
                  </a>
                </div>
              </div>

              <div className="mb-5 ml-3 mt-5 flex flex-row items-center gap-2">
                <div
                  className="flex w-1/3 cursor-pointer items-center justify-center rounded-full bg-[#232323] p-1 font-scbb hover:bg-white hover:text-black"
                  onClick={() => {
                    if (authUser) setFilterBar("PLAYLISTS");
                  }}
                  style={{
                    backgroundColor:
                      filterBar == "PLAYLISTS" ? "white" : "black",
                    color: filterBar == "PLAYLISTS" ? "black" : "white",
                  }}
                >
                  <h1 className="text-sm opacity-95">Playlists</h1>
                </div>
                <div
                  className="flex w-1/3 cursor-pointer items-center justify-center rounded-full bg-[#232323] p-1 font-scbb"
                  onClick={() => {
                    if (authUser) setFilterBar("ARTISTS");
                  }}
                  style={{
                    backgroundColor: filterBar == "ARTISTS" ? "white" : "black",
                    color: filterBar == "ARTISTS" ? "black" : "white",
                  }}
                >
                  <h1 className="text-sm opacity-95">Artists</h1>
                </div>
                <div
                  className="flex aspect-square w-7 cursor-pointer items-center justify-center rounded-full bg-white p-1 text-center font-scbb text-black hover:scale-105"
                  onClick={() => {
                    setFilterBar("ALL");
                  }}
                  style={{
                    display: filterBar == "ALL" ? "none" : "block",
                  }}
                >
                  <h1 className="text-sm opacity-95">X</h1>
                </div>
              </div>

              {db && (
                <div className="pb-12">
                  {db?.user_library
                    ?.filter((curr) => {
                      if (filterBar == "ALL") {
                        return curr;
                      } else if (filterBar == "PLAYLISTS") {
                        if (curr.page == "album") {
                          return curr;
                        }
                      } else if (filterBar == "ARTISTS") {
                        if (curr.page == "artist") {
                          return curr;
                        }
                      }
                    })
                    .map((curr) => (
                      <div
                        key={curr.id}
                        className="m-2 flex cursor-pointer flex-row items-center rounded-md p-1 hover:bg-black-2"
                        onClick={() => {
                          if (curr.page == "album") {
                            navigate(`/album/${curr.id}`, {
                              state: curr.state,
                            });
                          } else {
                            navigate(`/artist/${curr.id}`);
                          }
                        }}
                      >
                        <img
                          alt=""
                          src={curr.images}
                          className="mr-3 aspect-square w-14"
                          style={{
                            borderRadius: curr.page == "album" ? "20%" : "50%",
                          }}
                        />
                        <div>
                          <h1 className="mb-1 line-clamp-1">{curr.name}</h1>
                          {curr.page == "album" && (
                            <h2 className="line-clamp-1 font-scbk text-sm opacity-80">
                              Playlists • {db?.name}
                            </h2>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hide-scrollbar w-[5%] opacity-80">
            <div className="flex items-center justify-center p-3">
              <FontAwesomeIcon icon={faBars} size="xl" />
            </div>

            <div className="flex items-center justify-center p-3">
              <NavLink to="/" style={NavLinkStyle}>
                <FontAwesomeIcon icon={faHouse} size="1x" />
              </NavLink>
            </div>

            <div className="flex items-center justify-center p-3">
              <NavLink
                to="/search"
                style={NavLinkStyle}
                className="flex cursor-pointer flex-row items-center p-3 opacity-80 duration-300 ease-in-out hover:opacity-100"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
              </NavLink>
            </div>

            <div className="flex items-center justify-center p-3">
              <FontAwesomeIcon icon={faLinesLeaning} size="1x" />
            </div>

            {db && (
              <div>
                {db?.user_library.map((curr) => (
                  <div
                    key={curr.id}
                    className="m-2 flex cursor-pointer flex-row items-center rounded-md p-1 hover:bg-black-2"
                    onClick={() => {
                      if (curr.page == "album") {
                        navigate(`/album/${curr.id}`, {
                          state: curr.state,
                        });
                      } else {
                        navigate(`/artist/${curr.id}`);
                      }
                    }}
                  >
                    <img
                      src={curr.images}
                      alt=""
                      className="mr-3 aspect-square w-14 rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div
          ref={outletRef}
          className="relative flex-1 overflow-y-auto overflow-x-hidden"
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  _favorite: PropTypes.array,
};

export default Sidebar;
