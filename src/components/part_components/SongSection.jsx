import React from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import '../../index.css';

export default function SongSection(props) {

  const numOfShowing = parseInt(props.show);
  const arrayOfData = props.data;
  // console.log(arrayOfData)
  return (
    <>
      <Link to='/404'>
        <h1 className='opacity-80 text-white pl-6 pt-8 text-3xl ease-in-out duration-300 cursor-pointer inline-block hover:underline hover:underline-offset-8'>
          { arrayOfData.name }
        </h1>
      </Link>
      <div className='w-full pl-5 mt-5 pb-3 flex flex-row items-center justify-center gap-3 pr-5 overflow-hidden'>
        {
          arrayOfData.contents.slice(0, numOfShowing).map((prop) => (
            <div key={ prop.key }
              className='relative cursor-pointer w-1/3 sm:w-1/4 bg-innerBlack flex flex-col items-center p-4 rounded-xl ease-in-out duration-300
              hover:bg-[#282828] group/button'
            >

              <div className='w-full  shadow-white drop-shadow-lg'>
                <img src={ prop.image } alt={ prop.name } className='w-full h-full relative rounded-lg' />
              </div>
                <div className='w-48 pt-2 pl-2 sm:pl-0'>
                <h1 className='pt-2'>{ prop.name }</h1>
                <p className='line-clamp-2 opacity-80 text-sm pt-2 font-scbk'>{ prop.desc }</p>
              </div>
              {
                <div
                  className='absolute w-12 h-12 bg-darkerGreen flex items-center justify-center rounded-full p-5 ease-linear duration-300 bottom-[6rem] right-[1.5rem] opacity-0
                  hover:z-[5] hover:bg-green hover:opacity-80 hover:scale-110
                  group-hover/button:bottom-[7rem] group-hover/button:opacity-100'
                >
                  <FontAwesomeIcon icon={faPlay} color='black' size='lg'/>
                </div>
              }
            </div>
          ))
        }
      </div>


    </>
  )
}

