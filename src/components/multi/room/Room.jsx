import React from "react";

// Dependencies
import { StyleSheet, Text, View } from "react-native";

const Room = ({ navigation, route }) => {
  const { room } = route.params;
  console.log("room: ", room);
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Room</Text>
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
