import React from "react";

// Dependencies
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

// Context
import { UserContext } from "../helpers/UserContext";
import { FirebaseContext } from "../helpers/FirebaseContext";

const Multiplayer = ({ navigation }) => {
  // Context
  const [User] = React.useContext(UserContext);
  const Firebase = React.useContext(FirebaseContext);
  // Generate Random Room ID (4 numbers and 1 letter)
  const generateRoomID = () => {
    let roomID = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 4; i++) {
      roomID += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return roomID;
  };
  // console.log(generateRoomID());

  // Room Object
  const room = {
    id: generateRoomID(),
    players: {
      player1: {
        name: User.name,
        uid: User.uid,
        score: 0,
      },
      player2: {
        name: "waiting",
        uid: "_blank",
        score: 0,
      },
    },
    currentPlayer: "player1",
    currentCell: "_blank",
    cellsOccupied: {},
    isDisabled: false,
    winner: "_blank",
    gameID: `${generateRoomID()}-${generateRoomID()}`,
    moves: {
      player1Moves: {},
      player2Moves: {},
    },
  };
  // Create Room
  const createRoom = async () => {
    try {
      await Firebase.createRoom(room);

      navigation.navigate("Room", { room });
    } catch (err) {
      console.log("Error @Multiplayer.createRoom: ", err.message);
    }
  };

  // Join Room
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 20 }}>
        {/* Header */}
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.header}>Multiplayer</Text>
        </View>
        {/* Set Username */}
        <TouchableOpacity
          style={styles.gameTypeButton}
          onPress={() => navigation.navigate("Create Identity")}
        >
          <Text style={styles.gameTypeButtonText}>Set Username</Text>
        </TouchableOpacity>
        {/* Create Room */}
        <TouchableOpacity
          style={styles.gameTypeButton}
          onPress={() => createRoom()}
        >
          <Text style={styles.gameTypeButtonText}>Create Room</Text>
        </TouchableOpacity>
        {/* Join Room */}
        <TouchableOpacity
          style={styles.gameTypeButton}
          onPress={() => console.log("Join Room")}
        >
          <Text style={styles.gameTypeButtonText}>Join Room</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Multiplayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 30,
  },
  footer: {
    color: "#fff",
    fontSize: 30,
  },
  gameTypeButton: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  gameTypeButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
