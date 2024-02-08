import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Screen } from "../../components";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCartStore } from "../../store/cartStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import checkOutimage from "../../assets/ordercomplete.png";
import paperPlane from "../../assets/lottie/paperplane.json";
import fryingPan from "../../assets/lottie/fryingpan.json";
import LottieView from "lottie-react-native";

const BackButtonheader = () => {
  const navigation = useNavigation();
  return (
    <View className="px-1 pt-4 ">
      <Pressable
        className=" flex flex-row justify-between items-center"
        onPress={() => navigation.goBack()}
      >
        {/* <View className="border h-8 w-8 rounded-full flex justify-center items-center">
        </View> */}
        <AntDesign size={20} color="black" name="arrowleft" />
        <View className="flex-1 justify-center items-center text-center pr-4">
          <Text className="text-lg font-medium text-dark">Checkout</Text>
        </View>
      </Pressable>
    </View>
  );
};

const CheckoutButton = ({ handleCheckout }: { handleCheckout: () => void }) => {
  const { cartItems, getCartTotal } = useCartStore();

  const total = useMemo(() => getCartTotal(), [cartItems]);
  const cartIsEmpty = useMemo(() => cartItems.length == 0, [cartItems]);

  const navigate = useNavigation();

  return (
    <View className="absolute bg-white  bottom-0 left-0 right-0 pb-2  pt-4 space-y-5 border-gray-300 px-4 border-t">
      <View className="flex-row items-center justify-between">
        <Text className="text-center font-medium text-2xl text-dark">
          Total:
        </Text>
        <Text className="text-center font-medium text-2xl text-dark">
          ${total}
        </Text>
      </View>
      <TouchableOpacity
        onPress={cartIsEmpty ? () => navigate.navigate("Home") : handleCheckout}
        className=" inline-flex border py-4 rounded-lg bg-dark px-4 justify-center items-center"
      >
        <Text className=" text-white text-xl font-medium">
          {!cartIsEmpty ? "Confirm Order" : "Continue Shopping"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PriorityBox = ({ title }: { title: string }) => {
  return (
    <View className="flex-row border p-4 my-2 border-dark items-center space-x-2 rounded">
      <Text className="text-dark text-[17px]">{title}</Text>
    </View>
  );
};

function CheckOutCompleteScreen() {
  const BackButtonheader = () => {
    const navigation = useNavigation();
    return (
      <View className="px-2 pt-4 ">
        <Pressable
          className=" flex flex-row justify-between items-center"
          onPress={() => navigation.navigate("Home")}
        >
          {/* <View className="border h-8 w-8 rounded-full flex justify-center items-center">
          </View> */}
          <AntDesign size={30} color="black" name="closecircleo" />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView className="bg-white flex-1 h-screen relative">
        <BackButtonheader />
        <View className="pt-20">
          <Text className="text-3xl text-center font-bold text-dark">
            Thanks for your Order!
          </Text>
          <Text className="text-2xl text-center font-medium text-dark">
            Its on the way
          </Text>
        </View>
        <LottieView
          loop
          autoPlay
          source={paperPlane}
          style={{ height: 300, width: 300, alignSelf: "center" }}
        />
        <View className="absolute w-full bottom-0 -right-10">
          <Image
            resizeMode="cover"
            className="w-full h-96"
            source={checkOutimage}
          />
        </View>
      </SafeAreaView>
      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
}

function CheckoutLoading() {
  return (
    <>
      <SafeAreaView className="bg-white flex-1 h-screen relative">
        <View className="pt-20 pb-8 px-4">
          <Text className="text-3xl text-center font-bold text-dark">
            Getting your order ready
          </Text>
          <Text className="text-xl text-center font-medium text-dark">
            Give us a second while we prepare your order
          </Text>
        </View>
        <LottieView
          loop
          autoPlay
          source={fryingPan}
          style={{ height: 300, width: 300, alignSelf: "center" }}
        />
        {/* <View className="absolute w-full bottom-0 -right-10">
          <Image
            resizeMode="cover"
            className="w-full h-96"
            source={checkOutimage}
          />
        </View> */}
      </SafeAreaView>
      <StatusBar style="dark" backgroundColor="#fff" />
    </>
  );
}

export function CheckoutScreen() {
  const { cartItems } = useCartStore();
  const [checkoutComplete, setcheckoutComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        setcheckoutComplete(true);
      }, 8000);
    }
  }, [loading]);

  const navigation = useNavigation();

  return (
    <>
      {/* {!checkoutComplete ? (
        <SafeAreaView className="flex-1 bg-gray-200">
          <BackButtonheader />
          <ScrollView className="pt-6 relative h-screen px-3">
            <View className="pb-48">
              <View className="flex-row mb-6 items-center w-full ">
                <Feather name="map-pin" size={24} color="#1F2937" />
                <View className="flex-1 flex-row items-center justify-between border-b border-gray-400 pb-3 ml-4">
                  <View>
                    <Text className=" text-[17px] font-medium text-dark">
                      200 West 74th st
                    </Text>
                    <Text className=" font-medium text-dark">Vancouver CA</Text>
                  </View>
                  <Feather name="chevron-right" size={24} color="#9CA3AF" />
                </View>
              </View>

              <View className="flex-row items-center w-full ">
                <Feather name="user" size={24} color="#1F2937" />
                <View className="flex-1 flex-row items-center justify-between border-b border-gray-400 pb-3 ml-4">
                  <View>
                    <Text className=" text-[17px] font-medium text-dark">
                      Meet at door
                    </Text>
                    <Text className=" font-medium text-dark">
                      Add delivery note
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={24} color="#9CA3AF" />
                </View>
              </View>
              <View className="flex-row justify-between pt-5 pb-3">
                <Text className="text-lg font-medium text-dark">
                  Delivery Time
                </Text>
                <Text className="text-lg font-medium text-dark">10-20 Min</Text>
              </View>
              <PriorityBox title="Priority" />
              <PriorityBox title="Standard" />
              <PriorityBox title="Schedule" />
              <View className="pt-6">
                <View className="flex-row justify-between">
                  <Text className="text-lg font-medium text-dark">
                    Your Items
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <Text className="text-lg font-medium text-blue-500">
                      View Cart
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="mt-4">
                  {cartItems.map((item) => (
                    <View
                      className="flex-row justify-between items-center border-b border-gray-400 pb-2"
                      key={item._id}
                    >
                      <View className="flex-row space-x-4 py-4">
                        <Text className="font-medium text-dark">
                          {item.quantity}
                        </Text>
                        <Text className="font-medium text-dark">
                          {item.name}
                        </Text>
                      </View>
                      <Text className="font-medium text-dark">
                        ${item.total}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <CheckoutButton handleCheckout={() => setcheckoutComplete(true)} />
        </SafeAreaView>
      ) : (
        <CheckOutCompleteScreen />
      )} */}
      {!checkoutComplete && !loading && (
        <SafeAreaView className="flex-1 bg-gray-200">
          <BackButtonheader />
          <ScrollView className="pt-6 relative h-screen px-3">
            <View className="pb-48">
              <View className="flex-row mb-6 items-center w-full ">
                <Feather name="map-pin" size={24} color="#1F2937" />
                <View className="flex-1 flex-row items-center justify-between border-b border-gray-400 pb-3 ml-4">
                  <View>
                    <Text className=" text-[17px] font-medium text-dark">
                      200 West 74th st
                    </Text>
                    <Text className=" font-medium text-dark">Vancouver CA</Text>
                  </View>
                  <Feather name="chevron-right" size={24} color="#9CA3AF" />
                </View>
              </View>

              <View className="flex-row items-center w-full ">
                <Feather name="user" size={24} color="#1F2937" />
                <View className="flex-1 flex-row items-center justify-between border-b border-gray-400 pb-3 ml-4">
                  <View>
                    <Text className=" text-[17px] font-medium text-dark">
                      Meet at door
                    </Text>
                    <Text className=" font-medium text-dark">
                      Add delivery note
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={24} color="#9CA3AF" />
                </View>
              </View>
              <View className="flex-row justify-between pt-5 pb-3">
                <Text className="text-lg font-medium text-dark">
                  Delivery Time
                </Text>
                <Text className="text-lg font-medium text-dark">10-20 Min</Text>
              </View>
              <PriorityBox title="Priority" />
              <PriorityBox title="Standard" />
              <PriorityBox title="Schedule" />
              <View className="pt-6">
                <View className="flex-row justify-between">
                  <Text className="text-lg font-medium text-dark">
                    Your Items
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <Text className="text-lg font-medium text-blue-500">
                      View Cart
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="mt-4">
                  {cartItems.map((item) => (
                    <View
                      className="flex-row justify-between items-center border-b border-gray-400 pb-2"
                      key={item._id}
                    >
                      <View className="flex-row space-x-4 py-4">
                        <Text className="font-medium text-dark">
                          {item.quantity}
                        </Text>
                        <Text className="font-medium text-dark">
                          {item.name}
                        </Text>
                      </View>
                      <Text className="font-medium text-dark">
                        ${item.total}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <CheckoutButton
            handleCheckout={() => {
              setLoading(true);
            }}
          />
        </SafeAreaView>
      )}
      {checkoutComplete && <CheckOutCompleteScreen />}
      {loading && <CheckoutLoading />}
    </>
  );
}
