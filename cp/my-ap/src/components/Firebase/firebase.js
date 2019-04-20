//import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// const Firebase = () => (
//   <div>
//     <h1> Firebase </h1>
//   </div>
// );

//<h1> Firebase </h1>

const config = {
  apiKey: "AIzaSyAei9beohg6m5Z8LtbuImZ15cRzHapsptI",
  authDomain: "my-ap-2985d.firebaseapp.com",
  databaseURL: "https://my-ap-2985d.firebaseio.com",
  projectId: "my-ap-2985d",
  storageBucket: "my-ap-2985d.appspot.com",
  messagingSenderId: "633158175213"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

}

export default Firebase;