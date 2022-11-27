import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

// Screens
import SinglePlayer from "./SinglePlayer";
import Multiplayer from "./Multiplayer";
import Local from "./Local";

const App = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        {/* Header View */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Tic Tac Toe</Text>
          <Text style={styles.introText}>
            Play Tic Tac Toe against the bot or your friend
          </Text>
        </View>
        {/* Game Type View */}
        <View style={styles.gameType}>
          <TouchableOpacity
            style={styles.gameTypeButton}
            onPress={() => navigation.navigate("Local")}
          >
            <Text style={styles.gameTypeButtonText}>Local</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gameTypeButton}
            onPress={() => navigation.navigate("Single Player")}
          >
            <Text style={styles.gameTypeButtonText}>Single Player</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gameTypeButton}
            onPress={() => navigation.navigate("Multiplayer")}
          >
            <Text style={styles.gameTypeButtonText}>Multiplayer</Text>
          </TouchableOpacity>
        </View>
        {/* Footer View */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Godson Umoren - v2 - 2022</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={App}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Local"
          component={Local}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Single Player"
          component={SinglePlayer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Multiplayer"
          component={Multiplayer}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    // flex: 1,
    // backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  introText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
    marginBottom: 10,
  },
  gameType: {
    flex: 1,
    // backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 20,
  },
  gameTypeText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  footer: {
    // flex: 1,
    // backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "200",
    textAlign: "center",
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

export default Router;
