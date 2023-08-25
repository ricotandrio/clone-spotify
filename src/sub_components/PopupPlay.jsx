import React from 'react'

import '../index.css';

const _tracks = [
  {
    "id": 1,
    "title": "Shape of You",
    "artists": "Ed Sheeran",
    "track_img": "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
    "album_name": "÷ (Deluxe)",
    "duration": "3:53"
  },
  {
    "id": 2,
    "title": "Eight",
    "artists": "IU",
    "track_img": "https://i.scdn.co/image/ab67616d00001e02c63be04ae902b1da7a54d247",
    "album_name": "eight",
    "duration": "2:47"
  },
  {
    "id": 3,
    "title": "Tulus",
    "artists": "Sepatu",
    "track_img": "https://i.scdn.co/image/ab67616d0000b2737c52c7f7d1da8625e4376795",
    "album_name": "Gajah",
    "duration": "3:39"
  }
]

export default function PopupPlay() {

  return (
    <>
      <div className='fixed bottom-0 z-[999] w-full h-[14%] bg-black'>
        <div>PopupPlay</div>

      </div>
    </>
  )
}
