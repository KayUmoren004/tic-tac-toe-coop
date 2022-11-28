import { createContext } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const FirebaseContext = createContext();

// Firebase Modular Imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Config
import FirebaseConfig from "./config/FirebaseConfig";

// Initialize Firebase
const app = initializeApp(FirebaseConfig);

// Firebase Modules Variables
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const Firebase = {
  // Auth
  // Get Current User
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Check if User is Logged In
  checkAuth: (user) => {
    return onAuthStateChanged(auth, user);
  },

  // Get User Info
  getUserData: async (uid) => {
    try {
      const docRef = await doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (err) {
      console.log("Error @Firebase.getUserInfo: ", err.message);
    }
  },

  // Update User data
  updateUserData: async (uid, user) => {
    try {
      await updateDoc(doc(db, "users", uid), user);

      return true;
    } catch (err) {
      console.log("Error @Firebase.updateUserData: ", err.message);
      return false;
    }
  },

  // Sign Up Anonymously
  signUp: async (user) => {
    try {
      await signInAnonymously(auth);

      const uid = Firebase.getCurrentUser().uid;

      await setDoc(doc(db, "users", uid), user);

      return { ...user, uid };
    } catch (err) {
      console.log("Error @Firebase.signUp: ", err.message);
    }
  },

  // Auth End

  // Game Start
  // Create Room
  createRoom: async (room) => {
    try {
      await setDoc(doc(db, "rooms", room.id), room);

      // return room;
    } catch (err) {
      console.log("Error @Firebase.createRoom: ", err.message);
    }
  },

  // Join Room
  joinRoom: async (roomId, user) => {
    try {
      // await setDoc(doc(db, "rooms", room.id), room);

      // // Update Room with player2
      // await updateDoc(doc(db, "rooms", room.id), {
      //   players: {
      //     player1: {

      // Get Room
      const roomRef = await doc(db, "rooms", roomId);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        const room = roomSnap.data();

        // Update Room with player2
        await updateDoc(doc(db, "rooms", roomId), {
          players: {
            player1: room.players.player1,
            player2: {
              name: user.name,
              // uid: user.uid,
              score: 0,
            },
          },
        });
      }
    } catch (err) {
      console.log("Error @Firebase.joinRoom: ", err.message);
    }
  },
  // Get Game Data from Room
  getGameData: async (roomId) => {
    try {
      const docRef = await doc(db, "rooms", roomId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (err) {
      console.log("Error @Firebase.getGameData: ", err.message);
    }
  },

  // Listen to Room Changes
  listenToRoomChanges: (roomId, callback) => {
    return onSnapshot(doc(db, "rooms", roomId), (doc) => {
      callback(doc.data());
    });
  },

  // Check if Room Exists
  checkRoom: async (roomId) => {
    try {
      const docRef = await doc(db, "rooms", roomId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("Error @Firebase.checkRoom: ", err.message);
    }
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider, FirebaseContext };
