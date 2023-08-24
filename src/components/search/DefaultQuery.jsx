import React from 'react'

import '../../index.css';

const banners = [
  {
    'name': 'Podcasts',
    'color': '#E13300',
  },
  {
    'name': 'Live Events',
    'color': '#7358FF',
  },
  {
    'name': 'Made For You',
    'color': '#1E3264',
  },
  {
    'name': 'New releases',
    'color': '#E8115B',
  },
  {
    'name': 'Pop',
    'color': '#148A08',
  },
  {
    'name': 'Podcasts',
    'color': '#E13300',
  },
  {
    'name': 'Live Events',
    'color': '#7358FF',
  },
  {
    'name': 'Made For You',
    'color': '#1E3264',
  },
  {
    'name': 'New releases',
    'color': '#E8115B',
  },
  {
    'name': 'New releases',
    'color': '#E8115B',
  },
  {
    'name': 'Pop',
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
              <div key={banner.name} className='cursor-pointer w-[23%] aspect-square m-2 rounded-lg' style={{backgroundColor: banner.color}}>
                <h1 className='text-xl pl-5 pt-5'>{ banner.name }</h1>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
