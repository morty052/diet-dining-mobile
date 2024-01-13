import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./routes/AppRoutes";
import CartContextProvider from "./contexts/CartContext";

export default function App() {
  return (
    <CartContextProvider>
      {/* // @ts-ignore */}
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </CartContextProvider>
  );
}
