import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";
import { FirebaseContext } from "../../../helpers/FirebaseContext";

const Room = ({ navigation, route }) => {
  const { zoom } = route.params;
  // console.log("room: ", zoom);

  const Firebase = React.useContext(FirebaseContext);

  // Get Room from Firebase
  const [room, setRoom] = React.useState(null);
  React.useEffect(() => {
    const f_room = Firebase.getGameData(zoom.id);
    // console.log("f_room: ", f_room);
    setRoom(f_room);
  }, []);

  // Listen for Room Changes and Update State
  React.useEffect(() => {
    const unsubscribe = Firebase.listenToRoomChanges(zoom.id, (room) => {
      setRoom(room);
    });

    return () => unsubscribe();
  }, []);

  // wait for room to load

  return (
    <View style={styles.container}>
      {/* {room && (
        <View>
          <Text style={{ color: "#fff" }}>
            Player 1: {room.players.player1.name}
          </Text>
          <Text style={{ color: "#fff" }}>
            Player 2: {room.players.player2.name}
          </Text>
        </View>
      )} */}
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
