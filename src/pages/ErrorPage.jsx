import Spotify from "@src/assets/images/spotify.png";

import '@src/assets/global.css';

const ErrorPage = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black-1">
        <img src={Spotify} alt="spotify_logo" className="w-16" />

        <h1 className="mt-16 text-5xl">Page not found</h1>

        <p className="mt-5 font-scbk text-lg opacity-70">
          We can’t seem to find the page you are looking for.
        </p>

        <a
          className="cursor-pointer mt-10 rounded-full bg-white px-10 py-4 text-black hover:scale-105"
        >
          Home
        </a>

        <a className="cursor-pointer mt-10 text-white hover:underline">
          Help
        </a>
      </div>
    </>
  );
};

export default ErrorPage;
