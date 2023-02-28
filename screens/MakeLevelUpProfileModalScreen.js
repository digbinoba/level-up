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

const MakeLevelUpProfileModalScreen = () => {
  const someImg = require("../assets/img1.png");
  const [enteredUserName, setEnteredUserName] = useState();
  const navigation = useNavigation();

  const { user } = useAuth();
  // add username to database

  console.log(enteredUserName);
  const addToLibraryAlert = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Account has been made",
        `Welcome to the cool club, ${enteredUserName}'`,
        [
          {
            text: "OK",
            onPress: () => resolve("OK"),
          },
        ],
        { cancelable: false }
      );
    });
  };

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
        setDoc(doc(db,"userGameLibrary", user), {
          
        })
      })
      .then(() => {
        alert("your username has been created")
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
        <View className="h-36 w-96 flex-row justify-center">
          <Image source={someImg} className="h-36 w-36 rounded-sm" />
        </View>
        <Text className="text-white text-lg font-bold">
          Welcome to Level Up! Please make an username, Gamer!
        </Text>
        <View className="bg-blue-200">
          <TextInput
            className="text-white text-center text-xl"
            placeholder="Enter your username here!"
            onChangeText={(text) => setEnteredUserName(text)}
            value={enteredUserName}
            keyboardType="default"
          />
        </View>
        <View className="flex-row justify-center">
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
