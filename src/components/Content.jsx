import React, { useState, useEffect } from 'react';
import SongSection from './part_components/SongSection.jsx';
import PropTypes from 'prop-types';

import Footer from './Footer.jsx';

import '../index.css';

export default function Content({_songdata}) {
  const [countWidth, setCountWidth] = useState(screen.width >= '640' ? 4 : 3);
  const [songDatas, setSongDatas] = useState(_songdata);

  useEffect(() => {
    const updateWidth = () => {
      screen.width >= '640' ? setCountWidth(4) : setCountWidth(3);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <>
      <div className='relative w-full h-full'>
        <div className='relative bg-gradient-to-b from-innerBlack to-lighterBlack w-full sm:w-3/4 ml-[3rem] sm:ml-[20rem] text-white font-sbbs'>
          <SongSection data={songDatas[0]} title='Focus' show={ countWidth } />
          <SongSection data={songDatas[1]} title='Your Playlist' show={ countWidth } />
          <Footer/>
        </div>
      </div>
    </>
  )
}

Content.propTypes = {
  _songdata: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      contents: PropTypes.array.isRequired
    })
  ).isRequired
}
