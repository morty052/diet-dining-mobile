import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import {
  SearchBar,
  Screen,
  Header,
  DishPreviewCard,
  FoodCategoryGrid,
} from "../../components";
import { desserts } from "../../assets";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCartContext } from "../../hooks/useCartContext";
import { useMemo, useState } from "react";
import {
  leanmeat,
  parfait,
  salads,
  smoothie,
  soups,
  special,
} from "../../assets";
import { TcartItem } from "../../contexts/CartContext";
import { menu, salads as saladsCategory, seaFood } from "../../constants/menu";
import { useCartStore } from "../../store/cartStore";
import {
  desserts_emoji,
  leanmeat_emoji,
  salads_emoji,
  seafoods_emoji,
  soups_emoji,
} from "../../assets/foodcategories";

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
const categories = [
  {
    name: "Desserts",
    image: desserts_emoji,
  },
  {
    name: "Sea food",
    image: seafoods_emoji,
  },
  {
    name: "Salads",
    image: salads_emoji,
  },
  {
    name: "Lean meat",
    image: leanmeat_emoji,
  },
  // {
  //   name: "Smoothies",
  //   image: smoothie,
  // },
  {
    name: "Soups",
    image: soups_emoji,
  },
  // {
  //   name: "Specials",
  //   image: special,
  // },
  // {
  //   name: "Parfaits",
  //   image: parfait,
  // },
];

type RootTabsParamList = {
  Home: undefined;
  Diet: undefined;
  Cart: undefined;
  Orders: undefined;
};

function MenuItem({ image, title }: any) {
  const navigationParams = {
    activeCategory: title == "Sea food" ? "SeaFoods" : title,
  };
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("FoodMenu", navigationParams)}
      className=" inline-flex pb-2 bg-white shadow shadow-black border border-gray-400  mr-4 px-4 rounded-lg   items-center"
    >
      {/* <SvgComponent /> */}
      <Image resizeMode="contain" className="w-20 h-20" source={image} />
      <Text className="text-sm font-bold text-dark">{title}</Text>
    </TouchableOpacity>
  );
}

function AllFoodCategories({ categories }: any) {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: 5,
      }}
      horizontal
    >
      {categories.map((item, index) => (
        <MenuItem image={item.image} title={item.name} key={index} />
      ))}
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

const HomeMenu = () => {
  // const { cartItems } = useCartContext();
  const { addToCart, cartItems } = useCartStore();

  return (
    <Screen style="pb-20">
      <Header />
      <View className="pt-2">
        <SearchBar />
      </View>
      <View>
        <AllFoodCategories categories={categories} />
      </View>
      <View className="pb-28">
        <FoodCategoryGrid
          category={menu}
          title="Trending"
          cartItems={cartItems}
          addToCart={addToCart}
        />
        <FoodCategoryGrid
          title="Salads"
          category={saladsCategory}
          cartItems={cartItems}
          addToCart={addToCart}
        />
        <FoodCategoryGrid
          title="Sea food"
          category={seaFood}
          cartItems={cartItems}
          addToCart={addToCart}
        />
      </View>
      {/* <View className="pt-8 pb-28">
        <View className="mb-4 flex justify-between items-center flex-row">
          <Text className="text-3xl font-medium">Salads</Text>
          <Text className="text-sm font-medium">See More</Text>
        </View>
        <FlatList
          horizontal
          data={menu}
          renderItem={({ item }) => (
            <DishPreviewCard
              cartItems={cartItems}
              _id={item._id}
              addToCart={() => addToCart({ ...item, quantity: 1 })}
              image={item.image}
              title={item.name}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View> */}
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
