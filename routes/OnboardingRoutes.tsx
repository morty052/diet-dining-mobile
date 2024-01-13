import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen, OnboardingScreen } from "../screens";
type OnboardingRoutesList = {
  SplashScreen: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<OnboardingRoutesList>();

const OnboardingRoutes = () => {
  return (
    <Stack.Navigator children screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingRoutes;
