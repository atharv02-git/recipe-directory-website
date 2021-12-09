import firebase from "firebase/app";
import "firebase/firestore";

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