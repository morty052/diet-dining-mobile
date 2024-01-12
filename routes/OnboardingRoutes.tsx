import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens";
type OnboardingRoutesList = {
  SplashScreen: undefined;
};

const Stack = createNativeStackNavigator<OnboardingRoutesList>();

const OnboardingRoutes = () => {
  return (
    <Stack.Navigator children screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingRoutes;
