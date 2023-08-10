import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';
import UserOption from './part_components/UserOption';
import Content from './Content';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import '../index.css';

export default function Profile() {
  const [profileVisible, setProfileVisible] = useState(false);
  const [currUser, setcurrUser] = useState(JSON.parse(localStorage.getItem('whoislogin')));

  // console.log(currUser)

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

        <div className='bg-[#202020] w-full'>
          <div>
            <h1>Top artists this month</h1>
            <h2>Only visible to you</h2>
          </div>
        </div>
      </div>
    </>
  )
}

