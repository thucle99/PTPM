import firebase from "firebase";
import React, { useEffect, useState } from "react";
import App from '../components/App';
import Login from '../components/Login'
import {initFirebase} from '../api/firebase-client'

initFirebase();

export default function Application(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(user);
    });
  }, []);
  return (
    <div>
      {!isSignedIn ? (       
        <Login setIsSignedIn={setIsSignedIn}/>
      ) : (
          <App/>
      )}
    </div>
  );
}
