// TODO: This will house Firebase methods, functions and state

import React, { useEffect, useState } from "react";

// Dependencies
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Button,
  Animated,
  Platform,
  TouchableOpacity,
} from "react-native";
import Column from "./Column";

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

const GameBoard = ({ navigation, data, setData }) => {
  // const [p1, setP1] = useState("X");
  // const [p2, setP2] = useState("O");

  const p1 = data.players.player1.name;
  const p2 = data.players.player2.name;

  const player1 = "X";

  // State
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [currentCell, setCurrentCell] = useState("");
  const [cellsOccupied, setCellsOccupied] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  // Player Move States
  const [p1Moves, setP1Moves] = useState([]);
  const [p2Moves, setP2Moves] = useState([]);

  const [score, setScore] = useState({
    p1: 0,
    p2: 0,
  });

  const p1Score = data.players.player1.score;
  const p2Score = data.players.player2.score;

  const [winner, setWinner] = useState();

  // On mount, check who created the room, then set the room creator as player 1 and X

  // Button for web only
  const WebButton = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>Reset</Text>
      </TouchableOpacity>
    );
  };

  // Function to update the board

  // next round
  const nextRound = async () => {
    const docRef = doc(db, "rooms", data.id);
    // Reset animation
    setAnimation(new Animated.Value(0));
    await updateDoc(docRef, {
      // Reset Symbol
      players: {
        // player1: {
        //   name: data.players.player1.name,
        //   score: data.players.player1.score,
        //   uid: data.players.player1.uid,
        //   symbol: "O",
        // },
        // player2: {
        //   name: data.players.player2.name,
        //   score: data.players.player2.score,
        //   uid: data.players.player2.uid,
        //   symbol: "X",
        // },

        // Swap player 1 and player 2
        player1: {
          name: data.players.player2.name,
          score: data.players.player2.score,
          uid: data.players.player2.uid,
          symbol: "X",
        },
        player2: {
          name: data.players.player1.name,
          score: data.players.player1.score,
          uid: data.players.player1.uid,
          symbol: "O",
        },
      }, // Reset p1 && p2 moves
      moves: {
        player1Moves: [],
        player2Moves: [],
      },
      // Reset cells occupied
      cellsOccupied: [],
      // Reset current player
      currentPlayer: "O",
      // Reset winner
      winner: "",
      // Reset isDisabled
      isDisabled: false,
      // Reset current cell
      currentCell: "",
    });
  };

  // Reset Game
  const resetGame = async () => {
    const docRef = doc(db, "rooms", data.id);
    // Reset animation
    setAnimation(new Animated.Value(0));
    await updateDoc(docRef, {
      // Reset ScoreS
      players: {
        player1: {
          name: data.players.player1.name,
          score: 0,
          uid: data.players.player1.uid,
          symbol: "X",
        },
        player2: {
          name: data.players.player2.name,
          score: 0,
          uid: data.players.player2.uid,
          symbol: "O",
        },
      },
      // Reset p1 && p2 moves
      moves: {
        player1Moves: [],
        player2Moves: [],
      },
      // Reset cells occupied
      cellsOccupied: [],
      // Reset current player
      currentPlayer: "X",
      // Reset winner
      winner: "",
      // Reset isDisabled
      isDisabled: false,
      // Reset current cell
      currentCell: "",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
          {p1 === "" || p1 === null || p1 === undefined ? "X" : p1} {p1Score}
        </Text>
        <Text style={[{ color: "#fff" }, styles.score]}>- </Text>
        <Text style={[{ color: "#e0bad7ff" }, styles.score]}>
          {p2Score} {p2 === "" || p2 === null || p2 === undefined ? "O" : p2}
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
          data={data}
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
          currentCell={currentCell}
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
          setAnimation={setAnimation}
        />
      </View>
      {data.winner && (
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
            // top: 0,
          }}
        >
          <Text style={styles.winner}>
            {data.winner === "Tie"
              ? "Tie Game!"
              : `${data.winner} is the winner!`}
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
          // top: 0,
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
            <Button title="Next Round" onPress={() => nextRound()} />
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
    // fontFamily: "MontserratLight",
    textAlign: "center",
  },
  alert: {
    color: "lightgreen",
    fontSize: 30,
    // fontFamily: "MontserratLight",
    textAlign: "center",
  },
  winner: {
    color: "#000",
    fontSize: 30,
    // fontFamily: "MontserratLight",
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
