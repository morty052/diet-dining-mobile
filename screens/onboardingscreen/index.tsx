import { View, Pressable, useWindowDimensions, Text } from "react-native";
import { useState, useMemo } from "react";
import LottieView from "lottie-react-native";
import {
  ghost,
  healthyFoodLottie,
  rateFoodLottie,
  saladLottie,
} from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

type TOnboardingScreenProps = {
  description: string;
  title: string;
  lottie: any;
  color: string;
  width: number;
  height: number;
  textColor?: string;
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
        <Pressable onPress={() => navigate.navigate("SignUp")}>
          <Text className="text-white">Skip</Text>
        </Pressable>
        <PageCountVisuals />
        <Pressable
          onPress={
            isLastItem ? () => navigate.navigate("App") : () => handleNext()
          }
        >
          <Text className="text-white">{isLastItem ? "Done" : "Next"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const OnboardingScreenItem = (props: TOnboardingScreenProps) => {
  const { description, title, lottie, color, width, height, textColor } = props;

  const randomWidth = useSharedValue(10);

  const config = {
    duration: 900,
  };

  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(color, config),
    };
  });

  return (
    <>
      <Animated.View
        style={[
          {
            display: "flex",
            alignItems: "center",
            position: "relative",
            paddingTop: 100,
            height: "100%",
          },
          style,
        ]}
      >
        <LottieView
          style={{ width: width * 0.9, height: width }}
          autoPlay
          source={lottie}
        />
        <View className="absolute bottom-32 pb-14 px-4  space-y-2">
          <Animated.Text
            style={{ color: textColor ? textColor : "white" }}
            className="text-3xl font-semibold text-white text-center"
          >
            {title}
          </Animated.Text>
          <Animated.Text
            style={{ color: textColor ? textColor : "white" }}
            className="text-lg font-semibold text-white text-center"
          >
            {description}
          </Animated.Text>
        </View>
      </Animated.View>
    </>
  );
};

export const OnboardingScreen = () => {
  const [onboardingIndex, setonboardingIndex] = useState(0);
  const [color, setColor] = useState("#60A5FA");
  const { width, height } = useWindowDimensions();

  const onboardingPages = {
    0: (
      <OnboardingScreenItem
        width={width * 0.8}
        height={width}
        lottie={healthyFoodLottie}
        description="Get set up with a fully tracked diet plan in a few clicks"
        title="Professional Diet Plans"
        color="#C084FC"
      />
    ),
    1: (
      <OnboardingScreenItem
        width={width}
        height={height}
        lottie={rateFoodLottie}
        description="Get new meal suggestions  based on your previous ratings"
        title="Food Rating system"
        color="#EEE3C8"
        textColor="#1D3557"
      />
    ),
    2: (
      <OnboardingScreenItem
        width={width}
        height={height}
        lottie={saladLottie}
        description="Get healthy diet meals delivered to your door without the hassle"
        title="Hassle free Diet dining"
        color="#80A5FA"
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
