import { View, Text, TextInput, Image, Keyboard } from "react-native";
import React from "react";
import { Button } from "../../components";
import { googleLogo } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { useSignUp } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

type Props = {};

const SignUpForm = ({
  emailAddress,
  setEmailAddress,
  handlePress,
}: {
  emailAddress: string;
  setEmailAddress: (email: string) => void;
  handlePress: () => void;
}) => {
  const navigation = useNavigation();

  return (
    <View className=" absolute bottom-0 h-3/5 left-0 right-0">
      <View className="flex bg-white flex-1  rounded-t-2xl p-4">
        <Text className="text-center text-lg font-medium text-dark">
          Welcome
        </Text>
        <Text className="text-center  font-medium text-dark">
          Lets's get started with your email
        </Text>
        <View className="py-4">
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(email) => setEmailAddress(email)}
            placeholder="Email"
            className="border border-gray-400 text-center rounded-lg p-2"
          />
          <Button
            textStyle="text-white"
            // onPress={() => navigation.navigate("App")}
            onPress={handlePress}
            style="bg-dark w-full text-white mt-6"
            title="Sign Up"
          />
        </View>
        {/* DIVIDER */}
        <View className="flex pt-4 flex-row justify-center items-center">
          <View className="border border-gray-300 flex-1"></View>
          <Text className="text-center   mx-2">Or with</Text>
          <View className="border border-gray-300 flex-1"></View>
        </View>

        {/* GOOGLE BUTTON */}
        <View>
          <View className="font-medium flex-row items-center text-center border-gray-300 border rounded-2xl p-2 mt-4">
            <Image className="h-8 w-8" source={googleLogo} />
            <View className="flex-1  pr-6">
              <Text className="text-lg font-medium text-center">Google</Text>
            </View>
          </View>
        </View>

        {/* TERMS */}
        <View className=" mt-6">
          <Text className="text-center text-sm text-gray-500">
            By continuing, you agree to our Terms of Service
          </Text>
          <Text className="text-center text-sm text-gray-500">
            Privacy Policy and cookie policy
          </Text>
        </View>
      </View>
    </View>
  );
};

const Header = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View className=" py-2 flex items-center flex-row justify-between px-2">
      <Feather
        onPress={() => navigation.goBack()}
        name="arrow-left"
        size={24}
        color="black"
      />
    </View>
  );
};

const MainSignUpScreen = () => {
  const [emailAddress, setEmailAddress] = React.useState("");

  const { isLoaded, signUp, setActive } = useSignUp();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);

      // navigation.navigate("EmailVerificationScreen");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };



  return (
    <View className="flex flex-1 h-screen pt-12 px-4 bg-primary relative">
      <Text>Diet-dining</Text>
      <SignUpForm
        handlePress={onSignUpPress}
        emailAddress={emailAddress}
        setEmailAddress={setEmailAddress}
      />
    </View>
  );
};

const OTPInput = ({ onPressVerify, code, setCode }) => {
  const codeInputOneRef = React.useRef<TextInput>(null);
  const codeInputTwoRef = React.useRef<TextInput>(null);
  const codeInputThreeRef = React.useRef<TextInput>(null);
  const codeInputFourRef = React.useRef<TextInput>(null);
  const codeInputFiveRef = React.useRef<TextInput>(null);
  const codeInputSixRef = React.useRef<TextInput>(null);

  const code_length = 6;

  const onchange = (text: string, ref: any, index: number) => {
    if (index === code_length) {
      setCode(text);
      onPressVerify(code + text);
      return;
    }
    if (text !== "") {
      setCode((prev) => prev + text);
      ref.current?.focus();
    }
  };

  React.useEffect(() => {
    codeInputOneRef.current?.focus();
  }, []);

  return (
    <View className=" flex-row gap-x-2">
      <TextInput
        autoFocus
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputTwoRef, 1);
        }}
        ref={codeInputOneRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputThreeRef, 2);
        }}
        ref={codeInputTwoRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputFourRef, 3);
        }}
        ref={codeInputThreeRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputFiveRef, 4);
        }}
        ref={codeInputFourRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputSixRef, 5);
        }}
        ref={codeInputFiveRef}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        className="border border-gray-400 text-center rounded-lg p-2 w-10"
        onChangeText={(email) => {
          onchange(email, codeInputSixRef, 6);
        }}
        ref={codeInputSixRef}
      />
    </View>
  );
};

const EmailVerificationScreen = ({
  code,
  setCode,
  onVerifyPress,
}: {
  code: string;
  setCode: (code: string) => void;
  onVerifyPress: (code: number) => void;
}) => {
  return (
    <View className="flex bg-white flex-1 h-screen pt-12   relative">
      <Header />
      <View className="pt-6 px-4">
        <Image
          resizeMode="center"
          className="h-40 w-40"
          source={{
            uri: "https://img.freepik.com/free-vector/mail-concept-illustration_114360-396.jpg?w=740&t=st=1705198691~exp=1705199291~hmac=1e3b9a86f7e3e46599a2bbd9c72eb155e1ee8c135d8fdeecac9805e4096141b7",
          }}
        />
        <Text className="text-2xl text-dark font-medium">
          Lets verify your email
        </Text>
        <Text>
          We sent a code to your email please enter it below to continue
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" enabled>
        <View className="p-4">
          {/* <TextInput
          value={code}
          onChangeText={setCode}
          className="border border-gray-400 text-center rounded-lg p-2"
        /> */}
          <OTPInput
            code={code}
            setCode={setCode}
            onPressVerify={(code: number) => onVerifyPress(code)}
          />
        </View>
        {/* <Button title="Continue" onPress={onVerifyPress} /> */}
      </KeyboardAvoidingView>
    </View>
  );
};

export const SignUpScreen = (props: Props) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const navigation = useNavigation();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);

      // navigation.navigate("EmailVerificationScreen");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async (code: number) => {
    // if (!isLoaded) {
    //   return;
    // }

    // try {
    //   const completeSignUp = await signUp.attemptEmailAddressVerification({
    //     code,
    //   });

    //   // await setActive({ session: completeSignUp.createdSessionId });
    //   console.info("completeSignUp", completeSignUp);
    // } catch (err: any) {
    //   console.error(JSON.stringify(err, null, 2));
    // }

    console.log("verify email code", code);
  };

  return (
    <>
      {!pendingVerification ? (
        <MainSignUpScreen
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          onSignUpPress={onSignUpPress}
        />
      ) : (
        <EmailVerificationScreen
          onVerifyPress={(code) => onPressVerify(code)}
          code={code}
          setCode={setCode}
        />
      )}
    </>
    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="MainSignUpScreen"
    //     component={() => (
    //       <MainSignUpScreen
    //         emailAddress={emailAddress}
    //         setEmailAddress={setEmailAddress}
    //         onSignUpPress={onSignUpPress}
    //       />
    //     )}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="EmailVerificationScreen"
    //     component={() => (
    //       <EmailVerificationScreen
    //         onVerifyPress={(code) => onPressVerify(code)}
    //         code={code}
    //         setCode={setCode}
    //       />
    //     )}
    //     options={{ headerShown: false }}
    //   />
    // </Stack.Navigator>
  );
};
