import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserOption(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className='absolute w-1/5 bg-black top-20 z-30 right-5'>
        <ul className='text-white p-1 font-scbk'>
          <li className='p-2 opacity-80 bg-[#282828] hover:opacity-100 hover:bg-[#3E3E3E]'>Account</li>
          <li
            className='p-2 opacity-80 bg-[#282828] hover:opacity-100 hover:bg-[#3E3E3E] cursor-pointer'
            onClick={() => {
              props._setProfileVisible(false);
              navigate('/profile');
            }}
          >
            Profile
          </li>
          <li className='p-2 opacity-80 bg-[#282828] hover:opacity-100 hover:bg-[#3E3E3E]'>Premium</li>
          <li className='p-2 opacity-80 bg-[#282828] hover:opacity-100 hover:bg-[#3E3E3E]'>Suportt</li>
          <li className='p-2 opacity-80 bg-[#282828] hover:opacity-100 hover:bg-[#3E3E3E]'>Download</li>
          <li className='p-2 opacity-80 bg-[#282828] hover:opacity-100 hover:bg-[#3E3E3E]'>Settings</li>
          <li
            className='p-2 opacity-80 bg-[#282828] hover:opacity-100 hover:bg-[#3E3E3E] cursor-pointer'
            onClick={() => {
              props._setProfileVisible(false);
              localStorage.setItem('login', JSON.stringify({"status": "false", }));
              localStorage.setItem('whoislogin', JSON.stringify({ }));
              navigate('/');
            }}
          >
            Log out
          </li>
        </ul>
      </div>
    </>
  )
}
