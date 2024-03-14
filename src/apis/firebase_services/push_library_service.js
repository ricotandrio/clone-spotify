import { doc, setDoc } from "firebase/firestore"
import { mydb } from "@configs/firebase"

export const pushLibraryService = async (userId, newlibrary) => {
  
  await setDoc(doc(mydb, "account", userId), {
    user_library: newlibrary
  }, { merge: true })

}