import { Link } from "react-router-dom";
import Spotify from '@src/assets/images/spotify.png';

const ErrorPage = () => {
  return (
    <>
      <div className='w-full h-screen flex flex-col items-center justify-center bg-black-1'>
        <img src={Spotify} alt="spotify_logo" className="w-16" />

        <h1 className="text-5xl mt-16">Page not found</h1>

        <p className="font-scbk opacity-70 text-lg mt-5">We can’t seem to find the page you are looking for.</p>
        
        <Link to="/" className="mt-10 rounded-full bg-white text-black px-10 py-4 hover:scale-105">
          Home
        </Link>

        <Link to='/' className='text-white hover:underline mt-10'>
          Help
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;