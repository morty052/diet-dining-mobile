import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useMemo } from "react";
import { FoodCategoryGrid, FoodItemGrid, Screen } from "../../components";
import { SearchBar } from "../../components";
import { Feather } from "@expo/vector-icons";
import { salads, menu, seaFood } from "../../constants/menu";
import { useCartStore } from "../../store/cartStore";
import { useNavigation } from "@react-navigation/native";
import {
  desserts,
  leanmeat,
  parfait,
  smoothie,
  soups,
  special,
} from "../../assets";

const categories = [
  {
    name: "Desserts",
    image: desserts,
    category: "Desserts",
  },
  {
    name: "Lean meat",
    image: leanmeat,
    category: "Lean meat",
  },
  {
    name: "Salads",
    image: "salads",
    category: "Salads",
  },
  {
    name: "Sea food",
    image: smoothie,
    category: "SeaFoods",
  },
  {
    name: "Soups",
    image: soups,
    category: "Soups",
  },
];

const FoodMenuHeader = ({ title }: { title?: string }) => {
  const navigate = useNavigation();

  return (
    <View className="pt-8 pb-6 flex-row justify-between items-center">
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex-1 pr-4">
        <Text className="text-center text-2xl font-medium">{"Menu"}</Text>
      </View>
    </View>
  );
};
const CategorySelectItem = ({
  title,
  activeCategory,
  handleSetCategory,
  category,
}: {
  title: string;
  activeCategory: string;
  category: string;
  handleSetCategory: (activeCategory: string) => void;
}) => {
  const isActive = useMemo(
    () => activeCategory === category,
    [activeCategory, title]
  );

  return (
    <TouchableOpacity
      onPress={() => handleSetCategory(category)}
      className={`border-b-4 pb-3   border-b-gray-400 pt-3 px-2 w-[30vw] inline-flex items-center ${
        isActive ? "border-b-primary " : ""
      }`}
    >
      <Text
        className={`text-lg font-medium ${
          isActive ? "text-primary" : "text-dark "
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const CategorySelectorGrid = ({
  activeCategory,
  handleSetCategory,
}: {
  activeCategory: string;
  handleSetCategory: (activeCategory: string) => void;
}) => {
  return (
    <ScrollView horizontal>
      {categories.map((item, index) => (
        <CategorySelectItem
          category={item.category}
          activeCategory={activeCategory}
          handleSetCategory={handleSetCategory}
          key={index}
          title={item.name}
        />
      ))}
    </ScrollView>
  );
};

export function FoodMenu({ navigation, route }: any) {
  const { activeCategory } = route.params ?? {};

  function handleSetCategory(activeCategory: string) {
    navigation.setParams({
      activeCategory: activeCategory,
    });
  }

  const { addToCart, cartItems } = useCartStore();

  const categories = {
    Salads: salads,
    SeaFoods: seaFood,
    Menu: menu,
  };

  return (
    <SafeAreaView className="px-2 pt-2 pb-60 flex-1 bg-gray-200">
      <FoodMenuHeader title={activeCategory} />
      <View className="pb-4">
        <SearchBar />
        <View className="mt-6 rounded-lg p-4 bg-primary  border border-dark/50">
          <View>
            <Text className="text-3xl text-white font-medium">
              {activeCategory == "SeaFoods" ? "Sea Foods" : activeCategory}
            </Text>
            <Text className=" text-[16px] text-white font-medium">
              Experience the healthiest and tastiest salads from diet dining
            </Text>
          </View>
        </View>
        <CategorySelectorGrid
          handleSetCategory={(activeCategory) =>
            handleSetCategory(activeCategory)
          }
          activeCategory={activeCategory}
        />
      </View>
      <FoodItemGrid
        cartItems={cartItems}
        title={activeCategory == "SeaFoods" ? "Sea Foods" : activeCategory}
        addToCart={addToCart}
        category={categories[activeCategory as keyof typeof categories]}
      />
    </SafeAreaView>
  );
}
