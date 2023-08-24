import React from 'react'
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import '../../index.css';

export default function SearchWQuery({ _tracksdata }) {
  const { query } = useParams();
  console.log(query);

  console.log(_tracksdata);

  return (
    <>
      <div className='w-full text-white'>
        <div className='w-full'>
          <div>
            <h1 className='text-xl pl-3 pt-3'>Result for query { query }</h1>
          </div>
          <div>
            {
              _tracksdata.data
              .filter((track) => track.title.toLowerCase().includes(query.toLowerCase()))
              .map((track) => (
                <div key={track.id}
                  className='relative flex flex-row items-center h-14 gap-2 m-2 ml-5 mr-5 bg-lighterBlack hover:bg-[#282828]'
                >
                  <div className='absolute w-10 left-2 p-2 bg-[#00000080] aspect-square flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer'>
                    <FontAwesomeIcon icon={faPlay} size='lg' className='text-white opacity-100'/>
                  </div>
                  <div className='w-14 p-2 aspect-square'>
                    <img src={track.track_img} alt={track.track_img} className=''/>
                  </div>
                  <div className='w-1/2'>
                    <h1 className='font-scbk text-md cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit'>{track.title}</h1>
                    <h2 className='font-scbk text-sm opacity-80 cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit'>{track.artists}</h2>
                  </div>

                  <div className='w-1/4 text-sm opacity-80 font-scbk cursor-pointer underline underline-offset-2 decoration-transparent hover:decoration-inherit'>
                    {track.album_name}
                  </div>

                  <div className='text-sm opacity-80 font-scbk'>
                    {track.duration}
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </>
  )
}
