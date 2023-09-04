import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from '../context/UserContext';

import '../index.css';

UserOption.propTypes = {
  _setProfileVisible: PropTypes.func.isRequired,
}

export default function UserOption({_setProfileVisible}) {
  const navigate = useNavigate();
  const { setLogin } = useContext(UserContext);

  return (
    <>
      <div className='absolute w-1/5 bg-black top-20 z-30 right-5'>
        <ul className='text-white p-1 font-scbk'>
          <li className='p-2 opacity-80 bg-black-3 cursor-not-allowed'>Account</li>
          <li
            className='p-2 opacity-80 bg-black-3 hover:opacity-100 hover:bg-[#3E3E3E] cursor-pointer'
            onClick={() => {
              _setProfileVisible(false);
              navigate('/profile');
            }}
          >
            Profile
          </li>
          <li className='p-2 opacity-80 bg-black-3 cursor-not-allowed'>Premium</li>
          <li className='p-2 opacity-80 bg-black-3 cursor-not-allowed'>Support</li>
          <li className='p-2 opacity-80 bg-black-3 cursor-not-allowed'>Download</li>
          <li className='p-2 opacity-80 bg-black-3 cursor-not-allowed'>Settings</li>
          <li
            className='p-2 opacity-80 bg-black-3 hover:opacity-100 hover:bg-[#3E3E3E] cursor-pointer'
            onClick={() => {
              _setProfileVisible(false);
              localStorage.setItem('login', JSON.stringify({"status": "false", }));
              localStorage.setItem('whoislogin', JSON.stringify({ }));
              setLogin("false");
              navigate('/');
              window.location.reload();
            }}
          >
            Log out
          </li>
        </ul>
      </div>
    </>
  )
}

