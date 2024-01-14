import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { EmptyState } from "../../components";
import MapView from "react-native-maps";

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
