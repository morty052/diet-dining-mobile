import { View, Text, ImageBackground, FlatList, Image } from "react-native";
import React from "react";
import { Screen, Button } from "../../components";
import circle from "../../assets/circle.png";
import desserts from "../../assets/desserts.png";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizRoutes from "./QuizRoutes";

type DietStackParamList = {
  DietHome: undefined;
  DietQuiz: undefined;
  DietPlan: undefined;
  DailyDiet: undefined;
};

const Stack = createNativeStackNavigator<DietStackParamList>();

type Props = {};

const menu = [
  {
    name: "Deserts",
    image: desserts,
  },
  {
    name: "Lean meat",
    image: desserts,
  },
  {
    name: "Salads",
    image: desserts,
  },
  {
    name: "Diet foods",
    image: desserts,
  },
  {
    name: "Smoothies",
    image: desserts,
  },
  {
    name: "Soups",
    image: desserts,
  },
  {
    name: "Specials",
    image: desserts,
  },
  {
    name: "Parfaits",
    image: desserts,
  },
];

function DishPreviewCard({ title, image }: { title: string; image: string }) {
  return (
    <View className="flex-1  mr-4 w-[80vw]">
      <View className="relative">
        <Image
          source={{ uri: image }}
          className="w-full  h-56 rounded-xl     object-cover"
        />
        <View className="absolute top-2 right-4">
          <Feather name="heart" size={24} color="black" />
        </View>
        <View className="absolute rounded-xl top-0 bottom-0 left-0 right-0 bg-black/20 "></View>
      </View>
      <View className="py-2 flex flex-row items-center justify-between">
        <View className="flex">
          <Text className="text-xl font-medium">{title}</Text>
          <Text className="text-lg">$15.00</Text>
        </View>
        <View className=" border px-4 w-28 inline-flex items-center py-1 rounded-3xl border-dark">
          <Text className="text-sm font-medium">4.7</Text>
        </View>
      </View>
    </View>
  );
}

const Circle = ({ onPress }: { onPress: () => void }) => {
  return (
    <ImageBackground source={circle} className="w-full  h-80 pt-20">
      <View className="flex items-center px-2 space-y-2">
        <Text className="text-center text-4xl tracking-wide text-light font-semibold">
          Find your plan
        </Text>
        <Text className="text-center text-light text-lg">
          Take our quick test to find the perfect diet plan for you.
        </Text>
        <View className="pt-4">
          <Button onPress={onPress} title="Get Started" />
        </View>
      </View>
    </ImageBackground>
  );
};

const DietHomePage = ({ navigation }: { navigation: any }) => {
  return (
    <>
      <Screen style="relative -mx-4 -mt-12">
        <Circle onPress={() => navigation.navigate("DietQuiz")} />
        <View className="py-10 space-y-6 px-2">
          <Text className="text-3xl text-dark font-medium">Vegetarian</Text>
          <FlatList
            horizontal
            data={menu}
            renderItem={({ item }) => (
              <DishPreviewCard
                image={
                  "https://img.freepik.com/free-photo/trifle-dessert-with-berries-cream-isolated-white-background-ai-generative_123827-24185.jpg?size=626&ext=jpg&ga=GA1.2.1014310989.1704930583&semt=ais"
                }
                title={item.name}
              />
            )}
            keyExtractor={(item) => item.name}
          />
          <Text className="text-3xl text-dark font-medium">Balanced</Text>
          <FlatList
            horizontal
            data={menu}
            renderItem={({ item }) => (
              <DishPreviewCard
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
      <StatusBar backgroundColor="#90c466" style="light" />
    </>
  );
};

const DailyDiet = ({ navigation }: { navigation: any }) => {
  return (
    <>
      <Screen style="relative -mx-4 ">
        <View className=" border-b border-gray-300 pb-2.5 w-full space-y-2 ">
          <Text className="text-center">Thursday, JUL 27</Text>
          <Text className="text-center text-2xl text-dark font-medium">
            Day 1 of 7
          </Text>
        </View>
        <View className="py-10 space-y-6 px-2">
          <Text className="text-3xl text-dark font-medium">Breakfast</Text>
          <FlatList
            horizontal
            data={menu}
            renderItem={({ item }) => (
              <DishPreviewCard
                image={
                  "https://img.freepik.com/free-photo/trifle-dessert-with-berries-cream-isolated-white-background-ai-generative_123827-24185.jpg?size=626&ext=jpg&ga=GA1.2.1014310989.1704930583&semt=ais"
                }
                title={item.name}
              />
            )}
            keyExtractor={(item) => item.name}
          />
          <Text className="text-3xl text-dark font-medium">Lunch</Text>
          <FlatList
            horizontal
            data={menu}
            renderItem={({ item }) => (
              <DishPreviewCard
                image={
                  "https://img.freepik.com/free-photo/trifle-dessert-with-berries-cream-isolated-white-background-ai-generative_123827-24185.jpg?size=626&ext=jpg&ga=GA1.2.1014310989.1704930583&semt=ais"
                }
                title={item.name}
              />
            )}
            keyExtractor={(item) => item.name}
          />
          <Text className="text-3xl text-dark font-medium">Dinner</Text>
          <FlatList
            horizontal
            data={menu}
            renderItem={({ item }) => (
              <DishPreviewCard
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
      <StatusBar backgroundColor="#90c466" style="light" />
    </>
  );
};

export const DietPlanner = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        children
        initialRouteName="DailyDiet"
      >
        <Stack.Screen name="DailyDiet" component={DailyDiet} />
        <Stack.Screen name="DietHome" component={DietHomePage} />
        <Stack.Screen name="DietQuiz" component={QuizRoutes} />
      </Stack.Navigator>
    </>
  );
};
