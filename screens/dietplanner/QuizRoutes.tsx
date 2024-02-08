import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Screen } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import sandwich from "../../assets/lottie/sandwichlottie.json";
import { useQuizStore } from "../../store/quizStore";

type Props = {};

const BackButtonheader = () => {
  const navigation = useNavigation();
  return (
    <View className="px-4 pt-14 bg-gray-200">
      <Pressable
        className=" flex flex-row justify-between items-center"
        onPress={() => navigation.goBack()}
      >
        <FontAwesome size={20} color="black" name="chevron-left" />
        <Text className="text-lg font-medium text-dark">Diet Planner</Text>
        <FontAwesome size={20} color="black" name="close" />
      </Pressable>
    </View>
  );
};

const preferenceAnswers = [
  {
    title: "I don't have any specific preferences",
    name: "NONE",
  },
  {
    title: "I am pescatarian (I'm vegetarian but i eat fish)",
    name: "PESCATARIAN",
  },
  {
    title: "I am vegetarian",
    name: "VEGETARIAN",
  },
  {
    title: "I am vegan",
    name: "VEGAN",
  },
];

const allergyAnswers = [
  {
    title: "I don't have any food allergies",
    name: "NONE",
  },
  {
    title: "I am allergic to nuts",
    name: "NUTS",
  },
  {
    title: "I am lactose intolerant",
    name: "LACTOSE",
  },
  {
    title: "I am vegetarian",
    name: "VEGETARIAN",
  },
  {
    title: "Other",
    name: "OTHER",
  },
];

const budgetAnswers = [
  {
    title: "$0 - $25",
    name: "NONE",
  },
  {
    title: "$25 - 50",
    name: "NUTS",
  },
  {
    title: "$50 - $100",
    name: "LACTOSE",
  },
  {
    title: "$100  and above",
    name: "VEGETARIAN",
  },
];

const QuestionItem = ({
  title,
  border,
  selected,
  name,
  handleSelect,
}: {
  title: string;
  border?: boolean;
  selected: boolean;
  name: string;
  handleSelect: (name: string) => void;
}) => {
  return (
    <View
      className={`flex  flex-row items-center px-4 py-6 space-x-6  ${
        border && "border-b border-gray-400"
      }`}
    >
      <Text className=" flex-1 text-dark text-lg">{title}</Text>
      <Pressable
        onPress={() => handleSelect(name)}
        className={`h-6 w-6 rounded-full border ${selected && "bg-primary"}`}
      ></Pressable>
    </View>
  );
};

const QuestionGrid = ({
  questions,
  selected,
  setSelected,
}: {
  questions: { name: string; title: string }[];
  selected: string;
  setSelected: (name: string) => void;
}) => {
  const [preferences, setPreferences] = useState("");

  function handleSelect(name: string) {
    setSelected(name);
  }

  return (
    <View className="border border-gray-400 rounded-lg py-2 ">
      {questions?.map((pref, index) => (
        // @ts-ignore
        <View key={index}>
          <QuestionItem
            name={pref.name}
            selected={selected == pref.name}
            title={pref.title}
            handleSelect={(name) => handleSelect(name)}
            border={index + 1 != questions.length}
          />
        </View>
      ))}
    </View>
  );
};

const NextButton = ({
  navigation,
  screen,
}: {
  navigation: any;
  screen: string;
}) => {
  return (
    <View className="absolute flex flex-row justify-center left-0 right-0 bottom-40  px-4">
      <TouchableOpacity
        onPress={() => navigation.navigate(screen)}
        className="flex w-full max-w-md rounded-lg px-6 py-4 border items-center justify-center"
      >
        <Text className="text-lg font-medium">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

function Preferences({ navigation }: { navigation: any }) {
  const [selected, setSelected] = useState("");
  return (
    <View className="h-screen bg-gray-200 px-4">
      <View className=" py-8">
        <View className="py-8">
          <Text className="text-center text-dark  text-3xl">
            What are your food preferences?
          </Text>
        </View>
        <QuestionGrid
          selected={selected}
          setSelected={setSelected}
          questions={preferenceAnswers}
        />
      </View>
      <NextButton screen="Allergies" navigation={navigation} />
    </View>
  );
}

const Allergies = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState("");
  return (
    <View className="h-screen bg-gray-200 px-4">
      <View className=" py-8">
        <View className="py-8">
          <Text className="text-center text-dark  text-3xl">
            Do you have any food allergies?
          </Text>
        </View>
        <QuestionGrid
          selected={selected}
          setSelected={setSelected}
          questions={allergyAnswers}
        />
      </View>
      <NextButton screen="DietBudget" navigation={navigation} />
    </View>
  );
};

const GettingPlanReadyScreen = () => {
  return (
    <SafeAreaView className="pt-8 bg-gray-200 flex-1">
      <LottieView
        source={sandwich}
        autoPlay
        loop
        style={{ width: 300, height: 300, alignSelf: "center" }}
      />
      <View className="px-2 space-y-2">
        <Text className="text-center text-dark  text-4xl font-semibold">
          Getting plan ready
        </Text>
        <Text className="text-center text-dark text-[15px]  font-medium">
          Give us a second to make sure we get the perfect diet plan for you.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const DietBudget = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState("");
  const [gettingDietPlan, setGettingDietPlan] = useState(false);

  const { setPlan } = useQuizStore();

  const handleDietPlan = () => {
    setGettingDietPlan(true);

    // navigation.navigate("DietPlan");
  };

  useEffect(() => {
    if (!gettingDietPlan) {
      return;
    }
    const timer = setTimeout(() => {
      setGettingDietPlan(false);
      setPlan("diet");
    }, 8000);

    // return () => {
    //   clearTimeout(timer);
    // };
  }, [gettingDietPlan]);

  const NextButton = ({
    navigation,
    screen,
  }: {
    navigation: any;
    screen: string;
  }) => {
    return (
      <View className="absolute flex flex-row justify-center left-0 right-0 bottom-40  px-4">
        <TouchableOpacity
          onPress={handleDietPlan}
          className="flex w-full max-w-md rounded-lg px-6 py-4 border items-center justify-center"
        >
          <Text className="text-lg font-medium">Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {!gettingDietPlan ? (
        <View className="h-screen bg-gray-200 px-4">
          <View className=" py-8">
            <View className="py-8">
              <Text className="text-center text-dark  text-3xl">
                How much would you like to spend on your daily diet?
              </Text>
            </View>
            <QuestionGrid
              selected={selected}
              setSelected={setSelected}
              questions={budgetAnswers}
            />
          </View>
          <NextButton screen="DietHome" navigation={navigation} />
        </View>
      ) : (
        <GettingPlanReadyScreen />
      )}
    </>
  );
};

type QuizStackParamList = {
  Preferences: undefined;
  Allergies: undefined;
  DietBudget: undefined;
};

const Stack = createNativeStackNavigator<QuizStackParamList>();

const QuizRoutes = (props: Props) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: (navigation) => <BackButtonheader />,
        }}
      >
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="Allergies" component={Allergies} />
        <Stack.Screen name="DietBudget" component={DietBudget} />
      </Stack.Navigator>
      <StatusBar />
    </>
  );
};

export default QuizRoutes;
