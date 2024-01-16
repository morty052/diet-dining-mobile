import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useMemo } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { EmptyState } from "../../components";
import { useCartStore } from "../../store/cartStore";
import { TcartItem } from "../../contexts/CartContext";

type Props = {};

const CheckoutButton = () => {
  const { cartItems, getCartTotal } = useCartStore();

  const total = useMemo(() => getCartTotal(), [cartItems]);
  const cartIsEmpty = useMemo(() => cartItems.length == 0, [cartItems]);

  const navigate = useNavigation();

  return (
    <View className="absolute bg-white  bottom-0 left-0 right-0 pb-10 pt-6 space-y-5 border-gray-300 px-4 border-t">
      <View className="flex-row items-center justify-between">
        <Text className="text-center font-medium text-2xl text-dark">
          Total:
        </Text>
        <Text className="text-center font-medium text-2xl text-dark">
          ${total}
        </Text>
      </View>
      <TouchableOpacity
        onPress={
          cartIsEmpty
            ? () => navigate.navigate("Home")
            : () => navigate.navigate("Checkout")
        }
        className=" inline-flex border py-4 rounded-lg bg-dark px-4 justify-center items-center"
      >
        <Text className=" text-white text-xl font-medium">
          {!cartIsEmpty ? "Checkout" : "Continue Shopping"}
        </Text>
      </TouchableOpacity>
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
        {/* <View className="border h-8 w-8 rounded-full flex justify-center items-center">
        </View> */}
        <AntDesign size={20} color="black" name="arrowleft" />
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
  handleReduceQuantity: any;
  handleIncreaseQuantity: any;
}) => {
  return (
    <View className="pt-4  flex-row items-center justify-between">
      <View className=" flex-1">
        <Text className="text-xl font-medium text-dark">{name}</Text>
        <Text className="text-lg  text-dark">${total}</Text>
        <View className="flex-row items-center space-x-2 ">
          <TouchableOpacity onPress={handleReduceQuantity}>
            <AntDesign name="minuscircleo" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg text-dark">{quantity}</Text>
          <TouchableOpacity onPress={handleIncreaseQuantity}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="relative">
        <Image resizeMode="contain" className="h-32 w-40" source={image} />
        <View className=" absolute top-0 right-2 rounded-full flex justify-center items-center h-8 w-8 bg-dark">
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
    <View className="space-y-4">
      {cartItems?.map((item: TcartItem, index: number) => (
        <View key={index}>
          <CheckOutItem
            handleIncreaseQuantity={() => increaseItemQuantity(item._id)}
            handleReduceQuantity={() => decreaseItemQuantity(item._id)}
            total={item.total}
            name={item.name}
            quantity={item.quantity}
            image={item.image}
          />
        </View>
      ))}
    </View>
  );
};

export const Cart = (props: Props) => {
  const { cartItems, decreaseItemQuantity, increaseItemQuantity } =
    useCartStore();

  console.info(cartItems);

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
