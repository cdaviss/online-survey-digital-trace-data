import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// Contains sensitive information, so you have to create this file yourself
import { firebaseConfig } from "./config.js";

firebase.initializeApp(firebaseConfig);
export default firebase;
