import { View, Text } from "react-native";
import React from "react";
import { Screen } from "../../components";
import { SearchBar } from "../../components";
import { Feather } from "@expo/vector-icons";

const FoodmenuHeader = () => {
  return (
    <View className="pb-2 flex-row justify-between items-center">
      <Feather name="chevron-left" size={24} color="black" />
      <View className="flex-1 pr-4">
        <Text className="text-center text-lg">Menu</Text>
      </View>
    </View>
  );
};

export function FoodMenu() {
  return (
    <Screen>
      <FoodmenuHeader />
      <View className="pt-4">
        <SearchBar />
        <Text>index</Text>
      </View>
    </Screen>
  );
}
