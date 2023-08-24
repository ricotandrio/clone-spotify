import React from 'react'

import '../src/index.css';

const banners = [
  {
    'index': 1,
    'name': 'Podcasts',
    'color': '#E13300',
  },
  {
    'index': 2,
    'name': 'Live Events',
    'color': '#7358FF',
  },
  {
    'index': 3,
    'name': 'Made For You',
    'color': '#1E3264',
  },
  {
    'index': 4,
    'name': 'News releases',
    'color': '#E8115B',
  },
  {
    'index': 5,
    'name': 'Psop',
    'color': '#148A08',
  },
  {
    'index': 6,
    'name': 'Podscasts',
    'color': '#E13300',
  },
  {
    'index': 7,
    'name': 'Livse Events',
    'color': '#7358FF',
  },
  {
    'index': 8,
    'name': 'Mades For You',
    'color': '#1E3264',
  },
  {
    'index': 9,
    'name': 'Nesw releases',
    'color': '#E8115B',
  },
  {
    'index': 10,
    'name': 'New realeases',
    'color': '#E8115B',
  },
  {
    'index': 11,
    'name': 'Poap',
    'color': '#148A08',
  }
];

export default function DefaultQuery() {

  return (
    <>
      <div className='w-full text-white'>
        <h1 className='pl-5 pt-5 text-2xl'>Browse All</h1>
        <div className='w-full flex flex-row flex-wrap p-2'>
          {
            banners.map((banner) => (
              <div key={banner.index} className='cursor-pointer w-[23%] aspect-square m-2 rounded-lg' style={{backgroundColor: banner.color}}>
                <h1 className='text-xl pl-5 pt-5'>{ banner.name }</h1>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
