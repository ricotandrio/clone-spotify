import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDownload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "@src/contexts/UserContext.jsx";
import { QueryContext } from "@src/contexts/QueryContext.jsx";

import Footer from "@src/components/Footer.jsx";
import UserOption from "@src/components/UserOption.jsx";

import { ButtonStyleNext, ButtonStylePrev } from "@src/components/Button.jsx";

import "@src/assets/global.css";

const SearchPage = () => {
  const { authUser } = useContext(UserContext);
  const { query, setQuery } = useContext(QueryContext);

  const [profileVisible, setProfileVisible] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="left-0 top-0 ml-1 h-full w-full pr-2 pt-2">
        <div className="h-22 relative w-full rounded-t-xl bg-black-1 pt-2">
          <div className="flex h-16 w-full items-center pb-2 pl-8 pr-2">
            <div className="flex gap-6">
              <ButtonStylePrev />
              <ButtonStyleNext />
            </div>

            <form
              action=""
              className="relative flex w-1/2 flex-row items-center"
            >
              <label htmlFor="search-bar" className="absolute left-10">
                <FontAwesomeIcon icon={faSearch} />
              </label>
              <input
                disabled={authUser ? false : true}
                autoComplete="off"
                id="search-bar"
                type="text"
                name="search"
                className="ml-5 w-[80%] rounded-full bg-black-2 p-3 pl-14 placeholder:text-[1.5vw] placeholder:opacity-90 sm:w-full sm:placeholder:text-sm"
                placeholder={
                  authUser
                    ? "What do you want to listen to? "
                    : "Login to access the search feature !"
                }
                value={query || ""}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value == "") {
                    navigate("/search");
                  } else {
                    navigate(`/search/${encodeURIComponent(e.target.value)}`);
                  }
                }}
              />
            </form>

            <div className="absolute right-8 flex flex-row items-center">
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
                  <div className="mr-3 flex cursor-not-allowed items-center p-2 pl-5 pr-5 text-center hover:scale-105 hover:opacity-90">
                    <FontAwesomeIcon
                      icon={faDownload}
                      size="sm"
                      className="mr-2 rounded-full border p-2"
                    />
                    Install App
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
        <Outlet />

        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
