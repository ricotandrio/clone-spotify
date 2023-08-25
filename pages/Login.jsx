import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../src/assets/Spotify_Logo_CMYK_White.png';
import Spotify from '../src/assets/spotify.png';
import Github from '../src/assets/bi_github.png';
import Google from '../src/assets/flat-color-icons_google.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import '../src/index.css';

export default function Login({_userdata}) {
  const navigate = useNavigate();

  const [users, setUsers] = useState(_userdata);

  const [accName, setAccName] = useState('');
  const [password, setPassword] = useState('');

  const [warning, setWarning] = useState('');

  const [passwordType, setpasswordType] = useState('password');

  return (
    <>
      <div className='bg-gradient-to-b from-[#141414] from-40% to-black pb-1  0'>
        <div className='bg-black border border-black w-full h-30 top-8 left-10 pt-8 pl-12 pb-8'>
          <Link to='/'><img src={logo} alt="" className='w-22 h-8'/></Link>
        </div>

        <div className='w-full flex flex-col items-center justify-center'>
          <div className='bg-black w-2/3 mt-10 rounded-xl flex flex-col items-center justify-center p-10'>
            <h1 className='text-5xl mt-8'>Login to Spotify</h1>
            <ul className='opacity-80 mt-10'>
              <li className='relative border-2 cursor-not-allowed border-white border-opacity-80 pt-3 pb-3 pl-24 pr-24 rounded-full m-3 text-xs sm:text-lg'>
                <img src={Google} alt="spotify" className='absolute top-2 sm:top-3 left-10 w-6 h-6 mr-5' />
                Continue with Google
              </li>
              <li className='relative border-2 cursor-not-allowed border-white border-opacity-80 pt-3 pb-3 pl-24 pr-24 rounded-full m-3 text-xs sm:text-lg'>
                <img src={Github} alt="spotify" className='absolute top-2 sm:top-3 left-10 w-7 h-7 mr-5 border-1 sm:border-2 bg-white rounded-full' />
                Continue with Github
              </li>
              <li
                className='relative flex flex-row items-center border-2 cursor-pointer border-white border-opacity-80 pt-3 pb-3 pl-24 pr-24 rounded-full m-3 hover:border-opacity-100 text-xs sm:text-lg'
                onClick={() => {
                  window.alert('The feature to log in with Spotify is not available. Please try using your account instead.');
                  window.alert('You can also use these default account credentials: {name: \'user\', password: \'user\'}.');
                }}
              >
                <img src={Spotify} alt="spotify" className='absolute left-10 w-6 h-6 mr-5' />
                Continue with Spotify
              </li>
            </ul>
            <div className='w-3/4 border-t border-gray-1 mt-10 mb-10'></div>

            <form
              action=''
              autoComplete='off'
              className='flex flex-col'
              onSubmit={(e) => {
                e.preventDefault();
                let searchQuery = users.filter((curr) => (curr.name == accName || curr.email == accName) && curr.password == password);
                console.log(searchQuery);
                if(searchQuery.length != 0){
                  localStorage.setItem('login', JSON.stringify({"status": "true", }));
                  localStorage.setItem('whoislogin',
                    JSON.stringify({
                      "name": searchQuery[0].name,
                      "email": searchQuery[0].email,
                      "user_profile": searchQuery[0].user_profile,
                      "user_playlists": [searchQuery[0].user_playlists],
                      "top_tracks": [searchQuery[0].top_tracks],
                      "top_artists": [searchQuery[0].top_artists]
                    })
                  );
                  window.scrollTo(0, 0);
                  navigate('/');
                } else {
                  console.log('fail to login');
                  localStorage.setItem('login', JSON.stringify({"status": "false", }));
                  setWarning('account not found');
                }
              }}
            >
              <div className='flex flex-col'>
                <label htmlFor="username" className='pt-2 pb-2'>Email or username</label>
                <input type="text"
                  id='username'
                  className='opacity-80 bg-[#121212] p-3 pr-10 border-2 border-gray-1 rounded-md hover:border-white placeholder:font-scbk'
                  placeholder='Email or username'
                  value={accName}
                  onChange={(e) => setAccName(e.target.value)}
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor="password" className='pt-2 pb-2'>Password</label>
                <div className='relative flex flex-row'>
                  <input type={passwordType}
                    id='password'
                    className='opacity-80 bg-[#121212] p-3 pr-10 border-2 border-gray-1 rounded-md hover:border-white placeholder:font-scbk'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className='right-0 flex items-center p-4 z-20 absolute cursor-pointer hover:scale-105 opacity-80 hover:opacity-100'>
                    {
                      passwordType == 'text' ? (
                        <FontAwesomeIcon icon={faEye} size='1x' onClick={() => setpasswordType('password')} />
                        ) : (
                        <FontAwesomeIcon icon={faEyeSlash} size='1x' onClick={() => setpasswordType('text')} />
                      )
                    }
                  </div>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer mt-6">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-8 h-4 bg-gray-1 rounded-full peer peer-checked:after:translate-x-4 after:absolute after:top-[0.6vw] sm:after:top-[0.3vw] after:left-[0.2vw] after:bg-black after:border after:border-black after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-green"></div>
                <span className="ml-3 text-sm font-scbk">Remember Me</span>
              </label>

              <div className='flex flex-col justify-center items-center'>
                <button type='submit' className='w-full p-3 text-black mt-10 rounded-full bg-green transform hover:scale-105'>
                  Log In
                </button>
                <h2 className='mt-5 text-red-500'>{warning}</h2>
                <a href="" className='font-scl mt-3 underline underline-offset-2 hover:text-green'>Forgot your password ? </a>
              </div>
            </form>

            <div className='w-3/4 border-t border-gray-1 mt-10 mb-10'></div>
            <div>
              <span className='opacity-80'>Don't have an account ?</span>
              <Link to='/register' className='underline underline-offset-2 hover:text-green font-scl font-white ml-1'>Sign Up for Spotify</Link>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

// Login.propTypes = {
//   _userdata: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       password: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       dob: PropTypes.string.isRequired,
//       type: PropTypes.string.isRequired,
//       user_profile: PropTypes.string.isRequired,
//       user_playlists: PropTypes.array.isRequired,
//       top_tracks: PropTypes.array.isRequired,
//       top_artists: PropTypes.array.isRequired
//     })
//   ).isRequired
// }
