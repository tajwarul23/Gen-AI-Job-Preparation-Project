import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../../Config/firebase.js";
import axios from "axios";

// const api = axios.create({
//   baseURL: "http://192.168.0.100:3000",
//   withCredentials: true,
// });
export const useFirebaseAuth = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    const { data } = await axios.post(
      "https://gen-ai-job-preparation-project.onrender.com/api/auth/firebase",
      // "http://localhost:3000/api/auth/firebase",
      { idToken },
      { withCredentials: true }
    );
    return data;
  };

  const signOutFromFirebase = async () => {
    await signOut(auth);
  };

  return { signInWithGoogle, signOutFromFirebase };
};