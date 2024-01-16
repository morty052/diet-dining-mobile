import { View, Text, TextInput } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
type Props = {};

export const SearchBar = (props: Props) => {
  return (
    <View className=" rounded-2xl flex flex-row items-center border border-gray-300 bg-white   px-4 ">
      <Feather name="search" size={24} color="black" />
      <TextInput
        placeholder="Food, drinks, etc..."
        className=" bg-transparent flex-1 text-center placeholder:text-left text-lg py-2 border-r border-gray-300 mx-2  "
      />
      <Feather name="settings" size={24} color="black" />
    </View>
  );
};
