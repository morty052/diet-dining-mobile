import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useMemo } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import desserts from "../../assets/desserts.png";
import burger from "../../assets/test.png";
import { useCartContext } from "../../hooks/useCartContext";
import { EmptyState } from "../../components";

type Props = {};

const CheckoutButton = () => {
  const { getCartTotal } = useCartContext();
  const cartTotal = getCartTotal();
  return (
    <View className="absolute bg-white  bottom-0 left-0 right-0 pb-10 pt-6 space-y-5 border-gray-300 px-4 border-t">
      <View className="flex-row items-center justify-between">
        <Text className="text-center font-medium text-2xl text-dark">
          Total:
        </Text>
        <Text className="text-center font-medium text-2xl text-dark">
          ${cartTotal}
        </Text>
      </View>
      <Pressable className=" inline-flex border py-4 rounded-lg bg-dark px-4 justify-center items-center">
        <Text className=" text-white text-xl font-medium">Checkout</Text>
      </Pressable>
    </View>
  );
};

const BackButtonheader = () => {
  const navigation = useNavigation();
  return (
    <View className="px-1 pt-12 ">
      <Pressable
        className=" flex flex-row justify-between items-center"
        onPress={() => navigation.goBack()}
      >
        <View className="border h-8 w-8 rounded-full flex justify-center items-center">
          <FontAwesome size={20} color="black" name="close" />
        </View>
      </Pressable>
    </View>
  );
};

const CheckOutItem = ({
  image,
  name,
  quantity,
  total,
  handleReduceQuantity,
  handleIncreaseQuantity,
}: {
  image: any;
  name: string;
  quantity: number;
  total: number;
  handleReduceQuantity: () => void;
  handleIncreaseQuantity: () => void;
}) => {
  return (
    <View className="pt-16 pr-2 flex-row items-center justify-between">
      <View className=" flex-1">
        <Text className="text-lg font-medium">{name}</Text>
        <Text className="text-lg font-medium">${total}</Text>
        <View className="flex-row items-center space-x-4 pt-4">
          <FontAwesome
            onPress={handleReduceQuantity}
            size={20}
            name="minus-circle"
          />
          <Text className="text-lg text-dark">{quantity}</Text>
          <FontAwesome
            onPress={handleIncreaseQuantity}
            size={20}
            name="plus-circle"
          />
        </View>
      </View>
      <View className="relative">
        <Image className="h-24 w-24" source={image} />
        <View className=" absolute -top-6 right-0 rounded-full flex justify-center items-center h-8 w-8 bg-dark">
          <Text className="text-white">{quantity}</Text>
        </View>
      </View>
    </View>
  );
};

const InnerCart = ({
  cartItems,
  increaseItemQuantity,
  decreaseItemQuantity,
}: {
  cartItems: any;
  increaseItemQuantity: (t: any) => void;
  decreaseItemQuantity: (t: any) => void;
}) => {
  return (
    <View className="space-y-10">
      {cartItems?.map((item, index) => (
        <View key={index}>
          <CheckOutItem
            handleIncreaseQuantity={() => increaseItemQuantity(item._id)}
            handleReduceQuantity={() => decreaseItemQuantity(item._id)}
            total={item.total}
            name={item.name}
            quantity={item.quantity}
            image={burger}
          />
        </View>
      ))}
    </View>
  );
};

export const Cart = (props: Props) => {
  const { cartItems, decreaseItemQuantity, increaseItemQuantity } =
    useCartContext();

  const emptyCart = useMemo(() => {
    if (cartItems.length < 1) {
      return true;
    } else return false;
  }, [cartItems]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
          paddingHorizontal: 8,
        }}
      >
        <BackButtonheader />
        {!emptyCart ? (
          <InnerCart
            cartItems={cartItems}
            increaseItemQuantity={increaseItemQuantity}
            decreaseItemQuantity={decreaseItemQuantity}
          />
        ) : (
          <EmptyState
            secondaryText="Add items to your cart to see them here"
            description="Your cart is empty"
          />
        )}
      </ScrollView>
      <CheckoutButton />
    </>
  );
};
