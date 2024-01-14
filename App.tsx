import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./routes/AppRoutes";
import CartContextProvider from "./contexts/CartContext";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function App() {
  return (
    <ClerkProvider
      publishableKey={"pk_test_c3RlYWR5LWNyb3ctNjIuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
      <CartContextProvider>
        {/* // @ts-ignore */}
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </CartContextProvider>
    </ClerkProvider>
  );
}
