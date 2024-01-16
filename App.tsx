import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./routes/AppRoutes";
import CartContextProvider from "./contexts/CartContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import { useFonts, loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <ClerkProvider
      publishableKey={"pk_test_c3RlYWR5LWNyb3ctNjIuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
      <CartContextProvider>
        {/* // @ts-ignore */}
        <RootSiblingParent>
          <NavigationContainer>
            <AppRoutes />
          </NavigationContainer>
        </RootSiblingParent>
      </CartContextProvider>
    </ClerkProvider>
  );
}
