import { Button, Input } from "@rneui/themed";
import React from "react";

// Dependencies
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { profanity } from "@2toad/profanity";

// Context
import { UserContext } from "../../../helpers/UserContext";
import { FirebaseContext } from "../../../helpers/FirebaseContext";

const CreateIdentity = ({ navigation }) => {
  // State
  const [name, setName] = React.useState("");

  // Context
  const [User, setUser] = React.useContext(UserContext);
  const Firebase = React.useContext(FirebaseContext);

  // Create User
  const createUser = async () => {
    // Check if name is profane
    if (profanity.exists(name)) {
      alert("Please enter a valid name.");
    } else {
      // Set name to User Context
      const createdUser = {
        name: name,
        uid: User.uid,
      };
      // Create User
      const user = await Firebase.signUp(createdUser);
      // Set User
      setUser(user);
      // Navigate to Home
      navigation.navigate("Multiplayer Stack");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Create your username</Text>
      </View>
      {/* Body */}
      <View style={styles.body}>
        <Input
          placeholder="Username"
          placeholderTextColor="gray"
          inputStyle={{
            color: "#fff",
          }}
          onChangeText={(text) => setName(text)}
          value={name}
          maxLength={15}
        />
        <Button
          title="Create"
          containerStyle={{
            marginTop: 20,
            borderRadius: 10,
          }}
          onPress={() => {
            if (
              !profanity.exists(name) &&
              name.length > 0 &&
              name.length < 15 &&
              name !== ""
            ) {
              setUser({
                ...User,
                name: name,
              });
              createUser();
              navigation.goBack();
            } else {
              alert("Invalid name, please try again.");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateIdentity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    // flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  body: {
    // flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
});
