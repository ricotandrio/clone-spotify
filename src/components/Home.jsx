import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar.jsx'
import Content from './Content.jsx'
import UserOption from '../sub_components/UserOption.jsx';
import PopupPlay from '../sub_components/PopupPlay.jsx';
import { LoginContext } from '../context/LoginContext.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';

import '../index.css';

Home.propTypes = {
  _songdata: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      contents: PropTypes.array.isRequired
    })
  ).isRequired
}

export default function Home({ _songdata }) {
  const [profileVisible, setProfileVisible] = useState(false);
  const { login } = useContext(LoginContext);

  return (
    <>
      <Sidebar/>
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <div className='relative bg-black-1 w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center'>
            <div className='gap-6 flex'>
              <FontAwesomeIcon icon={faChevronLeft} className='cursor-not-allowed p-3 rounded-full' />
              <FontAwesomeIcon icon={faChevronRight} className='cursor-not-allowed p-3 rounded-full'/>
            </div>

            <div className='absolute flex flex-row right-8'>
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
                  <div className='cursor-pointer mr-8 p-2 pl-5 pr-5 flex items-center text-center rounded-full bg-white text-black hover:opacity-90 hover:scale-105'>
                    Explore Premium
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
      </div>
      
      <Content _songdata={ _songdata }/>

      <PopupPlay/>
    </>
  )
}



