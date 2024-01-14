import { View, Text } from "react-native";
import React from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export const Header = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View className=" py-2 flex items-center flex-row justify-between px-2">
      <Feather name="user" size={24} color="black" />
      <View className="flex flex-row gap-x-4">
        <FontAwesome
          onPress={() => navigation.navigate("LocationScreen")}
          name="map-marker"
          size={24}
          color="black"
        />
        <Feather
          onPress={() => navigation.navigate("Cart")}
          name="shopping-cart"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
};
