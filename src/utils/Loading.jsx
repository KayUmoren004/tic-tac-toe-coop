import { useEffect, useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { UserContext } from "../helpers/UserContext";
import { FirebaseContext } from "../helpers/FirebaseContext";

const Loading = () => {
  // Context
  const [_, setUser] = useContext(UserContext);
  const Firebase = useContext(FirebaseContext);

  const currentUser = async () => {
    const user = Firebase.getCurrentUser();

    if (user) {
      const uid = user.uid;
      const doc = await Firebase.getUserData(uid);
      if (doc) {
        const authUser = {
          name: doc.name,
          uid: uid,
          isLoggedIn: true,
        };
        setUser(authUser);
      } else {
        console.log("Error @Loading.currentUser: User not found.");
      }
    } else {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };

  const AuthState = () => {
    return Firebase.checkAuth((user) => {
      if (user) {
        currentUser();
      } else {
        setUser((state) => ({ ...state, isLoggedIn: false }));
      }
    });
  };

  // Get User
  useEffect(() => {
    setTimeout(async () => {
      AuthState();
    }, 500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 32,
          textAlign: "center",
        }}
      >
        Tic Tac Toe{"\n"}
        Version 1.0
      </Text>

      <ActivityIndicator
        size="large"
        color="#fff"
        style={{
          width: "100%",
          marginTop: 32,
        }}
      />
    </View>
  );
};

export default Loading;
