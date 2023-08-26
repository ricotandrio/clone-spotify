import banners from '../public/banners';

import '../src/index.css';

export default function DefaultQuery() {

  return (
    <>
      <div className='w-full text-white'>
        <h1 className='pl-5 pt-5 text-2xl'>Browse All</h1>
        <div className='w-full flex flex-row flex-wrap p-2'>
          {
            banners.map((banner) => (
              <div key={banner.index} className='overflow-hidden relative cursor-pointer w-[23%] aspect-square m-2 rounded-lg' style={{backgroundColor: banner.color}}>
                <h1 className='text-xl pl-5 pt-5'>{ banner.name }</h1>
                <img src={banner.images} className='relative w-1/2 rotate-12 left-32 top-16 shadow-black shadow-2xl' alt={banner.name} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
