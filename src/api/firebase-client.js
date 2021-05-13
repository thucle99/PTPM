import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
  apiKey: "AIzaSyDtlyqZ9uh8wGKBRp138GtpSakjaes213Y",
  authDomain: "testing-project-291f4.firebaseapp.com",
  databaseURL: "https://testing-project-291f4.firebaseio.com",
  projectId: "testing-project-291f4",
};


const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};
const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);
const signUp = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);
const signOut = () => firebase.auth().signOut();
const resetPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

export {
  initFirebase,
  signIn,
  signUp,
  signOut,
  resetPassword,
};
