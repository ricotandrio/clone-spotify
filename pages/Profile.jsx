import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../src/components/Sidebar.jsx';
import UserOption from '../src/sub_components/UserOption.jsx';
import Content from '../src/components/Content.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import '../src/index.css';
import Footer from '../src/components/Footer.jsx';

export default function Profile() {
  const [profileVisible, setProfileVisible] = useState(false);
  const [currUser, setcurrUser] = useState(JSON.parse(localStorage.getItem('whoislogin')));

  console.log(currUser.top_artists[0])
  return (
    <>
      <Sidebar name='home'/>
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <div className='relative bg-[#484848] w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center'>
            <div className='gap-6 flex'>
              <FontAwesomeIcon icon={faChevronLeft} className='cursor-not-allowed p-3 rounded-full' />
              <FontAwesomeIcon icon={faChevronRight} className='cursor-not-allowed p-3 rounded-full'/>
            </div>

            <div className='absolute flex flex-row right-8'>
              <div className='cursor-pointer mr-8 p-2 pl-5 pr-5 flex items-center text-center rounded-full bg-white text-black hover:opacity-90 hover:scale-105'>
                Explore Premium
              </div>
              <div
                className='ease-in-out duration-200 full-rounded p-2 hover:scale-110 cursor-pointer'
                onClick={() => { setProfileVisible(!profileVisible) }}
              >
                <FontAwesomeIcon icon={faUser} size='lg'/>
              </div>
            </div>
            {
              profileVisible == true && ( <UserOption _setProfileVisible={setProfileVisible}/> )
            }
          </div>
        </div>

        <div className='bg-gradient-to-b from-[#484848] to-[#282828] w-full p-8'>
          <div className='w-full flex flex-row'>
            <div className='bg-[#282828] relative p-5 w-[20vw] h-[20vw] rounded-full flex items-center justify-center shadow-xl'>
              <FontAwesomeIcon icon={faUser} size='4x' style={{color: 'gray'}}/>
            </div>
            <div className='sm:pt-14 pl-5'>
              <h5>Profile</h5>
              <h1 className='text-8xl'>{currUser.name}</h1>
            </div>
          </div>
        </div>

        <div className='bg-black-1 w-full rounded-b-md mb-3'>
          <div className='p-5'>
            <h1 className='text-2xl'>Top artists this month</h1>
            <h2 className='font-scbk opacity-80 text-sm'>Only visible to you</h2>
          </div>
          <div className='p-5 w-full flex flex-row items-center'>
            {
              currUser.top_artists[0] == null && (
                <div>
                  <h1 className='text-2xl opacity-80'>... no data</h1>
                </div>
              )
            }
            {
              currUser.top_artists[0] != null && currUser.top_artists[0].map((artist) => (
                <div key={artist.id}
                className='w-1/4 m-2 flex flex-col items-center justify-center relative cursor-pointer bg-black-1 rounded-xl ease-in-out duration-300
                hover:bg-[#282828] group/button'
                >
                  <div className='w-3/4 m-4 h-40 rounded-full overflow-hidden flex items-center justify-center'>
                    <img src={artist.artist_img} alt={artist.artist_img} className=''/>
                  </div>
                  <div className='mt-2 mb-8 w-3/4'>
                    <h1 className=''>{artist.name}</h1>
                    <h2 className='text-md font-scbk opacity-80'>Artist</h2>
                  </div>

                  <div
                    className='absolute w-12 h-12 bg-darkerGreen flex items-center justify-center rounded-full p-5 bottom-[6rem] right-[1.5rem] opacity-0 ease-linear duration-300
                    hover:z-[5] hover:bg-green hover:opacity-80 hover:scale-110
                    group-hover/button:bottom-[7rem] group-hover/button:opacity-100'
                  >
                    <FontAwesomeIcon icon={faPlay} color='black' size='lg'/>
                  </div>
                </div>

              ))
            }
          </div>

          <div className='p-5'>
            <h1 className='text-2xl'>Top tracks this month</h1>
            <h2 className='font-scbk opacity-80 text-sm'>Only visible to you</h2>
          </div>
          <div className=''>
            {
              currUser.top_tracks[0] == null && (
                <div className='ml-5 mt-3'>
                  <h1 className='text-2xl opacity-80'>... no data</h1>
                </div>
              )
            }
            {
              currUser.top_tracks[0] != null && currUser.top_tracks[0].map((track) => (
                <div key={track.id}
                  className='relative flex flex-row items-center h-14 gap-2 m-2 ml-5 mr-5 bg-black-1 hover:bg-[#282828]'
                >
                  <div className='w-12 flex items-center justify-center h-full opacity-80'>
                    {track.id}
                  </div>
                  <div className='w-14 p-2 h-full'>
                    <img src={track.track_img} alt={track.track_img} className=''/>
                  </div>
                  <div className='w-1/2'>
                    <h1 className='font-scbk text-md'>{track.title}</h1>
                    <h2 className='font-scbk text-sm opacity-80'>{track.artists}</h2>
                  </div>

                  <div className='w-1/4 text-sm opacity-80 font-scbk'>
                    {track.album_name}
                  </div>

                  <div className='text-sm opacity-80 font-scbk'>
                    {track.duration}
                  </div>
                </div>

              ))
            }
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}

