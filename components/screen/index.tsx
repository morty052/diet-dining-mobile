import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

export const Screen = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: string;
}) => {
  return (
    <SafeAreaView className={`${style} flex-1`}>
      <ScrollView
        className={`flex w-full flex-1 min-h-screen flex-col px-2 pt-2  bg-gray-200`}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
