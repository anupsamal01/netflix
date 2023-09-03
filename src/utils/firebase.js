// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmmlPKhz_4JULiKujRD7r8r0Ie0-HUyuc",
  authDomain: "netflix-anup.firebaseapp.com",
  projectId: "netflix-anup",
  storageBucket: "netflix-anup.appspot.com",
  messagingSenderId: "1059084912186",
  appId: "1:1059084912186:web:282d1c961e5f62858d9703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
