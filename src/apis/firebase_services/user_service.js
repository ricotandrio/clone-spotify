import { mydb } from "@src/configs/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getUserService = async (uid) => {
  try {
    const data = await getDocs(collection(mydb, "account"));
    const currentAccount = data.docs.filter((curr) => curr.id === uid); 

    return currentAccount[0].data();

  } catch (e) {

    console.error(e);
    return null;
  }
}