import {
  ImageSourcePropType,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { TcartItem } from "../../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";

function AddToCartButton({
  addToCart,
  _id,
  cartItems,
}: {
  addToCart: (t: any) => void;
  _id: string;
  cartItems: TcartItem[];
}) {
  const count = useMemo(() => {
    const cartItem = cartItems?.find((cartItem: any) => cartItem._id == _id);

    if (cartItem) {
      return cartItem.quantity;
    }

    return false;
  }, [cartItems, _id]);

  return (
    <TouchableOpacity
      onPress={addToCart}
      className=" border px-4 w-32 inline-flex items-center py-2 rounded-3xl border-dark"
    >
      <Text className="text-xs font-medium">
        {count ? ` (${count}) In Cart` : "Add to cart"}
      </Text>
    </TouchableOpacity>
  );
}
function LikeButton({ setLiked, liked }: any) {
  return (
    <Pressable
      onPress={() => setLiked(!liked)}
      className="absolute top-2 right-4"
    >
      <Feather name="heart" size={24} color={liked ? "red" : "black"} />
    </Pressable>
  );
}

export function DishPreviewCard({
  title,
  image,
  addToCart,
  _id,
  cartItems,
  direction,
}: {
  title: string;
  image: ImageSourcePropType;
  _id: string;
  addToCart: (t: any) => void;
  cartItems: TcartItem[];
  direction?: boolean;
}) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState();

  return (
    <Pressable
      className={`flex-1   w-[80vw] ${!direction ? "mr-6" : "mb-6 w-full"}`}
    >
      <Pressable
        onPress={() =>
          // @ts-ignore
          navigation.navigate("FoodScreen", {
            _id: _id,
            title: title,
            image: image,
          })
        }
        className="relative"
      >
        <Image
          source={image}
          className="w-full  h-56 rounded-xl     object-cover"
        />

        {/* OVERLAY */}
        <View className="absolute rounded-xl top-0 bottom-0 left-0 right-0 bg-black/20 "></View>
      </Pressable>
      {/* LIKEBUTTON */}
      <LikeButton liked={liked} setLiked={setLiked} />
      <View className="py-2 flex flex-row items-center justify-between">
        <View className="flex">
          <Text className=" font-medium">{title}</Text>
          <Text className="text-lg">$15.00</Text>
        </View>
        <AddToCartButton
          cartItems={cartItems}
          _id={_id}
          addToCart={addToCart}
        />
      </View>
    </Pressable>
  );
}
