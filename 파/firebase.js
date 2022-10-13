import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDafgOYcDHcefvMrq9o3zAP79mD3VMoD9M",
  authDomain: "login-15678.firebaseapp.com",
  projectId: "login-15678",
  storageBucket: "login-15678.appspot.com",
  messagingSenderId: "972203910912",
  appId: "1:972203910912:web:8c79ec1b330d2ebfc935e5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password , id) {
  return createUserWithEmailAndPassword(auth, email, password,id);
}

export function login(email, password,id) {
  return signInWithEmailAndPassword(auth, email, password,id);
}

export function logout() {
  return signOut(auth);
}


export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}