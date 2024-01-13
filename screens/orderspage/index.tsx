import { View, Text } from "react-native";
import React from "react";
import { EmptyState } from "../../components";

type Props = {};

export const OrdersPage = (props: Props) => {
  return (
    <View>
      <EmptyState
        secondaryText="Order an item to track it here"
        description="No orders yet"
      />
    </View>
  );
};
