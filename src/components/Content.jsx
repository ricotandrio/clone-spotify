import React, { useState, useEffect } from 'react'
import SongData from '../../public/data.json'
import SongSection from './SongSection.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import '../index.css'

export default function Content() {
  const [countWidth, setCountWidth] = useState(screen.width >= '640' ? 4 : 3);

  useEffect(() => {
    const updateWidth = () => {
      screen.width >= '640' ? setCountWidth(4) : setCountWidth(3);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <>
      <div className='relative w-full h-full'>
        <div className='relative bg-gradient-to-b from-innerBlack to-lighterBlack w-full sm:w-3/4 ml-[3rem] sm:ml-[20rem] text-white font-sbbs'>
          <SongSection data={SongData} title='Focus' start='0' end={0 + countWidth} />
          <SongSection data={SongData} title='Your Playlist' start='4' end={4 + countWidth} />

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
                <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray'>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray'>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray'>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
            </div>
            <div>
              <div className='flex items-center justify-center p-4'>
                <div className='border-b border-gray w-full'></div>
              </div>
              <h1 className='mt-5 ml-4 opacity-80 font-scbk'>© 2023 Spotify AB</h1>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

