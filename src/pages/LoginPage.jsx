import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import logo from "@src/assets/images/Spotify_Logo_CMYK_White.png";
import Spotify from "@src/assets/images/spotify.png";
import Github from "@src/assets/images/bi_github.png";
import Google from "@src/assets/images/flat-color-icons_google.png";

import { UserContext } from "@src/contexts/UserContext.jsx";

import Loading from "@src/components/Loading.jsx";
import { FirebaseService } from "@src/apis/services/firebase.service";
import {
  loginUserSchema,
  validateExtractor,
} from "@src/apis/validations/user.validate";

const LoginPage = () => {
  const { authUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formToObject = {
        email: form.email,
        password: form.password,
      };

      const zodValidation = validateExtractor(
        loginUserSchema.safeParse(formToObject),
      );

      if (zodValidation == {}) return;

      // eslint-disable-next-line no-unused-vars
      const response = await FirebaseService.signIn(formToObject);
    } catch (e) {
      setErrors({ ...errors, form: e.message });

      console.log(`error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="0 bg-gradient-to-b from-[#141414] from-40% to-black  pb-1">
        <div className="h-30 left-10 top-8 w-full border border-black bg-black pb-8 pl-12 pt-8">
          <Link to="/">
            <img src={logo} alt="" className="w-22 h-8" />
          </Link>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="mt-10 flex w-2/3 flex-col items-center justify-center rounded-xl bg-black p-10">
            <h1 className="mt-8 text-center text-5xl">Login to Spotify</h1>
            {authUser ? (
              <>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="mt-5 text-2xl">You are already logged in.</h1>
                  <Link
                    to="/"
                    className="mt-6 flex w-1/2 items-center justify-center rounded-full bg-white p-2 text-black hover:bg-black hover:text-white"
                  >
                    HOME
                  </Link>
                </div>
              </>
            ) : (
              <>
                <ul className="mt-10 opacity-80">
                  <li className="relative m-3 cursor-not-allowed rounded-full border-2 border-white border-opacity-80 pb-3 pl-24 pr-24 pt-3 text-xs sm:text-lg">
                    <img
                      src={Google}
                      alt="spotify"
                      className="absolute left-10 top-2 mr-5 h-6 w-6 sm:top-3"
                    />
                    Continue with Google
                  </li>
                  <li className="relative m-3 cursor-not-allowed rounded-full border-2 border-white border-opacity-80 pb-3 pl-24 pr-24 pt-3 text-xs sm:text-lg">
                    <img
                      src={Github}
                      alt="spotify"
                      className="border-1 absolute left-10 top-2 mr-5 h-7 w-7 rounded-full bg-white sm:top-3 sm:border-2"
                    />
                    Continue with Github
                  </li>
                  <li
                    className="relative m-3 flex cursor-pointer flex-row items-center rounded-full border-2 border-white border-opacity-80 pb-3 pl-24 pr-24 pt-3 text-xs hover:border-opacity-100 sm:text-lg"
                    onClick={() => {
                      window.alert(
                        "The feature to log in with Spotify is not available. Please try using your account instead.",
                      );
                    }}
                  >
                    <img
                      src={Spotify}
                      alt="spotify"
                      className="absolute left-10 mr-5 h-6 w-6"
                    />
                    Continue with Spotify
                  </li>
                </ul>
                <div className="mb-10 mt-10 w-3/4 border-t border-gray-1"></div>

                <form
                  action=""
                  autoComplete="off"
                  className="flex flex-col"
                  onSubmit={handleSignIn}
                >
                  <div className="flex flex-col">
                    <label htmlFor="username" className="pb-2 pt-2">
                      Email or username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="rounded-md border-2 border-gray-1 bg-[#121212] p-3 pr-10 opacity-80 placeholder:font-scbk hover:border-white"
                      placeholder="Email or username"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="password" className="pb-2 pt-2">
                      Password
                    </label>
                    <div className="relative flex flex-row">
                      <input
                        type={isVisible ? "text" : "password"}
                        id="password"
                        className="rounded-md border-2 border-gray-1 bg-[#121212] p-3 pr-10 opacity-80 placeholder:font-scbk hover:border-white"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                      <div className="absolute right-0 z-20 flex cursor-pointer items-center p-4 opacity-80 hover:scale-105 hover:opacity-100">
                        {isVisible ? (
                          <FontAwesomeIcon
                            icon={faEye}
                            size="1x"
                            onClick={() => setVisible(false)}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            size="1x"
                            onClick={() => setVisible(true)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <label className="relative mt-6 inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer h-4 w-8 rounded-full bg-gray-1 after:absolute after:left-[0.2vw] after:top-[0.6vw] after:h-3 after:w-3 after:rounded-full after:border after:border-black after:bg-black after:transition-all peer-checked:bg-green peer-checked:after:translate-x-4 sm:after:top-[0.3vw]"></div>
                    <span className="ml-3 font-scbk text-sm">Remember Me</span>
                  </label>
                  <div className="flex flex-col items-center justify-center">
                    <button
                      type="submit"
                      className="mt-10 flex w-full transform justify-center rounded-full bg-green p-3 text-black hover:scale-105"
                    >
                      {isLoading == true ? <Loading /> : "Log In"}
                    </button>
                    <h2 className="mt-5 text-red-500">{errors.form}</h2>
                    <a
                      href=""
                      className="mt-3 font-scl underline underline-offset-2 hover:text-green"
                    >
                      Forgot your password ?{" "}
                    </a>
                  </div>
                </form>

                <div className="mb-10 mt-10 w-3/4 border-t border-gray-1"></div>
                <div>
                  <span className="opacity-80">{`Don't have an account ?`}</span>
                  <Link
                    to="/register"
                    className="font-white ml-1 font-scl underline underline-offset-2 hover:text-green"
                  >
                    Sign Up for Spotify
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
