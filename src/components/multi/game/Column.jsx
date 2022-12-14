// TODO: FIX TO ALLOW ONLY ONE PLAYER TO ONE DEVICE

import React, { useState } from "react";

// Dependencies
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";

import {
  LeftColumn,
  RightColumn,
  CenterColumn,
} from "../../../utils/CellNames";
import Cell from "../../Cell";

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

// Context
import { UserContext } from "../../../helpers/UserContext";

import {
  diagWinCase1,
  diagWinCase2,
  horWinCase1,
  horWinCase2,
  horWinCase3,
  vertWinCase1,
  vertWinCase2,
  vertWinCase3,
} from "../../../utils/Wins";

const Column = ({ animation, data }) => {
  // Context
  const [User] = React.useContext(UserContext);

  // Functions
  const updateBoard = async (cell) => {
    // Update the board
    const docRef = doc(db, "rooms", data.id);
    try {
      if (data.currentPlayer === "X") {
        await updateDoc(docRef, {
          // Set current cell
          currentCell: cell,
          // Add cell to cells occupied
          cellsOccupied: [...data.cellsOccupied, cell],
          // Set blocked player to player 1
          blockedPlayer: data.players.player1.uid,
          // Set current player to player 2
          currentPlayer: "O",
          // Add cell to player 1 moves
          moves: {
            ...data.moves,
            player1Moves: [...data.moves.player1Moves, cell],
          },
        });
        checkForWin();
      } else {
        await updateDoc(docRef, {
          // Set current cell
          currentCell: cell,
          // Add cell to cells occupied
          cellsOccupied: [...data.cellsOccupied, cell],
          // Set blocked player to player 2
          blockedPlayer: data.players.player2.uid,
          // Set current player to player 1
          currentPlayer: "X",
          // Add cell to player 2 moves
          moves: {
            ...data.moves,
            player2Moves: [...data.moves.player2Moves, cell],
          },
        });

        //TODO:  Check for winner
        checkForWin();
      }
    } catch (err) {
      console.log("Error @Gameboard.updateBoard: ", err.message);
    }
  };

  // if array contains array
  const compareArrays = (a, b) => {
    let newArray = [];
    for (let i = 0; i < b.length; i++) {
      if (a.includes(b[i])) {
        newArray.push(b[i]);
      }
    }
    // if new array length is equal to b array length and new array elements is equal to b array, return true
    if (newArray.length === b.length && newArray.every((v) => b.includes(v))) {
      return true;
    }
    return false;
  };

  // START: Make compatible for online multiplayer

  const cellPress = () => {
    // Check if player has won
    // TODO: Check for blocked player
    //TODO:  Check for winner
    checkForWin();
  };

  // Convert to multi-player compatible
  const cellPressIn = (cellName) => {
    // TODO: Check for blocked player

    if (data.currentPlayer === "X") {
      // check if blocked player is player 1
      if (data.blockedPlayer === data.players.player1.uid) {
        return;
      } else {
        if (data.cellsOccupied.includes(cellName)) {
          return;
        } else {
          // Update the board
          updateBoard(cellName);
        }
      }
    } else {
      // check if blocked player is player 2
      if (data.blockedPlayer === data.players.player2.uid) {
        return;
      } else {
        if (data.cellsOccupied.includes(cellName)) {
          return;
        } else {
          // Update the board
          updateBoard(cellName);
        }
      }
    }
  };

  const cellPressOut = () => {
    // TODO: Check for blocked player

    checkForWin();
    //TODO:  Check for winner
  };

  // TODO: Change to multi-player compatible

  const checkForWin = async () => {
    // if player 1 wins diagonally
    if (data.moves.player1Moves.length >= 2) {
      if (
        compareArrays(data.moves.player1Moves, diagWinCase1) ||
        compareArrays(data.moves.player1Moves, diagWinCase2)
      ) {
        const docRef = doc(db, "rooms", data.id);
        // Set Winner to Player 1
        await updateDoc(docRef, {
          winner: data.players.player1.name,
        });
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }).start();
        // Set Score
        await updateDoc(docRef, {
          players: {
            player1: {
              name: data.players.player1.name,
              score: data.players.player1.score + 1,
              uid: data.players.player1.uid,
            },
            player2: {
              name: data.players.player2.name,
              score: data.players.player2.score,
              uid: data.players.player2.uid,
            },
          },
        });
        console.log(`Diag: ${data.players.player1.name} has won!`);
        // Disable board
        await updateDoc(docRef, {
          isDisabled: true,
        });
        return false;
      }
    }

    // if player 2 wins diagonally
    if (data.moves.player2Moves.length >= 2) {
      if (
        compareArrays(data.moves.player2Moves, diagWinCase1) ||
        compareArrays(data.moves.player2Moves, diagWinCase2)
      ) {
        const docRef = doc(db, "rooms", data.id);
        // Set Winner to Player 2
        await updateDoc(docRef, {
          winner: data.players.player2.name,
        });
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }).start();
        // Set Score
        await updateDoc(docRef, {
          players: {
            player1: {
              name: data.players.player1.name,
              score: data.players.player1.score,
              uid: data.players.player1.uid,
            },
            player2: {
              name: data.players.player2.name,
              score: data.players.player2.score + 1,
              uid: data.players.player2.uid,
            },
          },
        });
        console.log(`Diag: ${data.players.player2.name} has won!`);
        // Disable board
        await updateDoc(docRef, {
          isDisabled: true,
        });
        return false;
      }
    }

    // if player 1 wins horizontally
    if (data.moves.player1Moves.length >= 2) {
      if (
        compareArrays(data.moves.player1Moves, horWinCase1) ||
        compareArrays(data.moves.player1Moves, horWinCase2) ||
        compareArrays(data.moves.player1Moves, horWinCase3)
      ) {
        const docRef = doc(db, "rooms", data.id);
        // Set Winner to Player 1
        await updateDoc(docRef, {
          winner: data.players.player1.name,
        });
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }).start();
        // Set Score
        await updateDoc(docRef, {
          players: {
            player1: {
              name: data.players.player1.name,
              score: data.players.player1.score + 1,
              uid: data.players.player1.uid,
            },
            player2: {
              name: data.players.player2.name,
              score: data.players.player2.score,
              uid: data.players.player2.uid,
            },
          },
        });
        console.log(`Hor: ${data.players.player1.name} has won!`);
        // Disable board
        await updateDoc(docRef, {
          isDisabled: true,
        });
        return false;
      }
    }

    // if player 2 wins horizontally
    if (data.moves.player2Moves.length >= 2) {
      if (
        compareArrays(data.moves.player2Moves, horWinCase1) ||
        compareArrays(data.moves.player2Moves, horWinCase2) ||
        compareArrays(data.moves.player2Moves, horWinCase3)
      ) {
        const docRef = doc(db, "rooms", data.id);
        // Set Winner to Player 2
        await updateDoc(docRef, {
          winner: data.players.player2.name,
        });
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }).start();
        // Set Score
        await updateDoc(docRef, {
          players: {
            player1: {
              name: data.players.player1.name,
              score: data.players.player1.score,
              uid: data.players.player1.uid,
            },
            player2: {
              name: data.players.player2.name,
              score: data.players.player2.score + 1,
              uid: data.players.player2.uid,
            },
          },
        });
        console.log(`Hor: ${data.players.player2.name} has won!`);
        // Disable board
        await updateDoc(docRef, {
          isDisabled: true,
        });
        return false;
      }
    }

    // if player 1 wins vertically
    if (data.moves.player1Moves.length >= 2) {
      if (
        compareArrays(data.moves.player1Moves, vertWinCase1) ||
        compareArrays(data.moves.player1Moves, vertWinCase2) ||
        compareArrays(data.moves.player1Moves, vertWinCase3)
      ) {
        const docRef = doc(db, "rooms", data.id);
        // Set Winner to Player 1
        await updateDoc(docRef, {
          winner: data.players.player1.name,
        });
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }).start();
        // Set Score
        await updateDoc(docRef, {
          players: {
            player1: {
              name: data.players.player1.name,
              score: data.players.player1.score + 1,
              uid: data.players.player1.uid,
            },
            player2: {
              name: data.players.player2.name,
              score: data.players.player2.score,
              uid: data.players.player2.uid,
            },
          },
        });
        console.log(`Ver: ${data.players.player1.name} has won!`);
        // Disable board
        await updateDoc(docRef, {
          isDisabled: true,
        });
        return false;
      }
    }

    // if player 2 wins vertically
    if (data.moves.player2Moves.length >= 2) {
      if (
        compareArrays(data.moves.player2Moves, vertWinCase1) ||
        compareArrays(data.moves.player2Moves, vertWinCase2) ||
        compareArrays(data.moves.player2Moves, vertWinCase3)
      ) {
        const docRef = doc(db, "rooms", data.id);
        // Set Winner to Player 2
        await updateDoc(docRef, {
          winner: data.players.player2.name,
        });
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }).start();
        // Set Score
        await updateDoc(docRef, {
          players: {
            player1: {
              name: data.players.player1.name,
              score: data.players.player1.score,
              uid: data.players.player1.uid,
            },
            player2: {
              name: data.players.player2.name,
              score: data.players.player2.score + 1,
              uid: data.players.player2.uid,
            },
          },
        });
        console.log(`Ver: ${data.players.player2.name} has won!`);
        // Disable board
        await updateDoc(docRef, {
          isDisabled: true,
        });
        return false;
      }
    }

    // If no one wins
    if (data.moves.player1Moves.length + data.moves.player2Moves.length === 9) {
      const docRef = doc(db, "rooms", data.id);
      // Set Winner to Tie
      await updateDoc(docRef, {
        winner: "Tie",
      });
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      console.log("Tie!");
      // Disable board
      await updateDoc(docRef, {
        isDisabled: true,
      });
      return false;
    }
  };

  // STOP

  // TODO: Change for multiplayer
  const setInput = (cellName) => {
    return data.moves.player1Moves.includes(cellName)
      ? "X"
      : "" || data.moves.player2Moves.includes(cellName)
      ? "O"
      : "";
  };

  // TODO: Change for multiplayer

  // Dynamically set text color based on player turn
  const setTextColor = (cellName) => {
    return data.currentPlayer === "X"
      ? data.moves.player1Moves.includes(cellName)
        ? "#00b0ffff"
        : "#e0bad7ff"
      : data.moves.player2Moves.includes(cellName)
      ? "#e0bad7ff"
      : "#00b0ffff";
  };

  // TODO: Change for multiplayer

  // Dynamically change background color based on the winner
  const setBoardColor = () => {
    switch (data.winner) {
      case data.players.player1.name:
        return p1Wins;
      case "O":
        return p2Wins;
      case data.players.player2.name:
        return tie;
      default:
        return styles.container;
    }
  };

  const p1Wins = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(224, 186, 215, 0)", "rgba(224, 186, 215, 1)"],
    }),
    flexDirection: "row",
    borderColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(224, 186, 215, 0)", "rgba(224, 186, 215, 1)"],
    }),
    borderRadius: 25 / 2,
    // borderWidth: 25,
  };
  const p2Wins = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(0, 176, 255, 0)", "rgba(0, 176, 255, 1)"],
    }),
    flexDirection: "row",
    borderColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(0, 176, 255, 0)", "rgba(0, 176, 255, 1)"],
    }),
    borderRadius: 25 / 2,
  };
  const tie = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(136, 146, 176, 0)", "rgba(136, 146, 176, 1)"],
    }),
    flexDirection: "row",
    borderColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(136, 146, 176, 0)", "rgba(136, 146, 176, 1)"],
    }),
    borderRadius: 25 / 2,
  };

  const disableCell = () => {
    if (data.isDisabled) {
      return true;
    }

    if (User.uid === data.blockedPlayer) {
      return true;
    }

    return false;
  };
  return (
    <Animated.View style={setBoardColor()}>
      <View>
        {
          // Map LeftColumn to Cell components
          LeftColumn.map((cellName, index) => {
            return (
              <Cell
                key={index}
                type={cellName}
                onPress={() => cellPress()}
                onPressIn={() => cellPressIn(cellName)}
                onPressOut={() => cellPressOut()}
                input={setInput(cellName)}
                isDisabled={disableCell()}
                textColor={setTextColor(cellName)}
              />
            );
          })
        }
      </View>
      <View>
        {
          // Map CenterColumn to Cell components
          CenterColumn.map((cellName, index) => {
            return (
              <Cell
                key={index}
                type={cellName}
                onPress={() => cellPress()}
                onPressIn={() => cellPressIn(cellName)}
                onPressOut={() => cellPressOut()}
                input={setInput(cellName)}
                isDisabled={disableCell()}
                textColor={setTextColor(cellName)}
              />
            );
          })
        }
      </View>
      <View>
        {
          // Map RightColumn to Cell components
          RightColumn.map((cellName, index) => {
            return (
              <Cell
                key={index}
                type={cellName}
                onPress={() => cellPress()}
                onPressIn={() => cellPressIn(cellName)}
                onPressOut={() => cellPressOut()}
                input={setInput(cellName)}
                isDisabled={disableCell()}
                textColor={setTextColor(cellName)}
              />
            );
          })
        }
      </View>
    </Animated.View>
  );
};

export default Column;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
