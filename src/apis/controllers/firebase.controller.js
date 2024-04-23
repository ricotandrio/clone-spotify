import { loginUserSchema } from "@apis/validations/user.validate";
import { FirebaseService } from "@apis/services/firebase.service";

export class FirebaseController {

  static signIn = async (email, password) => {
    try {
      if(!loginUserSchema.safeParse({email, password}).success){
        throw new Error("Invalid email or password");
      }

      const response = await FirebaseService.signIn(email, password);
      
      return response;
    } catch (e) {
      return e.message;
    }
  }

  static signUp = async (email, password) => {
    try {
      if(!loginUserSchema.safeParse({email, password}).success){
        throw new Error("Invalid email or password");
      }

      const response = await FirebaseService.signUp(email, password);
      
      return response;
    } catch (e) {
      return e.message;
    }
  }

  static signOut = async () => {
    try {
      const response = await FirebaseService.signOut();
      return response;
    } catch (e) {
      return e.message;
    }
  }

  static getUser = async (uid) => {
    try {
      const response = await FirebaseService.getUser(uid);
      return response;
  
    } catch (e) {

      return e.message;
    }
  }

  static pushLibrary = async (userId, newlibrary) => {
    try {
      const response = await FirebaseService.pushLibrary(userId, newlibrary);
      return response;
      
    } catch (e) {
  
      console.error(`Error ${e.code}: ${e.message}`);
      return e.message;
    }
  }
}