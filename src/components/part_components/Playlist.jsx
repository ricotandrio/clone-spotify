import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from '../Sidebar.jsx'
import Content from '../Content.jsx'
import UserOption from '../part_components/UserOption.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';

import '../../index.css';
import PopupPlay from '../part_components/PopupPlay.jsx';

export default function Playlist({ _songdata }) {
  const { name } = useParams();
  const [album, setAlbum] = useState(_songdata[0].contents[0]);

  return (
    <>
      <Sidebar/>
      <div className='relative w-full sm:w-3/4 h-full pt-2 pr-2 ml-[3rem] sm:ml-[20rem] top-0'>
        <nav className='relative bg-lighterBlack w-full h-22 pt-2 rounded-t-xl'>
          <div className='w-full h-16 pl-8 pr-2 pb-2 flex items-center'>
            <FontAwesomeIcon icon={faChevronLeft} className='cursor-not-allowed p-3 rounded-full pr-9' />
            <FontAwesomeIcon icon={faChevronRight} className='cursor-not-allowed p-3 rounded-full'/>
          </div>
          <div>
            <div>
              <img src={album.image} alt="" />
            </div>
            <div>
              <h2>Playlist</h2>
              <h1>{album.name}</h1>
              <p>{album.desc}</p>
            </div>
          </div>
        </nav>

        <main>

        </main>
      </div>

      {/* <PopupPlay/> */}
    </>
  )
}
