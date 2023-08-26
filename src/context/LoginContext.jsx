import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import key from "../../public/key";
import { FetchSpotify } from "../../reusable/Spotify";

export const LoginContext = createContext();

LoginProvider.propTypes = {
  children: PropTypes.element.isRequired,
  _setLoading: PropTypes.func.isRequired
}

export default function LoginProvider({ children, _setLoading: setLoading }){
  // app login status
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('login')){
      console.log(JSON.parse(localStorage.getItem('login')).status)
      setLogin(JSON.parse(localStorage.getItem('login')).status);
    }
  }, []);

  // get spotify web api token
  const [token, setToken] = useState();
  useEffect(() => {
    FetchSpotify(
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(key.CLIENT_ID + ':' + key.CLIENT_SECRET),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      }, 'https://accounts.spotify.com/api/token'
    ).then((response) => {
      // console.log(response);
      setToken(response.access_token);
      setLoading(false);
    })
  }, []);

  return(
    <LoginContext.Provider value={{ login, setLogin, token }}>
      { children }
    </LoginContext.Provider>
  )
}
