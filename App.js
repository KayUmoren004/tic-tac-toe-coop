import Router from "./src/components/Router";
import { FirebaseProvider } from "./src/helpers/FirebaseContext";
import { UserProvider } from "./src/helpers/UserContext";

export default function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </FirebaseProvider>
  );
}
