import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart, Home, DietPlanner, OrdersPage, FoodScreen } from "../screens";
import OnboardingRoutes from "./OnboardingRoutes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import DietPlanner from "../screens/dietplanner";

type RootTabsParamList = {
  Home: undefined;
  Diet: undefined;
  Cart: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<RootTabsParamList>();

function AppTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} children>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Diet" component={DietPlanner} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={OrdersPage} />
    </Tab.Navigator>
  );
}

type RootStackParamList = {
  App: undefined;
  OnBoarding: undefined;
  FoodScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator children screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnboardingRoutes} />
      <Stack.Screen name="App" component={AppTabsNavigator} />
      <Stack.Screen name="FoodScreen" component={FoodScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
