import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from '../components/Sidebar.jsx'
import Content from '../components/Content.jsx'
import UserOption from './UserOption.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faUser, faPlay, faHeart, faClock, faCircle } from '@fortawesome/free-solid-svg-icons';

import '../index.css';
import PopupPlay from './PopupPlay.jsx';
import Footer from '../components/Footer.jsx';
import { convertMsToMMSS } from '../../reusable/ConvertMMSS.jsx';
import Loading from '../../reusable/Loading.jsx';

export default function Playlist({ _songdata }) {
  const { name } = useParams();
  const [album, setAlbum] = useState(_songdata[0].contents[0]);

  const [playlist, setPlaylist] = useState();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Sidebar/>
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <nav className='relative bg-gradient-to-b from-[#484848] to-black w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center'>
            <FontAwesomeIcon icon={faChevronLeft} className='cursor-not-allowed p-3 rounded-full pr-9' />
            <FontAwesomeIcon icon={faChevronRight} className='cursor-not-allowed p-3 rounded-full'/>
          </div>
          <div className='flex flex-row p-2 pb-5'>
            <section className='w-1/4 aspect-square ml-3 mt-3 shadow-black shadow-xl'>
              <img src={album.image} alt="<album_name>" className='w-full h-full' />
            </section>
            <section className='p-2 ml-5 w-[68%]'>
              <h2 className='pt-16 font-scbk'>Playlist</h2>
              <h1 className='text-6xl mb-6'>{album.name}</h1>
              <p className='text-sm opacity-80 line-clamp-4 text-justify'>{album.desc}</p>
            </section>
          </div>
        </nav>

        <main className='bg-black-1 w-full pb-10'>
          <section className='w-full pl-5 pt-3 pb-3 flex flex-row items-center gap-8'>
            <div className='cursor-pointer w-14 flex items-center justify-center aspect-square rounded-full bg-green hover:scale-105 hover:opacity-90'>
              <FontAwesomeIcon icon={faPlay} size='lg' className='text-black'/>
            </div>
            <div className='cursor-pointer hover:scale-105 hover:opacity-90'>
              <FontAwesomeIcon icon={faHeart} size='2xl' className='text-white hover:text-red-500'/>
            </div>
          </section>

          <section className='pb-5 mt-5 flex flex-col items-center'>
            <table className='border-b w-[96%] p-3 opacity-80 mb-2'>
              <tr className='font-scl text-sm'>
                <th className='pb-2 w-[5%] text-center'>#</th>
                <th className='pb-2 w-[30%] text-left'>Title</th>
                <th className='pb-2 w-[30%] text-left'>Album</th>
                <th className='pb-2 w-[20%] text-left'>Data Added</th>
                <th className='pb-2 w-[15%] text-left pl-9'><FontAwesomeIcon icon={faClock}/></th>
              </tr>
            </table>
            { isLoading == true && ( <Loading /> ) }

            {
              isLoading == false && (
                <div className='w-[97%]'>{
                  album.tracks.map((track) => (
                    <div
                      className='group cursor-pointer w-[96%] flex flex-row m-1 p-2 items-center hover:bg-black-3'
                      onClick={() => console.log('onclick send preview url to router to make song played')}
                    >
                      <div className='w-[3%] flex items-center justify-center mr-2'>
                        <h1 className='group-hover:hidden opacity-80'>1</h1>
                        <FontAwesomeIcon icon={faPlay} className='hidden group-hover:block' />
                      </div>
                      <div className='w-[30%] flex flex-row items-center'>
                        <img src={track.track_img} alt="" className='w-[15%] aspect-square mr-3' />
                        <div>
                          <h1 className='underline underline-offset-2 decoration-transparent cursor-pointer hover:decoration-current font-scbk'>{track.title}</h1>
                          <p className='underline underline-offset-2 decoration-transparent cursor-pointer hover:decoration-current opacity-80 text-sm font-scbk'>{track.artists}</p>
                        </div>
                      </div>
                      <div className='w-[30%]'>
                        <h1 className='text-sm line-clamp-1 underline underline-offset-2 decoration-transparent cursor-pointer hover:decoration-current opacity-80 pl-3 font-scbk'>
                          {track.album_name}
                        </h1>
                      </div>
                      <div className='w-[22%]'>
                        <h1 className='font-scbk line-clamp-1 text-sm opacity-80 pl-4'>
                          {track.artists}
                        </h1>
                      </div>
                      <div className='w-[15%] pl-3 opacity-80 font-scbk text-sm text-center'>
                        {convertMsToMMSS(track.duration)}
                      </div>
                    </div>
                  ))
                }</div>
              )
            }
          </section>
        </main>
        <Footer />
      </div>
      <PopupPlay/>
    </>
  )
}
