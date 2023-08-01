import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faPlus, faLinesLeaning, faBars, faX } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  const [width, setWidth] = useState(screen.width);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(screen.width);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <div style={{position: 'Relative', zIndex: '999',}}>
      {
        width >= '640' ? (
          <div className='fixed w-1/4 h-screen p-2 z-10'>
            <div className='h-1/5 p-2 pl-6 flex flex-col justify-center rounded-xl bg-lighterBlack'>
              <ul className='text-l'>
                <li className='cursor-pointer p-3 opacity-90 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                  <FontAwesomeIcon icon={faHouse} />
                  <h1 className='ml-5 mt-1'>Home</h1>
                </li>
                <li className='cursor-pointer p-3 opacity-90 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <h1 className='ml-5 mt-1'>Search</h1>
                </li>
              </ul>
            </div>

            <div className='h-screen bg-lighterBlack rounded-xl mt-2 flex flex-col'>
              <div className='mt-6 ml-6 font-scbb flex flex-row items-center'>
                <div className='cursor-pointer opacity-90 ease-in-out duration-300 hover:opacity-100 flex flex-row gap-5 items-center'>
                  <FontAwesomeIcon icon={faLinesLeaning} size='xl'/>
                  <h1 className='block text-l'>Your Library</h1>
                </div>
                <div className='hidden sm:block sm:absolute sm:right-10 cursor-pointer opacity-90 ease-in-out duration-300 hover:opacity-100'>
                  <a href="#"><FontAwesomeIcon icon={faPlus} /></a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='fixed w-[3rem] opacity-90 h-screen'>
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
                      <li className='cursor-pointer p-3 opacity-90 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                        <FontAwesomeIcon icon={faHouse} />
                        <h1 className='ml-5 mt-2'>Home</h1>
                      </li>
                      <li className='cursor-pointer p-3 opacity-90 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <h1 className='ml-5 mt-1'>Search</h1>
                      </li>
                      <div className='cursor-pointer p-3 opacity-90 flex flex-row items-center ease-in-out duration-300 hover:opacity-100'>
                        <FontAwesomeIcon icon={faLinesLeaning} size='lg'/>
                        <h1 className='ml-5 mt-1'>Your Library</h1>
                      </div>
                    </ul>
                  </div>
                </div>
              )
            }
          </div>

        )
      }
    </div>
  )
}
