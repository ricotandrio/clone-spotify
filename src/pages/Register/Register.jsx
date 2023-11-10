import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { auth, mydb } from '../../config/firebase.jsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import spotify_black from '../../assets/images/Spotify_Logo_CMYK_Black.png';
import Loading from '../../components/Loading.jsx';

import { UserContext } from '../../context/UserContext.jsx';

import '../../assets/index.css';
import { doc, setDoc } from 'firebase/firestore';

Register.propTypes = {
  _userdata: PropTypes.object,
}

export default function Register({_userdata: users}) {
  const navigate = useNavigate();

  const [passwordType, setpasswordType] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  // form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  // warning
  const [emailwarning, setemailWarning] = useState('');
  const [passwordwarning, setpasswordWarning] = useState('');
  const [namewarning, setnameWarning] = useState('');

  // load
  const [isProgress, setProgress] = useState(false);

  const updateAccount = async (userId) => {

    const date = new Date(year, month - 1, day);
    
    await setDoc(doc(mydb, "account", userId), {
      top_artists: [
        // {
        //   "artists_img": "https://i.scdn.co/image/ab6761610000e5eb9e690225ad4445530612ccc9",
        //   "name": "Ed Sheeran",
        //   "spotify_id": "6eUK  ZXaKkcviH0Ku9w2n3V"
        // }
      ],
      top_tracks: [
        // {
        //   "album_name": "÷ (Deluxe)",
        //   "artists": "Ed Sheeran",
        //   "duration": "3:53",
        //   "spotify_id": "7qiZfU4dY1lWllzX7mPBI3",
        //   "title": "Shape of You",
        //   "track_img": "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96"
        // }
      ],
      dob: date,
      email,
      name,
      user_playlists: [""]
    }, {
      capital: true
    }, {
      merge: true
    })

  }

  const handleCreateAccount = (email, password) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        // console.log(userCredential?.user?.reloadUserInfo?.localId);

        updateAccount(userCredential?.user?.reloadUserInfo?.localId);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      })
  }

  const { authUser } = useContext(UserContext);

  if(authUser){
    return (
      <>
        <div className='bg-white w-full min-h-[100vh] xl:h-full pb-20 text-black'>
          <Link to='/' className='border-black p-8 flex items-center justify-center'>
            <img src={spotify_black} alt="spotify logo" className='w-32' />
          </Link>
          <div className='border-black p-8 flex items-center flex-col justify-center text-black'>
            <h1 className='text-3xl font-scb'>Already Login.</h1>
            <Link to='/' className='p-2 w-[15%] rounded-full text-black flex justify-center items-center bg-white mt-6 hover:bg-black hover:text-white'>
              HOME
            </Link>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='bg-white w-full xl:h-full pb-20 text-black'>
          <Link to='/' className='border-black p-8 flex items-center justify-center'>
            <img src={spotify_black} alt="spotify logo" className='w-32' />
          </Link>
          <div className='border-black p-8 flex items-center justify-center text-black'>
            <h1 className='text-3xl font-scb'>Sign up for free to start listening.</h1>
          </div>

          <div className='w-full flex justify-center'>

            <form action=""
              autoComplete='off'
              className='w-1/2 sm:w-1/3'
              onSubmit={(e) => {
                e.preventDefault();
                // let nameQuery = users.users.filter((curr) => (curr.name == name));
                // let emailQuery = users.users.filter((curr) => (curr.email == email));

                // if(nameQuery.length != 0) setnameWarning('This email is already connected to an account. Log in instead.');
                // if(emailQuery.length != 0) setemailWarning('This email is already connected to an account. Log in instead.');

                // An empty namewarning indicates that the name is in the correct format, similar to other state variables."
                if(name && email && password && namewarning == '' && passwordwarning == '' && emailwarning == '' && isLoading == false){
                    handleCreateAccount(email, password);
                }
              }}
            >
              <div className='flex flex-col items-start m-2 mt-8'>
                <label htmlFor="email"
                  className='mb-2'
                  >
                  {`What's your email?`}
                </label>
                <input type="text"
                  id='email'
                  placeholder='Enter your mail.'
                  name='email'
                  className='w-full p-3 rounded-md border outline-black border-gray-1 font-scbk'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if(e.target.value.includes('@') == false){
                      setemailWarning('This email is invalid. Make sure it\'s written like example@email.com');
                    } else {
                      setemailWarning('');
                    }
                  }}
                />
                <div className='mt-3 text-red-500 text-xs font-scbk flex flex-row gap-2' style={{display: emailwarning == '' ? 'none' : 'flex'}}>
                  <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff004c",}} />
                  <h1>{emailwarning}</h1>
                </div>
              </div>

              <div className='flex flex-col items-start m-2 mt-8 relative'>
                <label htmlFor="password" className='mb-2'>
                  Create a password
                </label>
                <div className='w-full flex flex-row'>
                  <input type={passwordType}
                    id='password'
                    placeholder='Create a password.'
                    className='w-full p-3 rounded-md border outline-black border-gray-1 font-scbk'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if(e.target.value.length < 8){
                        setpasswordWarning('Your password is too short.');
                      } else {
                        setpasswordWarning('');
                      }
                    }}
                  />
                  <div className='right-0 flex items-center p-3 z-20 absolute cursor-pointer hover:scale-105 opacity-80 hover:opacity-100'>
                    {
                      passwordType == 'text' ? (
                        <FontAwesomeIcon icon={faEye} size='xl' onClick={() => setpasswordType('password')} />
                        ) : (
                        <FontAwesomeIcon icon={faEyeSlash} size='xl' onClick={() => setpasswordType('text')} />
                      )
                    }
                  </div>
                </div>
                <div className='mt-3 text-red-500 text-xs font-scbk flex flex-row gap-2' style={{display: passwordwarning == '' ? 'none' : 'flex'}}>
                  <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff004c",}} />
                  <h1>{passwordwarning}</h1>
                </div>
              </div>

              <div className='flex flex-col items-start m-2 mt-8'>
                <label htmlFor="name" className='mb-2'>
                  What should we call you?
                </label>
                <input type="text"
                  id='name'
                  placeholder='Enter a profile name.' name='name'
                  className='w-full p-3 rounded-md border outline-black border-gray-1 font-scbk'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if(e.target.value.length < 3){
                      setnameWarning('Enter a name for your profile at least 3 characters.');
                    } else {
                      setnameWarning('');
                    }
                  }}
                />
                <div className='mt-3 text-red-500 text-xs font-scbk flex flex-row gap-2' style={{display: namewarning == '' ? 'none' : 'flex'}}>
                  <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff004c",}} />
                  <h1>{namewarning}</h1>
                </div>
                <h3 className='font-scbk opacity-80 text-[0.8rem] mt-3 mb-6'>This appear on your profile.</h3>
              </div>

              <div className='p-2 flex flex-col'>
                <h1 className=''>
                  {`What's your date of birth?`}
                </h1>

                <div className='flex flex-row w-full'>
                  <div className='w-1/3 flex flex-col p-2'>
                    <label htmlFor="ddob">Day</label>
                    <input type="text"
                      id='ddob'
                      placeholder='DD'
                      name='day'
                      className='border-[0.1em] border-gray-1 w-full p-3 rounded-md'
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    />
                  </div>

                  <div className='w-2/3 flex flex-col p-2'>
                    <label htmlFor="mob">Month</label>

                    <select type="text"
                      id='mob'
                      placeholder='Month'
                      name='month'
                      className='border-[0.1em] border-gray-1 w-full h-full opacity-60 p-2 rounded-md'
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                    <option value="default" disabled>Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                    </select>
                  </div>

                  <div className='w-1/3 flex flex-col p-2'>
                    <label htmlFor="yob">Year</label>
                    <input type="text"
                      id='yob'
                      placeholder='YYYY'
                      name='year'
                      className='border-[0.1em] border-gray-1 w-full p-3 rounded-md'
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='flex flex-col justify-center p-8 items-center'>
                <div className='font-scl text-[0.6rem] text-center mb-5'>
                  <h6 className='mb-3'>{`By clicking on sign-up, you agree to Spotify's`}<a href='#' className='text-green underline'>Terms and Conditions of Use.</a></h6>
                  <h6>By clicking on sign-up, you agree to the <a href='#' className='text-green underline'>Spotify Privacy Policy.</a></h6>
                </div>

                <button
                  disabled={isProgress}
                  type='submit'
                  className='w-full sm:w-1/3 p-4 pl-6 pr-6 rounded-full bg-green hover:scale-105 hover:opacity-90'
                  style={{
                    cursor: isLoading == false ? "cursor" : "not-allowed",
                  }}
                >
                  { isLoading == false ? "Sign Up" : ( <Loading/> )}
                </button>
                <div className='text-center mt-8 font-scbk'>Have an account ?
                  <Link to='/login' className='text-green underline underline-offset-2 font-scbk hover:opacity-70'> Login.</Link>
                </div>
              </div>

            </form>

          </div>
        </div>
      </>
    )
  }
}
