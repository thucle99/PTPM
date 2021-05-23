import firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect ,
} from "react-router-dom";
import App from "../components/App";
import Login from "../components/Login";
import { initFirebase } from "../api/firebase-client";

initFirebase();

export default function Application(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(user);
    });
  }, []);
  if (isSignedIn) {
    history.push("/");
  }
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
    //   {/* {isSignedIn && <Route exact path="/" component={App} />} */}
    //    <Route exact path="/" component={App} />
    // </Switch>

    // <Switch>
    //   {
    //     !isSignedIn ? <Redirect  exact path="/login" component={Login} />
    //     : <Redirect  exact path="/" component={App} />
    //   }
    // </Switch>
  );
}
