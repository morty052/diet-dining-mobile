import { View, Text, Pressable } from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
};

export const Button = ({ title, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white w-40 px-4 py-2 rounded-3xl inline-flex justify-center items-center"
    >
      <Text className="text-lg">{title}</Text>
    </Pressable>
  );
};
