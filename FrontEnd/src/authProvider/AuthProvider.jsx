import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import auth from "../../firebase.config";
import { todoInstance } from "../utils/getAxiosBaseUrl";


//exporting Auth Context
export const AuthContext = createContext(null);

//------------------functions----------------
const AuthProvider = ({ children }) => {
  //handle states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //auth functionalities generate
  const provider = new GoogleAuthProvider();

  //google signIn or signUp
  const GoogleSignIn = async () => {
    return await signInWithPopup(auth, provider);
  };
  //email-password authentication
  const manualSignUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const manualLogIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  //sign out
  const logOut = async () => {
    return await signOut(auth);
  };

  //onAuth state change handler
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        console.log(currentUser);
        todoInstance
          .post(
            "auth/loginUser",
            { user: currentUser?.email }
          )
          .then((res) => {
            const token = res?.data?.data?.token;
            const user = res?.data?.data?.email?.user;
            console.log(user);
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (!currentUser) {
        setLoading(false);
      }
    });
    return () => unSubscribe();
  });

  //auth Info return and return body
  const authInfo = {
    GoogleSignIn,
    manualSignUp,
    manualLogIn,
    user,
    setUser,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
