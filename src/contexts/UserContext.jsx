import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { checkEnvironment } from "@src/configs/environment";
import { SpotifyService } from "@src/apis/services/spotify.service";
import { FirebaseService } from "@src/apis/services/firebase.service";
import { auth } from "@src/configs/firebase";
import { onSnapshot } from "firebase/firestore";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userContextIsLoading, setUserContextIsLoading] = useState(true);
  const [token, setToken] = useState();

  // only checking if user is logged in or not
  const [authUser, setAuthUser] = useState({});

  // all user data from firebase stored here
  const [db, setDB] = useState();

  const userAppInit = async () => {
    try {
      // sign out 
      setUserContextIsLoading(true);
      checkEnvironment();

      const tokenResponse = await SpotifyService.getSpotifyToken();
      setToken(tokenResponse.access_token);

      console.log(tokenResponse);
      FirebaseService.authState(
        auth => {
          console.log(auth);
          setAuthUser(auth ? auth : null);
        }
      );
      
    } catch (e) {
      console.error(e.message);
    } finally {
      setUserContextIsLoading(false);
    }
  }

  const getCurrentUser = useCallback(
    async () => {
      try {
        console.log(authUser.uid);
        setUserContextIsLoading(true);

        const response = await FirebaseService.getUser(authUser?.uid);
        setDB(response);
        
        console.log(response);
  
      } catch (e) {
        console.error(e.message);
      } finally {
        setUserContextIsLoading(false);
      }
    }, [authUser]
  );

  // get token and authUser
  useEffect(() => {
    userAppInit();
  }, []);
  
  // get authUser firestore storage
  useEffect(() => {
    console.log("get cd");

    if(authUser?.uid) getCurrentUser();
  }, [authUser?.uid, getCurrentUser]);
  
  return(
    <>
      <UserContext.Provider value={{
        token,
        db,
        authUser,
        userContextIsLoading,
        setDB
      }}>
        { children }
      </UserContext.Provider>
    </>
  )
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default UserProvider;
