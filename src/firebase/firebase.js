import * as firebase from "firebase";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
/* This code below allows us to set up Firebase to authenticate with Google, we also had to ENABLE the 'Google'
Provider directly INSIDE the 'Firebase' webpage inside the 'Authentication' Section. But this alone wasn't
ENOUGH, what we really NEEDED to do was actually pass the PROVIDED(so this 'googleAuthProvider' below) INSIDE
the 'signInWithPopup' Function we're using in the 'firebase.js' file and THAT Function is what TRIGGERED the
POPUP page that showed up where we could log in using a Google Account */
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
