import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { initFirebase } from "../api/firebase-client";
import App from "../layout/PrivateLayout";
import Login from "./Login/Login";

initFirebase();

export default function Application() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(user);
    });
  }, []);

  return (
    <div>{!isSignedIn ? <Login setIsSignedIn={setIsSignedIn} /> : <App />}</div>
  );
}
