import firebase from "firebase/app";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyB6YABGXUWiqLzHoxuQ1E1Z7FO67FGD7-4",
  authDomain: "nilemediaonline.firebaseapp.com",
  databaseURL: "https://nilemediaonline.firebaseio.com",
  projectId: "nilemediaonline",
  storageBucket: "nilemediaonline.appspot.com",
  messagingSenderId: "660857508341",
  appId: "1:660857508341:web:fec5f0cce0715617edd0bc"
};

firebase.initializeApp(config);

export default firebase.firestore();
