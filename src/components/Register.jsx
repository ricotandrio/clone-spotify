import React, { useState } from 'react'
import spotify_black from '../assets/Spotify_Logo_CMYK_Black.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Register(props) {
  const navigate = useNavigate();

  const [users, setUsers] = useState(props._userdata);

  const [passwordType, setpasswordType] = useState('password');

  // form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // warning
  const [emailwarning, setemailWarning] = useState('');
  const [passwordwarning, setpasswordWarning] = useState('');
  const [namewarning, setnameWarning] = useState('');

  // load
  const [isProgress, setProgress] = useState(false);

  const handlenewuser = () => {
    const newuser = {
      "id": users.length + 1,
      name,
      password,
      email,
      "dob": `${day} ${month} ${year}`,
      "type": 'register',
      "user_playlists": [],
      "top_tracks": [],
      "top_artists": []
    };
    console.log(newuser);

    setProgress(true);
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newuser)
    }).then((response) => {
      console.log(response);

      setTimeout(() => {
        window.location.reload();
      }, 3500);

      setTimeout(() => {
        localStorage.setItem('login', JSON.stringify({"status": "true" }));
        localStorage.setItem('whoislogin',
          JSON.stringify({
            name,
            email,
            "user_playlists": [],
            "top_tracks": [],
            "top_artists": []
          })
        );

        setProgress(false);
        window.scrollTo(0, 0);
        navigate('/');
      }, 3000);
    }).catch((error) => {
      console.log(error);
      setProgress(false);
    })
  }

  return (
    <>
      <div className='bg-white w-full h-screen xl:h-full pb-20 text-black'>
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
              let nameQuery = users.filter((curr) => (curr.name == name));
              let emailQuery = users.filter((curr) => (curr.email == email));

              if(nameQuery.length != 0) setnameWarning('This email is already connected to an account. Log in instead.');
              if(emailQuery.length != 0) setemailWarning('This email is already connected to an account. Log in instead.');

              // An empty namewarning indicates that the name is in the correct format, similar to other state variables."
              if(name && email && password
                && namewarning == '' && passwordwarning == '' && emailwarning == ''
                && nameQuery.length == 0 && emailQuery.length == 0){

                  handlenewuser();

              }
            }}
          >
            <div className='flex flex-col items-start m-2 mt-8'>
              <label htmlFor="email"
                className='mb-2'
                >
                What's your email?
              </label>
              <input type="text"
                id='email'
                placeholder='Enter your mail.'
                name='email'
                className='w-full p-3 rounded-md border outline-black border-gray font-scbk'
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
                  className='w-full p-3 rounded-md border outline-black border-gray font-scbk'
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
                className='w-full p-3 rounded-md border outline-black border-gray font-scbk'
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
                What's your date of birth?
              </h1>

              <div className='flex flex-row w-full'>
                <div className='w-1/3 flex flex-col p-2'>
                  <label htmlFor="ddob">Day</label>
                  <input type="text"
                    id='ddob'
                    placeholder='DD'
                    name='day'
                    className='border-[0.1em] border-gray w-full p-3 rounded-md'
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
                    className='border-[0.1em] border-gray w-full h-full opacity-60 p-2 rounded-md'
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                  <option value="default" disabled>Month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                  </select>
                </div>

                <div className='w-1/3 flex flex-col p-2'>
                  <label htmlFor="yob">Year</label>
                  <input type="text"
                    id='yob'
                    placeholder='YYYY'
                    name='year'
                    className='border-[0.1em] border-gray w-full p-3 rounded-md'
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center p-8 items-center'>
              <div className='font-scl text-[0.6rem] text-center mb-5'>
                <h6 className='mb-3'>By clicking on sign-up, you agree to Spotify's <a href='#' className='text-green underline'>Terms and Conditions of Use.</a></h6>
                <h6>By clicking on sign-up, you agree to the <a href='#' className='text-green underline'>Spotify Privacy Policy.</a></h6>
              </div>

              <button
                disabled={isProgress}
                type='submit'
                className='w-full sm:w-1/3 p-4 pl-6 pr-6 rounded-full bg-green hover:scale-105 hover:opacity-90'
              >
                Sign Up
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

