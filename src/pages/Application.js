import firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  useHistory
} from "react-router-dom";
import { initFirebase } from "../api/firebase-client";
import App from "../layout/PrivateLayout";
import Login from "./Login/Login";

initFirebase();

export default function Application() {
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
