import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCartContext } from "../../hooks/useCartContext";
import { useCartStore } from "../../store/cartStore";

type Props = {};

const Badge = ({ count }: { count: number }) => {
  return (
    <View className="w-5 h-5 bg-red-500 absolute -top-4  -right-0 flex justify-center items-center   rounded-full">
      <Text className="text-xs text-white">{count}</Text>
    </View>
  );
};

export const Header = (props: Props) => {
  const navigation = useNavigation();
  const { cartItems, itemsCount } = useCartStore();

  const count = useMemo(() => itemsCount, [itemsCount]);

  return (
    <View className=" py-4 flex items-center flex-row justify-between px-2">
      <Feather name="user" size={24} color="black" />
      <View className="flex flex-row gap-x-4">
        <FontAwesome
          // @ts-ignore
          // onPress={() => navigation.navigate("LocationScreen")}
          name="map-marker"
          size={24}
          color="black"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          className="relative"
        >
          <Feather
            // @ts-ignore

            name="shopping-cart"
            size={24}
            color="black"
          />
          <Badge count={itemsCount} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
