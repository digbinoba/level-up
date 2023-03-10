import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import useFonts from "./hooks/useFonts";
export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component */}
      <AuthProvider>
        {/* Passes down authentification down to its children */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
