import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import spotify_black from '@assets/images/Spotify_Logo_CMYK_Black.png';

import Loading from '@components/Loading.jsx';

import { auth, mydb } from '@configs/firebase.js';

import { UserContext } from '@contexts/UserContext.jsx';

import datas from '@assets/datas/datas.json';

import '@assets/global.css';
import { FirebaseController } from '@apis/controllers/firebase.controller';

export default function Register() {

  const [passwordType, setpasswordType] = useState('password');
  const [isLoading, setLoading] = useState(false);

  // form
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    day: '',
    month: '',
    year: ''
  })

  // warning
  const [emailwarning, setemailWarning] = useState('');
  const [passwordwarning, setpasswordWarning] = useState('');
  const [namewarning, setnameWarning] = useState('');

  // load
  const [isProgress, setProgress] = useState(false);
  
  const updateAccount = async (userId) => {

    const date = new Date(form.year, form.month - 1, form.day);
    
    await setDoc(doc(mydb, "account", userId), {
      top_artists: datas.top_artists,
      top_tracks: datas.top_tracks,
      dob: date,
      email: form.email,
      name: form.name,
      user_library: []
    }, { merge: true })
  }

  const handleCreateAccount = (email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        // console.log(userCredential?.user?.reloadUserInfo?.localId);

        updateAccount(userCredential?.user?.reloadUserInfo?.localId);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      })
  }

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await FirebaseController.signUp({
        email: form.email,
        password: form.password,
        name: form.name,
        date_of_birth: new Date(form.year, form.month - 1, form.day)
      });

      
    } catch (e) {
      setWarning(e.message);
    } finally {
      setLoading(false);
    }
  }

  const { authUser } = useContext(UserContext);
  // if(authUser) PushPlaylists(authUser, "asdasdasa");
  
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
                if(form.name && form.email && form.password && namewarning == '' && passwordwarning == '' && emailwarning == '' && isLoading == false){
                    handleCreateAccount(form.email, form.password);
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
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
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
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
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
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value});
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
                      value={form.day}
                      onChange={(e) => {
                        setForm({ ...form, day: e.target.value }); 
                      }}
                    />
                  </div>

                  <div className='w-2/3 flex flex-col p-2'>
                    <label htmlFor="mob">Month</label>

                    <select type="text"
                      id='mob'
                      placeholder='Month'
                      name='month'
                      className='border-[0.1em] border-gray-1 w-full h-full opacity-60 p-2 rounded-md'
                      value={form.month}
                      onChange={(e) => {
                        setForm({ ...form, month: e.target.value })
                      }}
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
                      value={form.year}
                      onChange={(e) => {
                        setForm({ ...form, year: e.target.value });
                      }}
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
