import { initializeApp } from "firebase/app";
import {
  // GoogleAuthProvider,
  getAuth,
  // signInWithPopup,
  signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "./config";
import { FlashSeverity, FlashState } from "../types/flash";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  // try {
  //   const res = await signInWithPopup(auth, googleProvider);
  //   const user = res.user;
  //   const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  //   const docs = await getDocs(q);
  //   if (docs.docs.length === 0) {
  //     await addDoc(collection(db, 'users'), {
  //       uid: user.uid,
  //       name: user.displayName,
  //       authProvider: 'google',
  //       email: user.email
  //     });
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
};

const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  flashContext: FlashState | undefined,
  setIsLoading: (l: boolean) => void
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setIsLoading(false);
    flashContext?.addMessage("Login successful", FlashSeverity.Info);
  } catch (err) {
    console.error(err);
    flashContext?.addMessage(err as string, FlashSeverity.Info);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  // try {
  //   const res = await createUserWithEmailAndPassword(auth, email, password);
  //   const user = res.user;
  //   await addDoc(collection(db, 'users'), {
  //     uid: user.uid,
  //     name,
  //     authProvider: 'local',
  //     email
  //   });
  // } catch (err) {
  //   console.error(err);
  // }
};

const sendPasswordReset = async (email: string) => {
  // try {
  //   await sendPasswordResetEmail(auth, email);
  //   alert('Password reset link sent!');
  // } catch (err) {
  //   console.error(err);
  // }
};

const logout = async (flashContext: FlashState | undefined) => {
  try {
    await signOut(auth);
    flashContext?.addMessage("Logout successful", FlashSeverity.Info);
  } catch (err) {
    flashContext?.addMessage(err as string, FlashSeverity.Info);
  }
};

export {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
