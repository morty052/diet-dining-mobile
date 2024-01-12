import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import styles from "../../styles/global";
import { SearchBar, Screen, Header } from "../../components";
import desserts from "../../assets/desserts.png";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FoodScreen } from "../foodscreen";

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

function MenuItem({ image, title }: any) {
  return (
    <View className=" inline-flex  mr-8    items-center">
      {/* <SvgComponent /> */}
      <Image className="w-20 h-20" source={image} />
      <Text className="text-sm font-bold text-dark">{title}</Text>
    </View>
  );
}

function DishPreviewCard({ title, image }: { title: string; image: string }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("FoodScreen")}
      className="flex-1  mr-4 w-[80vw]"
    >
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
    </Pressable>
  );
}

const Stack = createNativeStackNavigator();

const HomeMenu = () => {
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
          {menu.map((item, index) => (
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
      <Stack.Navigator screenOptions={{ headerShown: false }} children>
        <Stack.Screen name="HomeMenu" component={HomeMenu} />
      </Stack.Navigator>
      <StatusBar style="auto" backgroundColor="#fff" />
    </>
  );
};
