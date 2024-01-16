import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import { menu } from "../../constants/menu";
import { StatusBar } from "expo-status-bar";
import { useCartStore } from "../../store/cartStore";
import { TcartItem } from "../../contexts/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";

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
const BackButtonheader = ({
  setNutritionalValue,
}: {
  setNutritionalValue: any;
}) => {
  const navigation = useNavigation();
  return (
    <View className="px-4 flex flex-row justify-between items-center">
      <TouchableOpacity className="w-20" onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setNutritionalValue(true)}
        className="px-4 py-2 rounded-full bg-primary flex-row items-center space-x-2"
      >
        <Text className="text-white text-xs">Nutritional Value</Text>
        <FontAwesome color="white" size={10} name="arrow-right" />
      </TouchableOpacity>
    </View>
  );
};

const RatingStar = ({
  handleRating,
  rating,
  score,
  size,
}: {
  handleRating: (value: number) => void;
  rating: number;
  size: number;
  score: number;
}) => {
  const isActive = score <= rating;

  return (
    <TouchableOpacity className="mr-4" onPress={() => handleRating(score)}>
      {!isActive ? (
        <AntDesign name="staro" size={size} color="black" />
      ) : (
        <AntDesign name="star" size={size + 5} color="gold" />
      )}
    </TouchableOpacity>
  );
};

const Ratingsmodal = ({ modalVisible, setModalVisible, rating }: any) => {
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        className="py-4 px-2"
      >
        <AntDesign name="closecircleo" size={30} color="black" />
      </TouchableOpacity>
      <View className="flex  flex-1  pt-4 px-2">
        <View className=" bg-white flex-1 pb-20 justify-center items-center px-6">
          <Text className="text-xl">Rate this meal {rating} stars ? </Text>
          <View className="flex-row py-4">
            {[1, 2, 3, 4, 5].map((rating, i) => (
              <RatingStar
                size={40}
                score={i + 1}
                rating={0}
                key={i}
                handleRating={(i) => handleRating(i)}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className=" inline-flexs w-full border py-4 mt-6 rounded-lg bg-dark px-4 justify-center items-center"
          >
            <Text className=" text-white text-xl font-medium">
              Confirm Rating
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    <View className="max-w-sm pb-2 mx-auto">
      {/* <Text className="text-2xl font-semibold text-dark">Servings</Text> */}
      <View className="flex-row items-center space-x-4 pt-4">
        <TouchableOpacity
          onPress={() =>
            itemQuantity <= 1
              ? setItemQuantity(1)
              : setItemQuantity((prev: number) => prev - 1)
          }
        >
          <AntDesign size={50} name="minuscircleo" />
        </TouchableOpacity>
        <Text className="text-xl font-medium text-dark">{itemQuantity}</Text>
        <TouchableOpacity
          onPress={() => setItemQuantity((prev: number) => prev + 1)}
        >
          <AntDesign name="pluscircleo" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BuyButton = ({
  buyItem,
  itemQuantity,
  setItemQuantity,
}: {
  buyItem: () => void;
  itemQuantity: number;
  setItemQuantity: any;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(-1);

  return (
    <View className="absolute bottom-0 left-0 right-0  py-2 bg-white border-gray-300 px-4 border-t space-y-6">
      {/* <View className="flex-row justify-between items-center">
        <Text className="font-medium text-[17px] text-dark">Rate Meal</Text>
        <View className="flex-row space-x-6 items-center">
          {[1, 2, 3, 4, 5].map((ratings, i) => (
            <RatingStar
              rating={rating}
              size={24}
              score={i}
              key={i}
              handleRating={(i) => handleRating(i)}
            />
          ))}
        </View>
      </View> */}
      <ServingsDisplay
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
      />
      <TouchableOpacity
        onPress={buyItem}
        className=" inline-flex border py-4 rounded-lg bg-dark px-4 justify-center items-center"
      >
        <Text className=" text-white text-xl font-medium">Add to Cart</Text>
      </TouchableOpacity>
      <Ratingsmodal
        rating={rating}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        animationType="slide"
      />
    </View>
  );
};

const ItemInfo = ({
  price,
  name,
  image,
  description,
}: {
  price: number;
  name: string;
  image: any;
  description: string;
}) => {
  return (
    <>
      <Image
        resizeMode="contain"
        className="w-full h-96 mx-auto "
        source={image}
      />
      <View className="-mt-6">
        <Text className="text-2xl font-medium text-dark">{name}</Text>
        <Text className=" font-semibold text-dark text-lg">${price}</Text>
        <Text className=" text-[17px] font-medium text-dark mt-2">
          {description}
        </Text>
        {/* <Text className=" text-dark">510 Cal.</Text> */}
      </View>
    </>
  );
};

const NutritionalValue = ({
  setNutritionalValue,
  name,
}: {
  name: string;
  setNutritionalValue: any;
}) => {
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
            <Text className="text-lg text-right font-medium ">{name}</Text>
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
  const [rating, setRating] = useState(3);
  const { addToCart } = useCartStore();
  const { _id } = route.params;
  const activeItem = useMemo(() => {
    const item = menu.find((item) => item._id == _id);
    return item;
  }, [_id]);

  const { price, name, image, description } = activeItem ?? {};

  function handleRating(rating: number) {
    console.info(rating);
    setRating(rating);
    // setModalVisible(true);
  }

  console.info(activeItem);
  return (
    <>
      {!viewingNutritionalValue ? (
        <SafeAreaView className="flex-1 pt-2 bg-gray-200  ">
          <ScrollView className="flex-1 ">
            <BackButtonheader
              setNutritionalValue={setViewingNutritionalValue}
            />
            <View className="px-4  pb-72  ">
              <ItemInfo
                description={description as string}
                image={image as string}
                name={name as string}
                price={price as number}
              />
              {/* <ServingsDisplay
              itemQuantity={itemQuantity}
              setItemQuantity={setItemQuantity}
            /> */}
              <View className="flex-row pt-6 justify-between items-center">
                <Text className="font-medium text-2xl text-dark">Rating</Text>
                <View className="flex-row space-x-6 items-center">
                  {[1, 2, 3, 4, 5].map((ratings, i) => (
                    <RatingStar
                      rating={rating}
                      size={24}
                      score={i}
                      key={i}
                      handleRating={(i) => handleRating(i)}
                    />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <BuyButton
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
            buyItem={() =>
              addToCart({
                ...(activeItem as TcartItem),
                quantity: itemQuantity,
              })
            }
          />
        </SafeAreaView>
      ) : (
        <NutritionalValue
          name={name as string}
          setNutritionalValue={setViewingNutritionalValue}
        />
      )}
    </>
  );
};
