import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Spotify_Logo_CMYK_White.png'

export default function Login() {
  return (
    <>
      <div className='bg-gradient-to-b from-[#141414] from-40% to-black pb-10'>
        <div className='bg-black border border-black w-full h-30 top-8 left-10 pt-8 pl-12 pb-8'>
          <img src={logo} alt="" className='w-22 h-8'/>
        </div>

        <div className='w-full flex flex-col items-center justify-center'>
          <div className='bg-black w-2/3 mt-10 rounded-xl flex flex-col items-center p-10'>
            <h1 className='text-5xl mt-8'>Login to Spotify</h1>
            <ul className='opacity-80 mt-10'>
              <li className='border-2 cursor-not-allowed border-white border-opacity-80 pt-3 pb-3 pl-14 pr-14 rounded-full m-3'>
                Continue with Google
              </li>
              <li className='border-2 cursor-not-allowed border-white border-opacity-80 pt-3 pb-3 pl-14 pr-14 rounded-full m-3'>
                Continue with Github
              </li>
              <li className='border-2 cursor-pointer border-white border-opacity-80 pt-3 pb-3 pl-14 pr-14 rounded-full m-3 hover:border-opacity-100'>
                Continue with Spotify
              </li>
            </ul>
            <div className='w-3/4 border-t border-gray mt-10 mb-10'></div>
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <label htmlFor="username" className='pt-2 pb-2'>Email or username</label>
                <input type="text" id='username'
                        className='opacity-80 bg-[#121212] p-3 pr-10 border-2 border-gray rounded-md hover:border-white placeholder:font-scbk'
                        placeholder='Email or username'/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className='pt-2 pb-2'>Password</label>
                <input type="text" id='password'
                        className='opacity-80 bg-[#121212] p-3 pr-10 border-2 border-gray rounded-md hover:border-white placeholder:font-scbk'
                        placeholder='Password'/>
              </div>

              <label class="relative inline-flex items-center cursor-pointer mt-6">
                <input type="checkbox" value="" class="sr-only peer" />
                <div class="w-8 h-3 bg-gray rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green"></div>
                <span class="ml-3 text-sm font-scbk">Remember Me</span>
              </label>

              <div className='flex flex-col justify-center items-center'>
                <button className='w-full p-3 text-black mt-10 rounded-full bg-green transform hover:scale-105'>Log In</button>
                <a href="" className='font-scl mt-5 underline underline-offset-2 hover:text-green'>Forgot your password ? </a>
              </div>
            </div>
            <div className='w-3/4 border-t border-gray mt-10 mb-10'></div>

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

