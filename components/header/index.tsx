import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

type Props = {};

export const Header = (props: Props) => {
  return (
    <View className=" py-2 flex items-center flex-row justify-between px-2">
      <Feather name="user" size={24} color="black" />
      <View className="flex flex-row gap-x-4">
        <Feather name="bell" size={24} color="black" />
        <Feather name="shopping-cart" size={24} color="black" />
      </View>
    </View>
  );
};
