import React, { useState } from 'react'
import spotify_black from '../assets/Spotify_Logo_CMYK_Black.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Register(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <>
      <div className='bg-white w-full pb-20 text-black'>
        <Link to='/' className='border-black p-8 flex items-center justify-center'>
          <img src={spotify_black} alt="spotify logo" className='w-32' />
        </Link>
        <div className='border-black p-8 flex items-center justify-center text-black'>
          <h1 className='text-3xl font-scb'>Sign up for free to start listening.</h1>
        </div>

        <div className='w-full flex justify-center'>

          <form action=""
            className='w-1/3'
            onSubmit={() => {
              navigate('/')
            }}
          >
            <div className='flex flex-col items-start m-2 mt-8'>
              <label htmlFor="email"
                className='mb-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                What's your email?
              </label>
              <input type="text" id='email' placeholder='Enter your mail.' name='email'
                className='w-full p-3 rounded-md border outline-black border-grayy font-scbk'
              />
            </div>

            <div className='flex flex-col items-start m-2 mt-8'>
              <label htmlFor="password" name='password'
                className='mb-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
                Create a password
              </label>
              <input type="text" id='password' placeholder='Create a password.'
                className='w-full p-3 rounded-md border outline-black border-grayy font-scbk'
              />
            </div>

            <div className='flex flex-col items-start m-2 mt-8'>
              <label htmlFor="name"
                className='mb-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
                What should we call you?
                </label>
              <input type="text" id='name' placeholder='Enter a profile name.' name='name'
                className='w-full p-3 rounded-md border outline-black border-gray font-scbk'
              />
              <h3 className='font-scbk opacity-80 text-[0.8rem] mt-3 mb-6'>This appear on your profile.</h3>
            </div>

            <div className='p-2 flex flex-col'>
              <h1 className=''>
                What's your date of birth?
              </h1>

              <div className='flex flex-row w-full'>
                <div className='w-1/3 flex flex-col p-2'>
                  <label htmlFor="ddob">Day</label>
                  <input type="text" id='ddob' placeholder='DD' name='day'
                    className='border-[0.1em] border-gray w-full p-3 rounded-md'
                  />
                </div>

                <div className='w-2/3 flex flex-col p-2'>
                  <label htmlFor="mob">Month</label>

                  <select type="text" id='mob' placeholder='Month' name='month'
                    className='border-[0.1em] border-gray w-full h-full opacity-60 p-2 rounded-md'
                  >
                  <option value="default" disabled>Month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                  </select>
                </div>

                <div className='w-1/3 flex flex-col p-2'>
                  <label htmlFor="yob">Year</label>
                  <input type="text" id='yob' placeholder='YYYY' name='year'
                    className='border-[0.1em] border-gray w-full p-3 rounded-md'
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center p-8 items-center'>
              <div className='font-scl text-[0.6rem] text-center mb-5'>
                <h6 className='mb-3'>By clicking on sign-up, you agree to Spotify's <a href='#' className='text-green underline'>Terms and Conditions of Use.</a></h6>
                <h6>By clicking on sign-up, you agree to the <a href='#' className='text-green underline'>Spotify Privacy Policy.</a></h6>
              </div>

              <button type='submit'
                className='w-1/3 p-4 pl-6 pr-6 rounded-full bg-green hover:scale-105 hover:opacity-90'
              >
                Sign Up
              </button>
              <div className='mt-8 font-scbk'>Have an account ?
                <Link to='/login' className='text-green underline underline-offset-2 font-scbk hover:opacity-70'> Login.</Link>
              </div>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

