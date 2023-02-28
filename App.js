import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
export default function App() {
  return (
    <NavigationContainer>
    {/* HOC - Higher Order Component */}
      <AuthProvider > 
      {/* Passes down authentification down to its children */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
