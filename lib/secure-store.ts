import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

export default { save, getValueFor };
