import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

import '../assets/index.css';

UserOption.propTypes = {
  _setProfileVisible: PropTypes.func.isRequired,
}

export default function UserOption({_setProfileVisible}) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    return signOut(auth)
    .then(() => {
      console.log('Signed Out');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => {
      console.error('Sign Out Error', error);
    })
  }

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
            onClick={ handleSignOut }
          >
            Log out
          </li>
        </ul>
      </div>
    </>
  )
}

