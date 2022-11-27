import React from "react";

// Dependencies
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const Multiplayer = () => {
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
          onPress={() => console.log("Set Username")}
        >
          <Text style={styles.gameTypeButtonText}>Set Username</Text>
        </TouchableOpacity>
        {/* Create Room */}
        <TouchableOpacity
          style={styles.gameTypeButton}
          onPress={() => console.log("Create Room")}
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
