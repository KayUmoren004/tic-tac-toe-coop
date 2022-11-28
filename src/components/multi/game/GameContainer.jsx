import React from "react";

// Dependencies
import { SafeAreaView, StyleSheet } from "react-native";
import GameBoard from "./GameBoard";

const GameContainer = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <GameBoard navigation={navigation} />
    </SafeAreaView>
  );
};

export default GameContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
