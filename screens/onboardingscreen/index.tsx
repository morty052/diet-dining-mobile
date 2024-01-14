import { View, Text, Pressable, useWindowDimensions } from "react-native";
import { useState, useMemo } from "react";
import LottieView from "lottie-react-native";
import { ghost, healthyFoodLottie } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

type TOnboardingScreenProps = {
  description: string;
  title: string;
  lottie: any;
  color: string;
};

const OnboardingControls = ({
  handleNext,
  onBoardingArray,
  activePage,
  setActivePage,
}: {
  handleNext: () => void;
  onBoardingArray: string[];
  activePage: number;
  setActivePage: (page: number) => void;
}) => {
  const navigate = useNavigation();

  const PageCountCircle = ({
    active,
    setActive,
  }: {
    active?: boolean;
    setActive: () => void;
  }) => {
    return (
      <Pressable
        onPress={() => setActive()}
        className={`  p-2 mx-2 rounded-full ${
          active ? "h-5 w-5 bg-white" : "border border-white h-4 w-4"
        }`}
      ></Pressable>
    );
  };

  const PageCountVisuals = () => {
    return (
      <View className=" flex-row items-center space-x-4">
        {onBoardingArray?.map((item, index) => {
          return (
            <PageCountCircle
              setActive={() => setActivePage(index)}
              active={activePage === index}
              key={index}
            />
          );
        })}
      </View>
    );
  };

  const isLastItem = useMemo(() => {
    if (activePage === onBoardingArray.length - 1) {
      return true;
    }
    return false;
  }, [activePage]);

  return (
    <View className="bg-black/30 absolute bottom-0  p-6 px-4 left-0 right-0 ">
      <View className="flex-row justify-between items-center">
        <Text className="text-white">Skip</Text>
        <PageCountVisuals />
        <Pressable
          onPress={
            isLastItem ? () => navigate.navigate("SignUp") : () => handleNext()
          }
        >
          <Text className="text-white">{isLastItem ? "Done" : "Next"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const OnboardingScreenItem = (props: TOnboardingScreenProps) => {
  const { description, title, lottie, color } = props;
  const { width, height } = useWindowDimensions();
  return (
    <>
      <View
        style={{
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          position: "relative",
          paddingTop: 100,
          height: "100%",
        }}
      >
        <LottieView
          style={{ width: width * 0.7, height: width * 0.7 }}
          autoPlay
          source={healthyFoodLottie}
        />
        <View className="absolute bottom-40 pb-14">
          <Text className="text-3xl font-semibold text-white text-center">
            {title}
          </Text>
          <Text className="text-lg font-semibold text-white text-center">
            {description}
          </Text>
        </View>
      </View>
    </>
  );
};

export const OnboardingScreen = () => {
  const [onboardingIndex, setonboardingIndex] = useState(0);
  const [color, setColor] = useState("#60A5FA");

  const onboardingPages = {
    0: (
      <OnboardingScreenItem
        lottie={""}
        description="Get set up with a fully tracked diet plan in a few clicks"
        title="Professional Diet Plans"
        color="#60A5FA"
      />
    ),
    1: (
      <OnboardingScreenItem
        lottie={""}
        description=""
        title="Eat Healthy"
        color="#EEE3C8"
      />
    ),
    2: (
      <OnboardingScreenItem
        lottie={""}
        description=""
        title=""
        color="#80A5FA"
      />
    ),
    3: (
      <OnboardingScreenItem
        lottie={""}
        description=""
        title=""
        color="#60A5FA"
      />
    ),
  };

  const onBoardingArray = Object.keys(onboardingPages);

  function handleNext() {
    setonboardingIndex(onboardingIndex + 1);
  }

  return (
    <View className="flex-1">
      {onboardingPages[onboardingIndex as keyof typeof onboardingPages]}
      <OnboardingControls
        setActivePage={setonboardingIndex}
        activePage={onboardingIndex}
        onBoardingArray={onBoardingArray}
        handleNext={handleNext}
      />
      <StatusBar style="light" />
    </View>
  );
};
