import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import GameCardRow from "../components/GameCardRow";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useFonts } from "expo-font";
import GameCard from "../components/GameCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [hasLevelUpAccount, setHasLevelUpAccount] = useState();
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [gameLibrary, setGameLibrary] = useState([]);

  useLayoutEffect(() => {
    onSnapshot(doc(db, "levelUpAccounts", user), (snapshot) => {
      if (!snapshot.exists()) {
        setHasLevelUpAccount(false);
        navigation.navigate("MakeLevelUpProfileModalScreen");
      } else {
        setHasLevelUpAccount(true);
        setUserName(snapshot.get("userName"));
        setProfileImage(snapshot.get("profilePicture"));
      }
    });
  }, []);
  useEffect(() => {
    let unsub;
    const fetchGameLibrary = async () => {
      unsub = onSnapshot(
        collection(db, "levelUpAccounts", user, "gameLibrary"),
        (snapshot) => {
          setGameLibrary(
            snapshot.docs.map((game) => ({
              id: game.id,
              ...game.data(),
            }))
          );
        }
      );
    };
    fetchGameLibrary();
    return unsub;
  }, []);
  const [loaded] = useFonts({
    Valorant: require("../assets/Fonts/Valorant-Font.ttf"),
    Karla: require("../assets/Fonts/Karla-Variable.ttf"),
  });

  if (!loaded) {
    return null;
  }
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
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          {/* WELCOME THE USER */}
          <View className="flex-row pt-3 items-center mx-2 space-x-2">
            <View className="flex-1">
              <Text
                className="font-bold text-2xl text-white"
                style={{
                  fontFamily: "Valorant",
                }}
              >
                Welcome Back
              </Text>
              <Text
                className="text-white text-2xl"
                style={{
                  fontFamily: "Valorant",
                }}
              >
                {hasLevelUpAccount ? userName : ""}
              </Text>
            </View>
            <View className="shadow-sm shadow-yellow-200">
              <Image
                source={{
                  uri: profileImage,
                }}
                style={{
                  height: 75,
                  width: 75,
                }}
                className="rounded-full"
              />
            </View>
          </View>

          {/* Extra Buttons */}
          {/* <View className="justify-start p-2">
            <Button
              title="Make a profile"
              onPress={() =>
                navigation.navigate("MakeLevelUpProfileModalScreen")
              }
            />
          </View> */}
          {/* User Library */}
          <View className="mt-3 flex-row items-center justify-between mx-3">
            <Text
              className="font-bold text-lg text-white px-2"
              style={{
                fontFamily: "Karla",
              }}
            >
              Your Library
            </Text>
            <Text
              className="font-bold text-lg px-2 text-gray-400"
              style={{
                fontFamily: "Karla",
              }}
              onPress={() => navigation.navigate("SelectGameScreen")}
            >
              Add Games
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 220 }}
          >
            {gameLibrary?.map((library) => (
              <GameCard
                name={library.gameRefToAdd.name}
                imgUrl={library.gameRefToAdd.imgUrl}
                key={library.gameRefToAdd.id}
                id={library.gameRefToAdd.id}
              />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
