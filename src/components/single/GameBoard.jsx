import React, { useState } from "react";

// Dependencies
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Animated,
  Platform,
} from "react-native";
import Column from "./Column";

const GameBoard = ({ navigation }) => {
  // Player State
  const [p1, setP1] = useState("X");
  const [p2, setP2] = useState("O");

  const player1 = "X";

  // State
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [currentCell, setCurrentCell] = useState("");
  const [cellsOccupied, setCellsOccupied] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  // Player move state
  const [p1Moves, setP1Moves] = useState([]);
  const [p2Moves, setP2Moves] = useState([]);

  // Score State
  const [score, setScore] = useState({
    p1: 0,
    p2: 0,
  });

  // Scores
  const p1Score = score.p1;
  const p2Score = score.p2;

  // Winner State
  const [winner, setWinner] = useState("");

  // Reset Game
  const resetGame = () => {
    setScore({
      p1: 0,
      p2: 0,
    });
    setP1Moves([]);
    setP2Moves([]);
    setCellsOccupied([]);
    setCurrentPlayer(player1);
    setIsDisabled(false);
    setWinner();
    setIsDisabled(false);
    setAnimation(new Animated.Value(0));
  };

  // Next Round
  const nextRound = () => {
    setP1Moves([]);
    setP2Moves([]);
    setCellsOccupied([]);
    setCurrentPlayer(player2);
    setIsDisabled(false);
    setWinner();
    setIsDisabled(false);
    setAnimation(new Animated.Value(0));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <AlertBox /> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#fff",
          padding: 10,
        }}
      >
        <Text style={[{ color: "#00b0ffff" }, styles.score]}>
          {p1} {p1Score}
        </Text>
        <Text style={[{ color: "#fff" }, styles.score]}>- </Text>
        <Text style={[{ color: "#e0bad7ff" }, styles.score]}>
          {p2Score} {p2}
        </Text>
      </View>
      {/* G */}

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Column
          score={score}
          setScore={setScore}
          players={{
            p1,
            p2,
          }}
          winner={winner}
          setWinner={setWinner}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          setCurrentCell={setCurrentCell}
          cellsOccupied={cellsOccupied}
          setCellsOccupied={setCellsOccupied}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          p1Moves={p1Moves}
          setP1Moves={setP1Moves}
          p2Moves={p2Moves}
          setP2Moves={setP2Moves}
          animation={animation}
        />
      </View>
      {winner && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderBottomColor: winnerColor(winner),
            borderTopWidth: 1,
            borderTopColor: winnerColor(winner),
            padding: 10,
            backgroundColor: winnerColor(winner),
          }}
        >
          <Text style={styles.winner}>
            {winner === "Tie" ? "Tie Game!" : `${winner} is the winner!`}
          </Text>
        </View>
      )}
      {/* Reset Button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderTopWidth: 0.5,
          borderTopColor: winnerColor(winner),
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        {Platform.OS === "web" ? (
          <WebButton onPress={resetGame} />
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 1,
            }}
          >
            {/* <Button title="Next Round" onPress={() => nextRound()} /> */}
            <Button title="Reset" color="red" onPress={() => resetGame()} />
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderTopWidth: 0.5,
          borderTopColor: winnerColor(winner),
          paddingBottom: 10,
          // top: 0,
        }}
      >
        <Button
          title="Back"
          color="green"
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

const winnerColor = (winner) => {
  switch (winner) {
    case "X":
      return "#00b0ffff";

    case "O":
      return "#e0bad7ff";

    case "Tie":
      return "#8892b0";

    default:
      return "#fff";
  }
};

export default GameBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "column",
    alignContent: "space-around",
  },
  score: {
    fontSize: 30,
    //// fontFamily: "MontserratLight",
    textAlign: "center",
  },
  alert: {
    color: "lightgreen",
    fontSize: 30,
    //// fontFamily: "MontserratLight",
    textAlign: "center",
  },
  winner: {
    color: "#000",
    fontSize: 30,
    //// fontFamily: "MontserratLight",
    textAlign: "center",
    paddingBottom: 10,
  },
  button: {
    color: "#007aff",
    textAlign: "center",
    margin: 8,
    fontSize: 18,
  },
});
