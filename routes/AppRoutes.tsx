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
import { Image } from "react-native";

import cart_icon from "../assets/icons/cart-icon.png";
import orders_icon from "../assets/icons/orders-icon.png";
import home_icon from "../assets/icons/home-icon.png";
import foodmenu_icon from "../assets/icons/foodmenu-icon.png";
import dietplanner_icon from "../assets/icons/dietplanner-icon.png";

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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => (
            //  <Feather name="home" size={24} color="black" />,
            <Image style={{ width: 30, height: 30 }} source={home_icon} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            // <MaterialIcons name="menu-book" size={24} color="black" />
            <Image style={{ width: 30, height: 30 }} source={foodmenu_icon} />
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
            // <Feather name="shopping-cart" size={24} color="black" />
            <Image style={{ width: 30, height: 30 }} source={cart_icon} />
          ),
          tabBarBadge: itemsCount > 0 ? itemsCount : undefined,
        }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            // <MaterialIcons name="fastfood" size={24} color="black" />
            <Image
              style={{ width: 30, height: 30 }}
              source={dietplanner_icon}
            />
          ),
        }}
        name="Diet"
        component={DietPlanner}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            // <MaterialIcons name="menu-book" size={24} color="black" />
            <Image style={{ width: 30, height: 30 }} source={orders_icon} />
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
