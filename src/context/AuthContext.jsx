import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { mydb } from "../config/firebase";

export const AuthContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default function AuthProvider({ children, _isLoading: isLoading, _setLoading: setLoading }){
  const [authUser, setAuthUser] = useState(null);
  const [db, setDB] = useState({});

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      setAuthUser(user ? user : null);
    });

    return () => {
      setLoading(true);
      authState();
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      try {
        const fillDB = async () => {
          const data = await getDocs(collection(mydb, "account"));
          console.log(data);

          const promises = data.docs.map(async (curr) => {
            if(curr.id === authUser?.uid) {
              const topArtists = await getDocs(collection(curr.ref, "top_artists"));
              const topArtistsData = topArtists.docs.map((artistDoc) => artistDoc.data());

              const topTracks = await getDocs(collection(curr.ref, "top_tracks"));
              const topTracksData = topTracks.docs.map((trackDoc) => trackDoc.data());

              console.log({ ...curr.data(), topArtistsData, topTracksData });
              return { ...curr.data(), id: curr.id, topArtistsData, topTracksData };
            }
            return null;
          });

          const results = await Promise.all(promises);
          setDB(results.filter(Boolean)); // Filter out null values
          setLoading(false);
        };

        fillDB();
      } catch (e) {
        console.error(e);
      }
    }
  }, [authUser]);

  return(
    <AuthContext.Provider value={{ authUser }}>
      { children }
    </AuthContext.Provider>
  )
}
