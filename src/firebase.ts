import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnR3JY6WhVetbCcpQWH9E8DEk2SNkbDI0",
  authDomain: "fleetwise-afda5.firebaseapp.com",
  projectId: "fleetwise-afda5",
  storageBucket: "fleetwise-afda5.appspot.com",
  messagingSenderId: "54836480686",
  appId: "1:54836480686:web:94a5ca29d8b00a0320bb3f",
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();
