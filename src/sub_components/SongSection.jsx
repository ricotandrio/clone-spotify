import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import '../index.css';

SongSection.propTypes = {
  data: PropTypes.array.isRequired,
  playlists_name: PropTypes.string.isRequired
}

export default function SongSection({data: arrayOfData, playlists_name}) {
  const navigate = useNavigate();

  return (
    <>
      <Link to='/404'>
        <h1 className='opacity-80 text-white pl-6 pt-8 text-3xl ease-in-out duration-300 cursor-pointer inline-block hover:underline hover:underline-offset-8'>
          { playlists_name }
        </h1>
      </Link>
      <div className='w-full pl-5 mt-5 pb-3 flex flex-row flex-wrap items-center justify-start gap-2 pr-5 overflow-hidden'>
        {
          arrayOfData.map((prop) => (
            <div
              key={ prop.id }
              className=' group/button relative cursor-pointer w-[31%] sm:w-[24%] bg-innerBlack flex flex-col items-center p-3 rounded-xl ease-in-out duration-300hover:bg-black-3'
              onClick={() => {
                navigate(`/album/${encodeURIComponent(prop.id)}`);
              }}
            >

              <div className='w-full  shadow-white drop-shadow-lg'>
                <img src={ prop.images[0].url } alt={ prop.name } className='w-full h-full relative rounded-lg' />
              </div>
                <div className='w-48 pt-2 pl-2 sm:pl-0'>
                <h1 className='pt-2'>{ prop.name }</h1>
                <p className='line-clamp-2 opacity-80 text-sm pt-2 font-scbk'>{ prop.description }</p>
              </div>

              <div
                className='absolute w-12 h-12 bg-darkerGreen flex items-center justify-center rounded-full p-5 bottom-[6rem] right-[1.5rem] opacity-0 ease-linear duration-300
                hover:z-[5] hover:bg-green hover:opacity-80 hover:scale-110
                group-hover/button:bottom-[7rem] group-hover/button:opacity-100'
              >
                <FontAwesomeIcon icon={faPlay} color='black' size='lg'/>
              </div>

            </div>
          ))
        }
      </div>

    </>
  )
}

