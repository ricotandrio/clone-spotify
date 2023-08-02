import React from 'react'
import Sidebar from './Sidebar.jsx'
import Content from './Content.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Home() {

  return (
    <>
      <Sidebar />
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <div className='relative bg-lighterBlack w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center'>
            <div className='gap-6 flex'>
              <FontAwesomeIcon icon={faChevronLeft} className='notAllowed p-3 rounded-full' />
              <FontAwesomeIcon icon={faChevronRight} className='notAllowed p-3 rounded-full'/>
            </div>
            <div className='absolute flex flex-row right-8'>

              <Link to='/register'>
                <div className='w-28 h-12 rounded-full flex items-center justify-center ease-in-out duration-300 hover:scale-110 opacity-80 hover:opacity-100'>
                  Sign Up
                </div>
              </Link>

              <Link to='/login'>
              <div className='w-28 h-12 rounded-full bg-white text-black flex items-center justify-center ease-in-out duration-300 hover:scale-110 opacity-100 hover:opacity-80'>
                Log in
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Content />

    </>
  )
}


