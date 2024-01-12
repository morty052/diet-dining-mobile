import { View, Text, Pressable, Image } from "react-native";
import { Screen } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import dessert from "../../assets/test.png";
import { useState } from "react";

type Props = {};
const BackButtonheader = ({ setNutritionalValue }) => {
  const navigation = useNavigation();
  return (
    <View className="px-4 ">
      <Pressable
        className=" flex flex-row justify-between items-center"
        onPress={() => navigation.goBack()}
      >
        <View className="border h-8 w-8 rounded-full flex justify-center items-center">
          <FontAwesome size={20} color="black" name="close" />
        </View>
        <Pressable
          onPress={() => setNutritionalValue(true)}
          className="px-4 py-2 rounded-full bg-primary flex-row items-center space-x-2"
        >
          <Text className="text-white text-xs">Nutritional Value</Text>
          <FontAwesome color="white" size={10} name="arrow-right" />
        </Pressable>
      </Pressable>
    </View>
  );
};

const BuyButton = () => {
  return (
    <View className="absolute bottom-0 left-0 right-0 pb-10 pt-6 border-gray-300 px-4 border-t">
      <Pressable className=" inline-flex border py-4 rounded-lg bg-dark px-4 justify-center items-center">
        <Text className=" text-white text-xl font-medium">Add to Cart</Text>
      </Pressable>
    </View>
  );
};

const ServingsDisplay = () => {
  return (
    <View className="py-6">
      <Text className="text-2xl font-semibold text-dark">Servings</Text>
      <View className="flex-row items-center space-x-4 pt-4">
        <FontAwesome size={30} name="minus-circle" />
        <Text className="text-lg text-dark">1</Text>
        <FontAwesome size={30} name="plus-circle" />
      </View>
    </View>
  );
};

const ItemInfo = () => {
  return (
    <>
      <Image className="w-72 h-72 mx-auto" source={dessert} />
      <Text className="text-2xl font-bold text-dark">
        Hamburger McLovin extra
      </Text>
      <Text className="text-xl text-dark">510 Cal.</Text>
      <Text className="text-2xl font-semibold text-dark">$5.69</Text>
    </>
  );
};

const NutritionalValue = ({ setNutritionalValue }) => {
  const BackButtonheader = () => {
    return (
      <View className="px-4 border-b pb-4 border-gray-200 ">
        <Pressable
          className=" flex flex-row justify-between items-center"
          onPress={() => setNutritionalValue(false)}
        >
          <View className="border h-8 w-8 rounded-full flex justify-center items-center">
            <FontAwesome size={20} color="black" name="close" />
          </View>
          <View className=" flex-1">
            <Text className="text-lg text-right font-medium ">
              Hamburger mc loving extra falafel
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <>
      <View className="pt-12 flex h-screen relative">
        <BackButtonheader />
        <View className="p-4 border-b border-gray-200">
          <Text className="text-lg font-medium text-dark">
            Nutritional Information
          </Text>
        </View>
        <View className="p-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Kcal /100 g</Text>
          <Text className="text-lg font-medium text-dark">483.33 kcal</Text>
        </View>
        <View className="p-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Protein /100 g</Text>
          <Text className="text-lg font-medium text-dark">9.29 g</Text>
        </View>
        <View className="p-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Carbs /100 g</Text>
          <Text className="text-lg font-medium text-dark">9.29 g</Text>
        </View>
        <View className="p-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Fat /100 g</Text>
          <Text className="text-lg font-medium text-dark">9.29 g</Text>
        </View>

        <View className="px-4 py-6 border-b border-gray-200">
          <Text className="text-lg font-medium text-dark">
            Additional Information
          </Text>
        </View>

        <View className="p-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Sugar</Text>
          <Text className="text-lg font-medium text-dark">483.33 g</Text>
        </View>
        <View className="p-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Lettuce</Text>
          <Text className="text-lg font-medium text-dark">9.29 g</Text>
        </View>
        <View className="p-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Mandarin Oil</Text>
          <Text className="text-lg font-medium text-dark">9.29 g</Text>
        </View>
        <View className="p-4 border-b border-gray-200 flex-row justify-between">
          <Text className="text-lg font-medium text-dark">Black Pepper</Text>
          <Text className="text-lg font-medium text-dark">9.29 g</Text>
        </View>
      </View>
    </>
  );
};

export const FoodScreen = (props: Props) => {
  const [viewingNutritionalValue, setViewingNutritionalValue] = useState();
  return (
    <>
      {!viewingNutritionalValue ? (
        <View className="pt-12 flex h-screen relative">
          <BackButtonheader setNutritionalValue={setViewingNutritionalValue} />
          <View className="px-4 flex-1  pt-12">
            <ItemInfo />
            <ServingsDisplay />
          </View>
          <BuyButton />
        </View>
      ) : (
        <NutritionalValue setNutritionalValue={setViewingNutritionalValue} />
      )}
    </>
  );
};
