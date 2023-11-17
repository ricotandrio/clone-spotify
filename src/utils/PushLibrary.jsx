import { doc, setDoc } from "firebase/firestore"
import { mydb } from "../config/firebase"

export const PushLibrary = async (userId, newlibrary) => {
  
  await setDoc(doc(mydb, "account", userId), {
    user_library: newlibrary
  }, { merge: true })

  
}