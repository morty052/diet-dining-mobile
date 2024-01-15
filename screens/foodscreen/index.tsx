import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import dessert from "../../assets/test.png";
import { useState, useMemo } from "react";
import { useCartContext } from "../../hooks/useCartContext";
import desserts from "../../assets/desserts.png";
import { menu } from "../../constants/menu";
import { StatusBar } from "expo-status-bar";

type Props = {};

// const menu = [
//   {
//     name: "Deserts",
//     image: desserts,
//     price: 200,
//     _id: "1",
//   },
//   {
//     name: "Lean meat",
//     image: desserts,
//     price: 200,
//     _id: "2",
//   },
//   {
//     name: "Salads",
//     image: desserts,
//     price: 200,
//     _id: "3",
//   },
//   {
//     name: "Diet foods",
//     image: desserts,
//     price: 200,
//     _id: "4",
//   },
//   {
//     name: "Smoothies",
//     image: desserts,
//     price: 200,
//     _id: "5",
//   },
//   {
//     name: "Soups",
//     image: desserts,
//     price: 200,
//     _id: "6",
//   },
//   {
//     name: "Specials",
//     image: desserts,
//     price: 200,
//     _id: "7",
//   },
//   {
//     name: "Parfaits",
//     image: desserts,
//     price: 200,
//     _id: "8",
//   },
// ];
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

const BuyButton = ({ buyItem }: { buyItem: () => void }) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 pb-10 pt-6 border-gray-300 px-4 border-t space-y-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg">Rate Meal</Text>
        <View className="flex-row space-x-2">
          <FontAwesome name="star" size={20} color="gold" />
          <FontAwesome name="star" size={20} color="gold" />
          <FontAwesome name="star" size={20} color="gold" />
          <FontAwesome name="star" size={20} color="gold" />
          <FontAwesome name="star" size={20} color="gold" />
        </View>
      </View>
      <Pressable
        onPress={buyItem}
        className=" inline-flex border py-4 rounded-lg bg-dark px-4 justify-center items-center"
      >
        <Text className=" text-white text-xl font-medium">Add to Cart</Text>
      </Pressable>
    </View>
  );
};

const ServingsDisplay = ({
  setItemQuantity,
  itemQuantity,
}: {
  setItemQuantity: any;
  itemQuantity: number;
}) => {
  return (
    <View className="py-6">
      <Text className="text-2xl font-semibold text-dark">Servings</Text>
      <View className="flex-row items-center space-x-4 pt-4">
        <FontAwesome
          onPress={() => setItemQuantity((prev: number) => prev - 1)}
          size={30}
          name="minus-circle"
        />
        <Text className="text-lg text-dark">{itemQuantity}</Text>
        <FontAwesome
          onPress={() => setItemQuantity((prev: number) => prev + 1)}
          size={30}
          name="plus-circle"
        />
      </View>
    </View>
  );
};

const ItemInfo = ({
  price,
  name,
  image,
}: {
  price: number;
  name: string;
  image: any;
}) => {
  return (
    <>
      <Image
        resizeMode="contain"
        className="w-full h-72 mx-auto"
        source={image}
      />
      <Text className="text-2xl font-bold text-dark">{name}</Text>
      <Text className="text-xl text-dark">510 Cal.</Text>
      <Text className="text-2xl font-semibold text-dark">${price}</Text>
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

export const FoodScreen = ({ navigation, route }) => {
  const [viewingNutritionalValue, setViewingNutritionalValue] = useState();
  const [itemQuantity, setItemQuantity] = useState(1);
  const { addToCart } = useCartContext();
  const { _id } = route.params;
  const activeItem = useMemo(() => {
    const item = menu.find((item) => item._id == _id);
    return item;
  }, [_id]);

  const { price, name, image } = activeItem ?? {};
  console.info(activeItem);
  return (
    <>
      {!viewingNutritionalValue ? (
        <View className="pt-12 flex-1 bg-white flex h-screen relative">
          <BackButtonheader setNutritionalValue={setViewingNutritionalValue} />
          <View className="px-4 flex-1  pt-12">
            <ItemInfo image={image} name={name} price={price} />
            <ServingsDisplay
              itemQuantity={itemQuantity}
              setItemQuantity={setItemQuantity}
            />
          </View>
          <BuyButton
            buyItem={() => addToCart({ ...activeItem, quantity: itemQuantity })}
          />
        </View>
      ) : (
        <NutritionalValue setNutritionalValue={setViewingNutritionalValue} />
      )}
      <StatusBar hidden={false} backgroundColor="white" />
    </>
  );
};
