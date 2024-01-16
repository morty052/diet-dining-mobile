import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Cart,
  Home,
  DietPlanner,
  OrdersPage,
  FoodScreen,
  LocationScreen,
  FoodMenu,
  CheckoutScreen,
} from "../screens";
import OnboardingRoutes from "./OnboardingRoutes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import DietPlanner from "../screens/dietplanner";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useCartContext } from "../hooks/useCartContext";
import { useMemo } from "react";
import { useCartStore } from "../store/cartStore";

type RootTabsParamList = {
  Home: undefined;
  Diet: undefined;
  Cart: undefined;
  Orders: undefined;
  FoodMenu: undefined;
};

const Tab = createBottomTabNavigator<RootTabsParamList>();

function AppTabsNavigator() {
  const { itemsCount } = useCartStore();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => <Feather name="home" size={24} color="black" />,
        }}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="menu-book" size={24} color="black" />
          ),
          title: "Menu",
        }}
        name="FoodMenu"
        component={FoodMenu}
      />

      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <Feather name="shopping-cart" size={24} color="black" />
          ),
          tabBarBadge: itemsCount > 0 ? itemsCount : undefined,
        }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="fastfood" size={24} color="black" />
          ),
        }}
        name="Diet"
        component={DietPlanner}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="menu-book" size={24} color="black" />
          ),
        }}
        name="Orders"
        component={OrdersPage}
      />
    </Tab.Navigator>
  );
}

type RootStackParamList = {
  App: undefined;
  OnBoarding: undefined;
  FoodScreen: undefined;
  LocationScreen: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnboardingRoutes} />
      <Stack.Screen name="App" component={AppTabsNavigator} />
      <Stack.Screen name="FoodScreen" component={FoodScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
