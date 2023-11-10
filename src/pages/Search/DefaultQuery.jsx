import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import banners from '../../data/banners';
import { UserContext } from '../../context/UserContext';

import '../../assets/index.css';

export default function DefaultQuery() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  return (
    <>
      <div className='w-full text-white'>
        <h1 className='pl-5 pt-5 text-2xl'>Browse All</h1>
        <div className='w-full flex flex-row flex-wrap p-2'>
          {
            banners.map((banner) => (
              <div
                key={banner.index}
                className='overflow-hidden relative cursor-pointer w-[22%] aspect-square m-2 rounded-lg'
                style={{backgroundColor: banner.color}}
                onClick={() => {
                  if(login == "true"){
                    navigate(`/search/${encodeURIComponent(banner.name)}`)
                  }
                }}
              >
                <h1 className='text-xl pl-5 pt-5 line-clamp-1'>{ banner.name }</h1>
                <img src={banner.images} className='relative w-1/2 rotate-12 left-20 top-10 sm:left-32 sm:top-16 shadow-black shadow-2xl' alt={banner.name} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
