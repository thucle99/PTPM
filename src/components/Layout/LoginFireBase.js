import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { initFirebase } from "../../api/firebase-client";
import { StyledFirebaseAuth } from "react-firebaseui";

// if (!firebase.apps.length === 0) {
//   firebase.initializeApp({
//     apiKey: "AIzaSyDtOH3_l03-0aroLCQJWKNwlOh90sbsnYc",
//     authDomain: "fir-demo-523d4.firebaseapp.com",
//   });
// }

initFirebase(); 
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => false,
  },
};
// initFirebase();

export default function LoginFireBase(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // firebase.auth().onAuthStateChanged((user) => {
    //   setIsSignedIn(true);
    //   console.log("user", user);
    // });

    if (typeof window !== "undefined") {
      setIsSignedIn(true);
      props.setToken(true);
      console.log('da den day',firebase.auth().currentUser);
    }
  }, []);
  return (
    <div>
      {!isSignedIn ? (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
}
