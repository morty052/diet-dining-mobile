import { View, Text, Pressable } from "react-native";
import { useState } from "react";

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
}: {
  handleNext: () => void;
  onBoardingArray: string[];
  activePage: number;
}) => {
  const PageCountCircle = ({ active }: { active?: boolean }) => {
    return (
      <View
        className={`  p-2 mx-2 rounded-full ${
          active ? "h-5 w-5 bg-white" : "border border-white h-4 w-4"
        }`}
      ></View>
    );
  };

  const PageCountVisuals = () => {
    return (
      <View className=" flex-row items-center space-x-4">
        {onBoardingArray?.map((item, index) => {
          return <PageCountCircle active={activePage === index} key={index} />;
        })}
      </View>
    );
  };

  return (
    <View className="bg-black/30 absolute bottom-0  py-6 px-4 left-0 right-0 ">
      <View className="flex-row justify-between items-center">
        <Text className="text-white">Skip</Text>
        <PageCountVisuals />
        <Pressable onPress={() => handleNext()}>
          <Text className="text-white">Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const OnboardingScreenItem = (props: TOnboardingScreenProps) => {
  const { description, title, lottie, color } = props;
  return (
    <View
      style={{ backgroundColor: color }}
      className="flex h-screen bg-blue-400 pt-12 px-4 relative"
    >
      <Text>{title}</Text>
    </View>
  );
};

export const OnboardingScreen = (props: TOnboardingScreenProps) => {
  const [onboardingIndex, setonboardingIndex] = useState(0);

  const onboardingPages = {
    0: (
      <OnboardingScreenItem
        lottie={""}
        description=""
        title=""
        color="#60A5FA"
      />
    ),
    1: (
      <OnboardingScreenItem
        lottie={""}
        description=""
        title=""
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
    <View className="">
      {onboardingPages[onboardingIndex as keyof typeof onboardingPages]}
      <OnboardingControls
        activePage={onboardingIndex}
        onBoardingArray={onBoardingArray}
        handleNext={handleNext}
      />
    </View>
  );
};
