import React from 'react'

import Twitter from '../assets/uil_twitter.png';
import Facebook from '../assets/ic_twotone-facebook.png';
import Instagram from '../assets/bi_instagram.png';

import '../index.css'

export default function Footer() {
  return (
    <>
      <footer className='pb-24 p-2 mt-20'>
        <div className='p-2 flex flex-row items-start justify-between'>
          <div className='p-2'>
            <h1 className='mb-2'>Company</h1>
            <ul className='font-scbk opacity-80'>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">About</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">Jobs</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">For the Record</a></li>
            </ul>
          </div>
          <div>
            <h1 className='mb-2'>Communities</h1>
            <ul className='font-scbk opacity-80'>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">For Artists</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">Developer</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">Advertising</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">Investors</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">Vendors</a></li>
            </ul>
          </div>
          <div>
            <h1 className='mb-2'>Useful links</h1>
            <ul className='font-scbk opacity-80'>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">Supports</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="">Free Mobile App</a></li>
            </ul>
          </div>
          <div className='flex flex-row gap-4'>
            <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-1'>
              <a href="https://www.instagram.com/spotify/" target='_blank'>
                <img src={Instagram} alt="instagram" />
              </a>
            </div>
            <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-1'>
              <a href="https://twitter.com/spotify" target='_blank'>
                <img src={Twitter} alt="twitter" />
              </a>
            </div>
            <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-1'>
              <a href="https://www.facebook.com/Spotify" target='_blank'>
                <img src={Facebook} alt="facebook" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-center p-4'>
            <div className='border-b border-gray-1 w-full'></div>
          </div>
          <h1 className='mt-5 ml-4 opacity-80 font-scbk'>© 2023 Spotify AB</h1>
        </div>
      </footer>
    </>
  )
}

