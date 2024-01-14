import { View, Text, ScrollView } from "react-native";
import React from "react";

type Props = {};

export const Screen = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: string;
}) => {
  return (
    <ScrollView
      className={`flex flex-1 min-h-screen flex-col pt-12 bg-gray-200 px-4 ${style}`}
    >
      {children}
    </ScrollView>
  );
};
