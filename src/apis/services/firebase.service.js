import { ResponseError } from "@src/apis/errors/ResponseError";
import { getDocs, collection, setDoc, doc, FieldPath, getDoc, deleteDoc, Timestamp, onSnapshot, query } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "@src/configs/firebase";
import { auth } from "@src/configs/firebase";

import { loginUserSchema } from "../validations/user.validate";

export class FirebaseService {
  
  static signIn = async ({
    email,
    password
  }) => {
    if(!loginUserSchema.safeParse({email, password}).success){
      throw new ResponseError({
        code: 400,
        message: "Invalid email or password"
      });
    }

    const response = await signInWithEmailAndPassword(auth, email, password);

    if(!response) {
      throw new ResponseError(500, "Internal Server Error");
    }

  }

  static signUp = async ({
    email,
    password,
    name,
    date_of_birth,
  }) => {
    console.log(email, password, name, date_of_birth);

    const responseSignUp = await createUserWithEmailAndPassword(auth, email, password);

    if(!responseSignUp) {
      throw new ResponseError(500, "Internal Server Error");
    }

    const firebase_id = responseSignUp?.user?.reloadUserInfo?.localId;

    if(!firebase_id) {
      throw new ResponseError(500, "Internal Server Error");
    }

    const signUpResponse = await setDoc(doc(db, "account", firebase_id), {
      top_artists: [],
      top_tracks: [],
      date_of_birth: Timestamp.fromDate(date_of_birth),
      email: email,
      name: name,
    }, {
      merge: true
    });

    if(!signUpResponse) {
      throw new ResponseError(500, "Internal Server Error");
    }

    const libraryCollection = await setDoc(doc(db, "account", firebase_id, "user_library"), {});
    
    if(!libraryCollection) {
      throw new ResponseError(500, "Internal Server Error");
    }

    const listeningCollection = await setDoc(doc(db, "account", firebase_id, "user_listening"), {});

    if(!listeningCollection) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  static signOut = async () => {
    const response = await auth.signOut();
    
    if(!response) {
      throw new ResponseError(500, "Internal Server Error");
    }

    return {
      code: 200,
      message: "success sign out"
    };
  }

  static authState = (callback) => {

    const response = auth.onAuthStateChanged(callback);

    if(!response){
      throw new ResponseError(500, "Internal Server Error");
    }
    
  }

  static getUser = async (uid) => {
    const currentAccount = await getDoc(doc(db, "account", uid));

    console.log(currentAccount);

    if (!currentAccount) {
      throw new ResponseError(500, "Internal Server Error");
    }

    const library = await getDocs(collection(db, "account", uid, "user_library"));
    const listening = await getDocs(collection(db, "account", uid, "user_listening"));

    return {
      ...currentAccount.data(),
      user_library: library.docs.map(doc => doc.data()),
      user_listening: listening.docs.map(doc => doc.data())
    };
  }

  static updateLibrary = async(userId, libraryId, libraryData) => {

    const docRef = doc(db, "account", userId, "user_library", libraryId);
    const getLibrary = await getDoc(docRef);

    if(!getLibrary.exists()) {
      await setDoc(docRef, libraryData, { merge: true });
    } else {
      await deleteDoc(docRef);
    }

    const newLibrary = await getDocs(collection(db, "account", userId, "user_library"));
    
    return newLibrary.docs.map(doc => doc.data());

  }

  static isLibraryExist = async (userId, libraryId) => {
    const docRef = doc(db, "account", userId, "user_library", libraryId);
    const getLibrary = await getDoc(docRef);

    if(!getLibrary.exists()) {
      throw new ResponseError(404, "Library not found");
    }
  }

  static watchLibrary = async (uid, callback) => {
    return onSnapshot(collection(db, "account", uid, "user_library"), callback);
  }

}