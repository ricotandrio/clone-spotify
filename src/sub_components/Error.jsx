import React from 'react';
import { Link } from 'react-router-dom';

import '../index.css';

export default function Error() {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='relative w-1/2 h-3/4 bg-white rounded-xl text-black text-center flex flex-col items-center justify-normal p-8'>
          <h1 className='text-3xl'>Disclaimer</h1>
          <h3 className='mt-2 text-gray-1'>**This feature is currently unavailable**</h3>
          <p className='mt-5 font-scl'>
            This project using React.js and Tailwind CSS to develop a Spotify clone app, with the goal of replicating Spotify's UI and UX. It's crucial to mention that the design elements (UI and UX) are the property of Spotify due to copyright ownership.
            Additionally, some icons used in this clone project are sourced from Font Awesome.
          </p>
          <Link to='/' className='absolute p-2 w-1/2 bottom-5 rounded-full text-white bg-black mt-6 hover:bg-white hover:text-black'>
            BACK
          </Link>
        </div>
      </div>
    </>
  )
}

