import React, { useEffect, useState } from "react";
import { auth } from "../firebase.init";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // create user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
     .finally(() => setLoading(false));
  };

  // signIn/Login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
     .finally(() => setLoading(false));
  };

  // Google signin
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
     .finally(() => setLoading(false));
  };

  // update user
  const updateUserProfile = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData)
     .finally(() => setLoading(false));
  };

  // signOut/LogOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
     .finally(() => setLoading(false));
  };

  // reset password
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // observer (persistent login logic)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () =>{
        unsubscribe();
    } 
  }, []);

  // show loader while user data is loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const authInfo = {
    user,
    setUser,
    registerUser,
    logOut,
    signInUser,
    updateUserProfile,
    signInGoogle,
    passwordReset,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

