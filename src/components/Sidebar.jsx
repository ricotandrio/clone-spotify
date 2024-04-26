import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from '@src/contexts/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faPlus, faLinesLeaning, faBars, faX } from '@fortawesome/free-solid-svg-icons';

import '@src/assets/global.css';
import AudioControllerBar from '@src/components/AudioControllerBar';

const Sidebar = ({ _favorite }) => {
  const [width, setWidth] = useState(screen.width);
  const [menu, setMenu] = useState(false);
  const [filterBar, setFilterBar] = useState("ALL");
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Sdf");

  const { db, authUser } = useContext(UserContext);
  
  useEffect(() => {
    const updateWidth = () => {
      setWidth(screen.width);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [location.pathname])

  const NavLinkStyle = ({ isActive }) => {
    return {
      opacity: isActive ? 1 : 0.8,
    }
  }

  const renderAudioControllerBar = useCallback(() => {
    return (
      <AudioControllerBar />
    )
  }, []);

  return (
    <>
      { renderAudioControllerBar() }
      <div className='flex h-screen'>
        {
          width >= '640' ? (
            <div className='w-1/4 h-screen p-2 z-10 rounded-b-md overflow-y-auto hide-scrollbar'>
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

              <div className='h-screen relative bg-black-1 rounded-xl mt-2 flex flex-col'>
                <div className='mt-6 ml-6 font-scbb flex flex-row items-center'>
                  <div className='cursor-pointer opacity-80 ease-in-out duration-300 hover:opacity-100 flex flex-row gap-5 items-center'>
                    <FontAwesomeIcon icon={faLinesLeaning} size='xl'/>
                    <h1 className='block text-l'>Your Library</h1>
                  </div>
                  <div className='hidden sm:block sm:absolute sm:right-10 cursor-pointer opacity-80 ease-in-out duration-300 hover:opacity-100'>
                    <a href=""><FontAwesomeIcon icon={faPlus} /></a>
                  </div>
                </div>

                <div className='mt-5 mb-5 ml-3 flex flex-row items-center gap-2 '>
                  <div
                    className='cursor-pointer w-1/3 p-1 font-scbb rounded-full flex items-center justify-center bg-[#232323] hover:bg-white hover:text-black'
                    onClick={() => {
                      if(authUser) setFilterBar("PLAYLISTS");
                    }}
                    style={{
                      backgroundColor: filterBar == "PLAYLISTS" ? "white" : "black",
                      color: filterBar == "PLAYLISTS" ? "black" : "white",
                    }}
                  >
                    <h1 className='text-sm opacity-95'>Playlists</h1>
                  </div>
                  <div
                    className='cursor-pointer w-1/3 p-1 font-scbb rounded-full flex items-center justify-center bg-[#232323]'
                    onClick={() => {
                      if(authUser) setFilterBar("ARTISTS");
                    }}
                    style={{
                      backgroundColor: filterBar == "ARTISTS" ? "white" : "black",
                      color: filterBar == "ARTISTS" ? "black" : "white",
                    }}
                  >
                    <h1 className='text-sm opacity-95'>Artists</h1>
                  </div>
                  <div
                    className='cursor-pointer w-7 aspect-square p-1 font-scbb rounded-full flex items-center justify-center text-center text-black bg-white hover:scale-105'
                    onClick={() => {
                      setFilterBar("ALL");
                    }}
                    style={{
                      display: filterBar == "ALL" ? "none" : "block",
                    }}
                  >
                    <h1 className='text-sm opacity-95'>X</h1>
                  </div>
                </div>

                {
                  db && (
                    <div>
                      {
                        db?.user_library?.filter((curr) => {
                          if(filterBar == "ALL"){
                            return curr;
                          } else if(filterBar == "PLAYLISTS"){
                            if(curr.page == "album"){
                              return curr;
                            }
                          } else if(filterBar == "ARTISTS"){
                            if(curr.page == "artist"){
                              return curr;
                            }
                          }
                        })
                        .map((curr) => (
                          <div
                            key={curr.id}
                            className='cursor-pointer m-2 rounded-md p-1 flex flex-row items-center hover:bg-black-2'
                            onClick={() => {
                              if(curr.page == "album"){
                                navigate(`/album/${curr.id}`, { state: curr.state });
                              } else {
                                navigate(`/artist/${curr.id}`);
                              }
                            }}
                          >
                            <img
                              alt=""
                              src={curr.images}
                              className='aspect-square w-14 mr-3'
                              style={{
                                borderRadius: curr.page == "album" ? "20%" : "50%",
                              }}
                            />
                            <div>
                              <h1 className='mb-1 line-clamp-1'>{curr.name}</h1>
                              {
                                curr.page == "album" && (
                                  <h2 className='opacity-80 font-scbk text-sm line-clamp-1'>Playlists • {db?.name}</h2>
                                )
                              }
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
            <div className='fixed w-[3rem] opacity-80 h-screen overflow-y-auto hide-scrollbar'>
              <div className='flex items-center justify-center p-3'>
                <FontAwesomeIcon icon={faBars} size='xl' onClick={ () => setMenu(true) }/>
              </div>
              <div className='flex items-center justify-center p-3'>
                <FontAwesomeIcon icon={faHouse} size='1x' onClick={ () => setMenu(true) } />
              </div>
              <div className='flex items-center justify-center p-3'>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='1x' onClick={ () => setMenu(true) } />
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
                        <NavLink to='/' style={NavLinkStyle} className='cursor-pointer p-3 opacity-80 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                          <FontAwesomeIcon icon={faHouse} />
                          <h1 className='ml-5 mt-2'>Home</h1>
                        </NavLink>
                        <NavLink to='/search' style={NavLinkStyle} className='cursor-pointer p-3 opacity-80 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                          <h1 className='ml-5 mt-1'>Search</h1>
                        </NavLink>
                        <div className='cursor-pointer p-3 opacity-80 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                          <FontAwesomeIcon icon={faLinesLeaning} size='lg'/>
                          <h1 className='ml-5 mt-1'>Your Library </h1>
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
          <div className='overflow-y-auto flex-1 relative overflow-x-hidden'>
            <Outlet />
          </div>
      </div>
    </>
  )
}

Sidebar.propTypes = {
  _favorite: PropTypes.array,
}

export default Sidebar;
