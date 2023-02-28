import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { useFonts } from "expo-font";
const MakeLevelUpProfileModalScreen = () => {
  const someImg = require("../assets/createAcccount.png");
  const [enteredUserName, setEnteredUserName] = useState();
  const navigation = useNavigation();

  const { user } = useAuth();

  const [loaded] = useFonts({
    Valorant: require("../assets/Fonts/Valorant-Font.ttf"),
    Karla: require("../assets/Fonts/Karla-Variable.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const updateLevelUpUserName = () => {
    setDoc(doc(db, "levelUpAccounts", user), {
      //set the data
      hasLevelUpAccount: true,
      userName: enteredUserName,
      gameLibrary: {},
      //Always put time stamp
      timestamp: serverTimestamp(),
    })
      .then(() => {
        //Set the username in our public accounts
        setDoc(doc(db, "publicAccounts", enteredUserName), {
          uuid: user,
        });
      })
      .then(() => {
        setDoc(doc(db, "userGameLibrary", user), {});
      })
      .then(() => {
        alert(
          `Your username has been created! Welcome to LevelUp, ${enteredUserName}!`
        );
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <SafeAreaView>
      <ImageBackground
        resizeMethod="cover"
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/008/605/397/original/dark-blue-and-purple-abstract-background-with-big-circle-suitable-for-mobile-app-background-vector.jpg",
        }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View className="h-36 w-96 flex-row justify-center py-10">
          <Image source={someImg} className="h-36 w-36 rounded-sm" />
        </View>
        <View className="py-10">
          <Text
            className="text-white text-2xl text-center pt-6"
            style={{
              fontFamily: "Valorant",
            }}
          >
            Welcome to Level Up!
          </Text>
          <Text
            className="text-white text-lg font-bold text-justify pt-3 m-6"
            style={{
              fontFamily: "Karla",
            }}
          >
            It seems that you don't have a username. Please make a username and
            climb to the top of your competition!
          </Text>
        </View>

        <View
          className="bg-[#A084DC] space-x-4 m-3 shadow shadow-[#FFE15D] rounded"
        >
          <TextInput
            className="text-white text-center text-xl"
            placeholder="Enter your username here!"
            onChangeText={(text) => setEnteredUserName(text)}
            value={enteredUserName}
            keyboardType="default"
          />
        </View>
        <View className="flex-row justify-center m-4">
          <TouchableOpacity
            className="bg-violet-500 rounded-lg w-2/4 items-center h-12 flex-row"
            onPress={updateLevelUpUserName}
          >
            <Text className="font-bold text-lg text-center flex-1">
              Set Username
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MakeLevelUpProfileModalScreen;
