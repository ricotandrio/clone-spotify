import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faPlus, faLinesLeaning, faBars, faX } from '@fortawesome/free-solid-svg-icons';

import '../index.css';

Sidebar.propTypes = {
  _favorite: PropTypes.array,
}

export default function Sidebar({ _favorite }) {
  const [width, setWidth] = useState(screen.width);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateWidth = () => {
      setWidth(screen.width);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const NavLinkStyle = ({ isActive }) => {
    return {
      opacity: isActive ? 1 : 0.8,
    }
  }

  return (
    <>
      <div className='z-[990] relative'>
        {
          width >= '640' ? (
            <div className='fixed w-1/4 h-screen p-2 z-10 rounded-b-md' >
              <div className='h-1/5 p-2 pl-6 flex flex-col justify-center rounded-xl bg-black-1'>
                <ul className='text-l'>
                  <NavLink
                    to='/'
                    className='homebutton cursor-pointer p-3 flex flex-row items-center ease-in-out duration-300 opacity-80 hover:opacity-100'
                    style={ NavLinkStyle }
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    <h1 className='ml-5 mt-1'>Home</h1>
                  </NavLink>
                  <NavLink
                    to='/search'
                    className='searchbutton cursor-pointer p-3 flex flex-row items-center ease-in-out duration-300 opacity-80 hover:opacity-100'
                    style={ NavLinkStyle }
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <h1 className='ml-5 mt-1'>Search</h1>
                  </NavLink>
                </ul>
              </div>

              <div className='h-screen bg-black-1 rounded-xl mt-2 flex flex-col'>
                <div className='mt-6 ml-6 font-scbb flex flex-row items-center'>
                  <div className='cursor-pointer opacity-80 ease-in-out duration-300 hover:opacity-100 flex flex-row gap-5 items-center'>
                    <FontAwesomeIcon icon={faLinesLeaning} size='xl'/>
                    <h1 className='block text-l'>Your Library</h1>
                  </div>
                  <div className='hidden sm:block sm:absolute sm:right-10 cursor-pointer opacity-80 ease-in-out duration-300 hover:opacity-100'>
                    <a href="#"><FontAwesomeIcon icon={faPlus} /></a>
                  </div>
                </div>

                <div className='mt-5 mb-5 ml-3 flex flex-row items-center gap-2 '>
                  <div className='cursor-not-allowed w-1/3 p-1 font-scbb rounded-full flex items-center justify-center bg-[#232323] hover:bg-white hover:text-black'>
                    <h1 className='text-sm opacity-95'>Playlists</h1>
                  </div>
                  <div className='cursor-not-allowed w-1/3 p-1 font-scbb rounded-full flex items-center justify-center bg-[#232323] hover:bg-white hover:text-black'>
                    <h1 className='text-sm opacity-95'>Artists</h1>
                  </div>
                </div>

                {
                  _favorite != null && (
                    <div>
                      {
                        _favorite.map((curr) => (
                          <div
                            key={curr.id}
                            className='cursor-pointer m-2 rounded-md p-1 flex flex-row items-center hover:bg-black-2'
                            onClick={() => {
                              navigate(`/album/${curr.id}`, { state: curr.state })
                            }}
                          >
                            <img src={curr.images} alt="" className='aspect-square w-14 mr-3 rounded-lg'/>
                            <div>
                              <h1 className='mb-1 line-clamp-1'>{curr.name}</h1>
                              <h2 className='opacity-80 font-scbk text-sm line-clamp-1'>Playlists • {JSON.parse(localStorage.getItem('whoislogin'))?.name}</h2>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
                }

              </div>
            </div>
          ) : (
            <div className='fixed w-[3rem] opacity-80 h-screen'>
              <div className='flex items-center justify-center p-3'>
                <FontAwesomeIcon icon={faBars} size='xl' onClick={ () => setMenu(true) }/>
              </div>
              <div className='flex items-center justify-center p-3'>
                <FontAwesomeIcon icon={faHouse} size='1x' />
              </div>
              <div className='flex items-center justify-center p-3'>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='1x' />
              </div>
              <div className='flex items-center justify-center p-3'>
                <FontAwesomeIcon icon={faLinesLeaning} size='1x' />
              </div>

              {
                menu == true && (
                  <div className='fixed z-[9999] top-0 left-0 w-full h-full bg-black flex items-center justify-center'>
                    <div className='absolute top-5 left-5 flex items-center justify-center p-3'>
                      <FontAwesomeIcon icon={faX} size='xl' onClick={ () => setMenu(false) }/>
                    </div>

                    <div className=''>
                      <ul className='text-l'>
                        <li className='cursor-pointer p-3 opacity-80 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                          <FontAwesomeIcon icon={faHouse} />
                          <h1 className='ml-5 mt-2' onClick={() => navigate('/')}>Home</h1>
                        </li>
                        <li className='cursor-pointer p-3 opacity-80 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                          <h1 className='ml-5 mt-1' onClick={() => navigate('/search')}>Search</h1>
                        </li>
                        <div className='cursor-pointer p-3 opacity-80 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                          <FontAwesomeIcon icon={faLinesLeaning} size='lg'/>
                          <h1 className='ml-5 mt-1'>Your Library</h1>
                        </div>
                      </ul>
                    </div>
                  </div>
                )
              }

              {
                _favorite != null && (
                  <div>
                    {
                      _favorite.map((curr) => (
                        <div
                          key={curr.id}
                          className='cursor-pointer m-2 rounded-md p-1 flex flex-row items-center hover:bg-black-2'
                          onClick={() => {
                            navigate(`/album/${curr.id}`, { state: curr.state })
                          }}
                        >
                          <img src={curr.images} alt="" className='aspect-square w-14 mr-3 rounded-lg'/>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          )
        }
      </div>
      <Outlet />
    </>
  )
}
