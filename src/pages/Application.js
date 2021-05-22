import firebase from "firebase";
import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "../components/App";
import Login from "../components/Login";
import { initFirebase } from "../api/firebase-client";

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
    // <Switch>
    //   <Route exact path="/login" component={Login} />
    //   {this.state.authenticated && <Route exact path="/" component={App} />}
    // </Switch>
  );
}
