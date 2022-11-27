import React from "react";

// Dependencies
import { Pressable, StyleSheet, Text, View } from "react-native";

const Cell = ({
  input,
  type,
  onPress,
  onPressIn,
  onPressOut,
  isDisabled,
  textColor,
  ...otherProps
}) => {
  const CellType = () => {
    switch (type) {
      case "LTE":
        return styles.LeftTopEdgeCell;

      case "LME":
        return styles.LeftMiddleEdgeCell;

      case "LBE":
        return styles.LeftBottomEdgeCell;

      case "CTC":
        return styles.CenterTopCell;

      case "CMC":
        return styles.CenterMiddleCell;

      case "CBC":
        return styles.CenterBottomCell;

      case "RTE":
        return styles.RightTopEdgeCell;

      case "RME":
        return styles.RightMiddleEdgeCell;

      case "RBE":
        return styles.RightBottomEdgeCell;

      default:
        return styles.CenterMiddleCell;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={CellType()}
      disabled={isDisabled}
    >
      <Text
        style={{
          fontSize: 70,
          // // fontFamily: "MontserratBold",
          textAlign: "center",
          color: textColor,
        }}
        {...otherProps}
      >
        {input}
      </Text>
    </Pressable>
  );
};

export default Cell;

const styles = StyleSheet.create({
  container: {
    borderColor: "#fff",
    height: 100,
    width: 100,
  },
  input: {
    fontSize: 70,
    // // fontFamily: "MontserratBold",
    textAlign: "center",
  },
  LeftTopEdgeCell: {
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    height: 100,
    width: 100,
  },
  LeftMiddleEdgeCell: {
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    height: 100,
    width: 100,
  },
  LeftBottomEdgeCell: {
    borderColor: "#fff",
    borderLeftWidth: 0,
    borderRightWidth: 5,
    borderTopWidth: 5,
    height: 100,
    width: 100,
  },
  RightTopEdgeCell: {
    borderColor: "#fff",
    borderLeftWidth: 5,
    borderRightWidth: 0,
    borderBottomWidth: 5,
    height: 100,
    width: 100,
  },
  RightMiddleEdgeCell: {
    borderColor: "#fff",
    borderLeftWidth: 5,
    borderRightWidth: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    height: 100,
    width: 100,
  },
  RightBottomEdgeCell: {
    borderColor: "#fff",
    borderLeftWidth: 5,
    borderRightWidth: 0,
    borderTopWidth: 5,
    height: 100,
    width: 100,
  },
  CenterTopCell: {
    borderColor: "#fff",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    height: 100,
    width: 100,
  },
  CenterMiddleCell: {
    borderColor: "#fff",
    borderWidth: 5,
    height: 100,
    width: 100,
  },
  CenterBottomCell: {
    borderColor: "#fff",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    height: 100,
    width: 100,
  },
});
