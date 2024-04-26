import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import spotify_black from '@src/assets/images/Spotify_Logo_CMYK_Black.png';

import Loading from '@src/components/Loading.jsx';

import { UserContext } from '@src/contexts/UserContext.jsx';

import { FirebaseService } from '@src/apis/services/firebase.service';
import { registerUserSchema, validateExtractor } from '@src/apis/validations/user.validate';

const RegisterPage = () => {

  const { authUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);

  // form
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    date_of_birth: {
      day: '',
      month: 'default',
      year: ''
    }
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    date_of_birth: '',
    form: '',
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formToObject = {
        email: form.email,
        password: form.password,
        name: form.name,
        date_of_birth: new Date(form.date_of_birth.year, form.date_of_birth.month - 1, form.date_of_birth.day)
      }

      const zodValidate = validateExtractor(registerUserSchema.safeParse(formToObject));

      setErrors(zodValidate)

      if(zodValidate == {}) return;

      // eslint-disable-next-line no-unused-vars
      const response = await FirebaseService.signUp(formToObject);
      
      console.log("sd");
    } catch (e) {
      console.log(`Error: ${e.message}`);
      setErrors({ ...errors, form: e.message });
    } finally {
      setLoading(false);
    }
  }

  if(authUser) return (
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
            onSubmit={ handleSignUp }
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {
                errors.email && (
                  <div className='mt-3 text-red-500 text-xs font-scbk flex flex-row gap-2'>
                    <FontAwesomeIcon icon={faCircleExclamation} className='text-red-500' />
                    <h1>{errors.email}</h1>
                  </div>
                )
              }
            </div>

            <div className='flex flex-col items-start m-2 mt-8 relative'>
              <label htmlFor="password" className='mb-2'>
                Create a password
              </label>
              <div className='w-full flex flex-row'>
                <input
                  type={isVisible ? 'text' : 'password'}
                  id='password'
                  placeholder='Create a password.'
                  className='w-full p-3 rounded-md border outline-black border-gray-1 font-scbk'
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value})}
                />
                <div className='right-0 flex items-center p-3 z-20 absolute cursor-pointer hover:scale-105 opacity-80 hover:opacity-100'>
                  {
                    isVisible ? (
                      <FontAwesomeIcon icon={faEye} size='xl' onClick={() => setVisible(false)} />
                      ) : (
                      <FontAwesomeIcon icon={faEyeSlash} size='xl' onClick={() => setVisible(true)} />
                    )
                  }
                </div>
              </div>
              {
                errors.password && (
                  <div className='mt-3 text-red-500 text-xs font-scbk flex flex-row gap-2'>
                    <FontAwesomeIcon icon={faCircleExclamation} className='text-red-500' />
                    <h1>{errors.password}</h1>
                  </div>
                )
              }
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
                onChange={(e) => setForm({ ...form, name: e.target.value})}
              />
              {
                errors.name && (
                  <div className='mt-3 text-red-500 text-xs font-scbk flex flex-row gap-2'>
                    <FontAwesomeIcon icon={faCircleExclamation} className='text-red-500' />
                    <h1>{errors.name}</h1>
                  </div>
                )
              }
              <h3 className='font-scbk opacity-80 text-[0.8rem] mt-3 mb-6'>This appear on your profile.</h3>
            </div>

            <div className='p-2 flex flex-col'>
              <h1 className=''>
                {`What's your date of birth?`}
              </h1>

              <div className='flex flex-row w-full'>
                <div className='w-1/3 flex flex-col p-2'>
                  <label htmlFor="ddob">Day</label>
                  <input type="number"
                    id='ddob'
                    placeholder='DD'
                    name='day'
                    className='border-[0.1em] border-gray-1 w-full p-3 rounded-md appearance-none'
                    min="1"
                    max="31"
                    value={form.date_of_birth.day}
                    onChange={(e) => setForm({ ...form, date_of_birth: { ...form.date_of_birth, day: e.target.value } })}
                  />
                </div>

                <div className='w-2/3 flex flex-col p-2'>
                  <label htmlFor="mob">Month</label>

                  <select type="text"
                    id='mob'
                    placeholder='Month'
                    name='month'
                    className='border-[0.1em] border-gray-1 w-full h-full p-2 rounded-md'
                    style={{
                      opacity: form.date_of_birth.month == 'default' ? 0.5 : 1
                    }}
                    value={form.date_of_birth.month}
                    onChange={(e) => setForm({ ...form, date_of_birth: { ...form.date_of_birth, month: e.target.value } })}
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
                  <input 
                    type="number"
                    id='yob'
                    placeholder='YYYY'
                    name='year'
                    min="1900"
                    max={new Date().getFullYear()}
                    className='border-[0.1em] border-gray-1 w-full p-3 rounded-md'
                    value={form.date_of_birth.year}
                    onChange={(e) => setForm({ ...form, date_of_birth: { ...form.date_of_birth, year: e.target.value } })}
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
                disabled={isLoading}
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

export default RegisterPage;  