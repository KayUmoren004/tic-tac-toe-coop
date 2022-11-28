import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";
import { FirebaseContext } from "../../../helpers/FirebaseContext";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import FirebaseConfig from "../../../helpers/config/FirebaseConfig";

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
// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

const Room = ({ navigation, route }) => {
  const { zoomId } = route.params;
  console.log("room: ", zoomId);

  const Firebase = React.useContext(FirebaseContext);
  const [room, setRoom] = React.useState(null);

  React.useEffect(() => {
    // Get Room from Firebase on mount and set to state

    // This also updates the state when the room changes
    const docRef = doc(db, "rooms", zoomId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setRoom(doc.data());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {room && (
        <View>
          <Text style={{ color: "#fff" }}>
            Player 1: {room.players.player1.name}
          </Text>
          <Text style={{ color: "#fff" }}>
            Player 2: {room.players.player2.name}
          </Text>
        </View>
      )}
      {/* {
        // wait for room to load
        room ? (
          <View>
            <Text style={{ color: "#fff" }}>
              Player 1: {room.players.player1.name}
            </Text>
            <Text style={{ color: "#fff" }}>
              Player 2: {room.players.player2.name}
            </Text>
          </View>
        ) : (
          <Text style={{ color: "#fff" }}>Loading...</Text>
        )
      } */}
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
