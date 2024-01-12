import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "./routes/AppRoutes";
import OnboardingRoutes from "./routes/OnboardingRoutes";

type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // @ts-ignore
    <NavigationContainer>
      <AppRoutes />
      <StatusBar style="auto" backgroundColor="#fff" />
    </NavigationContainer>
  );
}
