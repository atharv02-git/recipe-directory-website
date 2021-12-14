import firebase from "firebase/app";
import "firebase/firestore";

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN ,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAe4IkiQyjxjgFwf32xIOkdHClG2Naz3Nc",
  authDomain: "cooking-recipe-website.firebaseapp.com",
  projectId: "cooking-recipe-website",
  storageBucket: "cooking-recipe-website.appspot.com",
  messagingSenderId: "390496285457",
  appId: "1:390496285457:web:7aafa4ffc19bd3546792b0"
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize firestore services
const projectFirestore = firebase.firestore();

export { projectFirestore };