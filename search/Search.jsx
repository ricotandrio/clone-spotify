import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from '../src/components/Sidebar.jsx'
import Footer from '../src/components/Footer.jsx'
import UserOption from '../src/sub_components/UserOption.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faUser, faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';

import '../src/index.css';

export default function Search({ _query, _setQuery }) {
  const [profileVisible, setProfileVisible] = useState(false);
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('login')){
      setLogin(JSON.parse(localStorage.getItem('login')).status);
    }
  });

  return (
    <>
      <Sidebar />
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <div className='relative bg-black-1 w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center'>
            <div className='gap-6 flex'>
              <FontAwesomeIcon icon={faChevronLeft} className='cursor-not-allowed p-3 rounded-full' />
              <FontAwesomeIcon icon={faChevronRight} className='cursor-not-allowed p-3 rounded-full'/>
            </div>

            <form
              action=''
              className='w-1/2 flex flex-row relative items-center'
            >
              <label htmlFor="search-bar" className='absolute left-10'>
                <FontAwesomeIcon icon={faSearch} />
              </label>
              <input
                disabled={login == "true" ? false : true}
                autoComplete='off'
                id='search-bar'
                type="text"
                name='search'
                className='p-3 rounded-full ml-5 pl-14 w-full bg-black-2 placeholder:text-sm placeholder:opacity-90'
                placeholder={login == "true" ? 'What do you want to listen to? ' : 'Login to access the search feature !'}
                value={ _query || '' }
                onChange={(e) => {
                  _setQuery(e.target.value);
                  if(e.target.value == ''){
                    navigate('/search');
                  } else {
                    navigate(`/search/${encodeURIComponent(e.target.value)}`);
                  }
                }}
              />
            </form>

            <div className='absolute flex flex-row items-center right-8'>
              {
                login == "false" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className='cursor-not-allowed mr-3 p-2 pl-5 pr-5 flex items-center text-center hover:opacity-90 hover:scale-105'>
                      <FontAwesomeIcon icon={faDownload} size='sm' className='border rounded-full p-2 mr-2'/>
                      Install App
                    </div>
                    <div
                      className='ease-in-out duration-200 full-rounded p-2 hover:scale-110 cursor-pointer'
                      onClick={() => { setProfileVisible(!profileVisible) }}
                    >
                      <FontAwesomeIcon icon={faUser} size='lg'/>
                    </div>
                  </>
                )
              }
            </div>
            {
              profileVisible == true && ( <UserOption _setProfileVisible={setProfileVisible}/> )
            }
          </div>
        </div>
        <Outlet />

        <Footer />
      </div>
    </>
  )
}
