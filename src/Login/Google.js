import React from "react";
import classes from "./Google.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../Store/login";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDSeoigvLGMP3KsElSdmlV4gdHOo2SoTMk",
//   authDomain: "chatakk-oauth-4ab6d.firebaseapp.com",
//   databaseURL:
//     "https://chatakk-oauth-4ab6d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "chatakk-oauth-4ab6d",
//   storageBucket: "chatakk-oauth-4ab6d.appspot.com",
//   messagingSenderId: "137371978153",
//   appId: "1:137371978153:web:c3b6ea5c65f39da1e39cb8",
// };

const fireDb = firebase.initializeApp(firebaseConfig);
export const fire = fireDb.database().ref();

const Google = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        //   console.log(result);
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        dispatch(loginActions.userLogin({ email: email }));
        toast.success("Logged In Successfully");
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.App}>
      <button
        className={classes.googleBtn}
        onClick={signInWithGoogle}
        style={{ width: "200px" }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Google;
