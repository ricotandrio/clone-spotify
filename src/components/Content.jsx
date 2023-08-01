import React, { useState, useEffect } from 'react'
import SongData from '../../public/data.jsx'
import SongSection from './SongSection.jsx';
import '../index.css'

export default function Content() {
  const [countWidth, setCountWidth] = useState(screen.width >= '640' ? 4 : 3);

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
      <div className='relative w-full h-full '>
        <div className='relative bg-gradient-to-b from-innerBlack to-lighterBlack w-full sm:w-3/4 ml-[3rem] sm:ml-[20rem] text-white font-sbbs'>
          <SongSection data={SongData} title='Focus' start='0' end={0 + countWidth} />
          <SongSection data={SongData} title='Your Playlist' start='0' end={0 + countWidth} />
        </div>

      </div>

    </>
  )
}

