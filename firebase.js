// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMZf_3L0Tmr8xQdeWMZNmM_B72W6opPsQ",
  authDomain: "village-bank-ed839.firebaseapp.com",
  projectId: "village-bank-ed839",
  storageBucket: "village-bank-ed839.appspot.com",
  messagingSenderId: "951388586973",
  appId: "1:951388586973:web:c04f08d7e3dd1a57a82c34",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storageBucket = firebase.storage();

export { db, auth, storageBucket };
