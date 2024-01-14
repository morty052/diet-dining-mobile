import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { SearchBar, Screen, Header } from "../../components";
import { desserts } from "../../assets";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCartContext } from "../../hooks/useCartContext";
import { useState } from "react";
import {
  leanmeat,
  parfait,
  salads,
  smoothie,
  soups,
  special,
} from "../../assets";

const menu = [
  {
    name: "Deserts",
    image: desserts,
    price: 200,
    _id: "1",
  },
  {
    name: "Lean meat",
    image: desserts,
    price: 200,
    _id: "2",
  },
  {
    name: "Salads",
    image: desserts,
    price: 200,
    _id: "3",
  },
  {
    name: "Diet foods",
    image: desserts,
    price: 200,
    _id: "4",
  },
  {
    name: "Smoothies",
    image: desserts,
    price: 200,
    _id: "5",
  },
  {
    name: "Soups",
    image: desserts,
    price: 200,
    _id: "6",
  },
  {
    name: "Specials",
    image: desserts,
    price: 200,
    _id: "7",
  },
  {
    name: "Parfaits",
    image: desserts,
    price: 200,
    _id: "8",
  },
];
const categories = [
  {
    name: "Desserts",
    image: desserts,
  },
  {
    name: "Lean meat",
    image: leanmeat,
  },
  {
    name: "Salads",
    image: salads,
  },
  // {
  //   name: "Diet foods",
  //   image: desserts,
  // },
  {
    name: "Smoothies",
    image: smoothie,
  },
  {
    name: "Soups",
    image: soups,
  },
  {
    name: "Specials",
    image: special,
  },
  {
    name: "Parfaits",
    image: parfait,
  },
];

type RootTabsParamList = {
  Home: undefined;
  Diet: undefined;
  Cart: undefined;
  Orders: undefined;
};

function MenuItem({ image, title }: any) {
  return (
    <View className=" inline-flex  mr-8    items-center">
      {/* <SvgComponent /> */}
      <Image resizeMode="cover" className="w-28 h-28" source={image} />
      <Text className="text-sm font-bold text-dark">{title}</Text>
    </View>
  );
}

function DishPreviewCard({
  title,
  image,
  addToCart,
  _id,
}: {
  title: string;
  image: string;
  _id: string;
  addToCart: (t: any) => void;
}) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState();

  return (
    <Pressable className="flex-1  mr-4 w-[80vw]">
      <Pressable
        onPress={() =>
          // @ts-ignore
          navigation.navigate("FoodScreen", {
            _id: _id,
          })
        }
        className="relative"
      >
        <Image
          source={{ uri: image }}
          className="w-full  h-56 rounded-xl     object-cover"
        />

        {/* OVERLAY */}
        <View className="absolute rounded-xl top-0 bottom-0 left-0 right-0 bg-black/20 "></View>
      </Pressable>
      {/* LIKEBUTTON */}
      <Pressable
        onPress={() => setLiked(!liked)}
        className="absolute top-2 right-4"
      >
        <Feather name="heart" size={24} color={liked ? "red" : "black"} />
      </Pressable>
      <View className="py-2 flex flex-row items-center justify-between">
        <View className="flex">
          <Text className="text-xl font-medium">{title}</Text>
          <Text className="text-lg">$15.00</Text>
        </View>
        <Pressable
          onPress={addToCart}
          className=" border px-4 w-28 inline-flex items-center py-1 rounded-3xl border-dark"
        >
          <Text className="text-sm font-medium">Add to cart</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const Stack = createNativeStackNavigator();

const HomeMenu = () => {
  const { addToCart } = useCartContext();

  return (
    <Screen style="">
      <Header />
      <View className="pt-2">
        <SearchBar />
      </View>
      <View>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 20,
          }}
          horizontal
        >
          {categories.map((item, index) => (
            <MenuItem image={item.image} title={item.name} key={index} />
          ))}
        </ScrollView>
      </View>

      <View className="pt-8">
        <View className="mb-4 flex justify-between items-center flex-row">
          <Text className="text-3xl font-medium">Desserts</Text>
          <Text className="text-sm font-medium">See More</Text>
        </View>
        <FlatList
          horizontal
          data={menu}
          renderItem={({ item }) => (
            <DishPreviewCard
              _id={item._id}
              addToCart={() => addToCart({ ...item, quantity: 1 })}
              image={
                "https://img.freepik.com/free-photo/trifle-dessert-with-berries-cream-isolated-white-background-ai-generative_123827-24185.jpg?size=626&ext=jpg&ga=GA1.2.1014310989.1704930583&semt=ais"
              }
              title={item.name}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
      <View className="pt-8 pb-28">
        <View className="mb-4 flex justify-between items-center flex-row">
          <Text className="text-3xl font-medium">Salads</Text>
          <Text className="text-sm font-medium">See More</Text>
        </View>
        <FlatList
          horizontal
          data={menu}
          renderItem={({ item }) => (
            <DishPreviewCard
              addToCart={() => addToCart(item)}
              image={
                "https://img.freepik.com/free-photo/trifle-dessert-with-berries-cream-isolated-white-background-ai-generative_123827-24185.jpg?size=626&ext=jpg&ga=GA1.2.1014310989.1704930583&semt=ais"
              }
              title={item.name}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Screen>
  );
};

export const Home = ({ navigation }: { navigation: any }) => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMenu" component={HomeMenu} />
      </Stack.Navigator>
      <StatusBar hidden={false} backgroundColor="#E5E7EB" />
    </>
  );
};
