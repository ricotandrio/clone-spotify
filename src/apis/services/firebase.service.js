import { ResponseError } from "@apis/errors/ResponseError";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { mydb } from "@configs/firebase";
import { auth } from "@configs/firebase";

import datas from "@assets/datas/datas.json";

export class FirebaseService {
  
  static signIn = async ({
    email,
    password
  }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (e) {
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static signUp = async ({
    email,
    password,
    name,
    date_of_birth,
  }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const firebase_id = response?.user?.reloadUserInfo?.localId;

      await setDoc(doc(mydb, "account", firebase_id), {
        top_artists: datas.top_artists,
        top_tracks: datas.top_tracks,
        dob: date_of_birth,
        email: email,
        name: name,
        user_library: []
      }, { merge: true });

      return ;
    } catch (e) {
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static signOut = async () => {
    try {
      const response = await auth.signOut();
      return response;
    } catch (e) {
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static authState = async (callback) => {
    try {
      const response = await auth.onAuthStateChanged(callback);
      return response;
    } catch (e) {
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static getUser = async (uid) => {
    try {
      const data = await getDocs(collection(mydb, "account"));
      const currentAccount = data.docs.filter((curr) => curr.id === uid); 

      if (currentAccount.length === 0) {
        throw new ResponseError(404, "User not found");
      }
      
      return currentAccount[0].data();

    } catch (e) {

      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static pushLibrary = async (userId, newlibrary) => {
    try {
      const response = await setDoc(doc(mydb, "account", userId), {
        user_library: newlibrary
      }, { merge: true })

      if(!response) {
        throw new ResponseError(500, "Internal Server Error")
      };

      return response;
    } catch (e) {

      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }
}