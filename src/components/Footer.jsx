import Twitter from '../assets/uil_twitter.png';
import Facebook from '../assets/ic_twotone-facebook.png';
import Instagram from '../assets/bi_instagram.png';

import '../index.css'

export default function Footer() {
  return (
    <>
      <footer className='pb-32 p-2 mt-20'>
        <div className='p-2 flex flex-row items-start justify-between'>
          <div className='p-2'>
            <h1 className='mb-2'>Company</h1>
            <ul className='font-scbk opacity-80'>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">About</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">Jobs</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">For the Record</a></li>
            </ul>
          </div>
          <div>
            <h1 className='mb-2'>Communities</h1>
            <ul className='font-scbk opacity-80'>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">For Artists</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">Developer</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">Advertising</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">Investors</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">Vendors</a></li>
            </ul>
          </div>
          <div>
            <h1 className='mb-2'>Useful links</h1>
            <ul className='font-scbk opacity-80'>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">Supports</a></li>
              <li className='mb-2 ease-in-out duration-300 hover:underline'><a href="/error">Free Mobile App</a></li>
            </ul>
          </div>
          <div className='flex flex-row gap-4'>
            <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-1 cursor-pointer'>
              <a href="https://www.instagram.com/spotify/" target='_blank' rel='noreferrer' className='w-full'>
                <img src={Instagram} alt="instagram" className='w-full h-full' />
              </a>
            </div>
            <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-1 cursor-pointer'>
              <a href="https://twitter.com/spotify" target='_blank'  rel='noreferrer' className='w-full'>
                <img src={Twitter} alt="twitter" className='w-full h-full' />
              </a>
            </div>
            <div className='p-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-1 cursor-pointer'>
              <a href="https://www.facebook.com/Spotify" target='_blank'  rel='noreferrer' className='w-full'>
                <img src={Facebook} alt="facebook" className='w-full h-full' />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-center p-4'>
            <div className='border-b border-gray-1 w-full'></div>
          </div>
          <h1 className='mt-5 ml-4 opacity-80 font-scbk'>© 2023 Spotify AB</h1>
        </div>
      </footer>
    </>
  )
}

