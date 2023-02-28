import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { userProfile, games } from "../assets/dummydata";
import useAuth from "../hooks/useAuth";
import LibraryCard from "../components/LibraryCard";

import { collection, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase";
const ProfileScreen = () => {
  const [gameLibrary, setGameLibrary] = useState([]);
  const { user, logOut } = useAuth();
  const [gameTotal, setGameTotal] = useState(0);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState();
  useLayoutEffect(() => {
    onSnapshot(doc(db, "levelUpAccounts", user), (snapshot) => {
      setUserName(snapshot.get("userName"));
      setProfileImage(snapshot.get("profilePicture"));
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
  const objectMap = (obj, fn) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );
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
        <ScrollView>
          <View>
            {/* Wallpaper Banner */}
            <View className="justify-center">
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?cs=srgb&dl=pexels-lucie-liz-3165335.jpg&fm=jpg",
                  height: 200,
                  width: 390,
                }}
              />
            </View>
            {/* Profile Picture */}
            <View className="flex-row justify-center absolute top-1/4 left-1/4 px-8 py-20 shadow-md shadow-yellow-200">
              <Image
                source={{
                  uri: profileImage,
                }}
                style={{
                  height: 140,
                  width: 140,
                }}
                className="h-36 w-36 rounded-full"
              />
            </View>
          </View>

          {/* Name and UserName */}
          <View className="py-20">
            <View className="flex-row items-center justify-center space-x-8">
              <Text
                className="text-white font-bold text-xl"
                style={{
                  fontFamily: "Valorant",
                }}
              >
                {userName}
              </Text>
            </View>

            {/* Game Library */}
            <View className="flex-row pb-3 pt-3 items-center mx-4 space-x-2">
              <Text
                className="text-white font-bold text-2xl"
                style={{
                  fontFamily: "Karla",
                }}
              >
                Your Library
              </Text>
            </View>
            {gameLibrary?.map((library) => (
              <LibraryCard
                name={library.gameRefToAdd.name}
                imgUrl={library.gameRefToAdd.imgUrl}
                key={library.gameRefToAdd.id}
                description={library.gameRefToAdd.description}
                id={library.gameRefToAdd.id}
                userName={userName}
              />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ProfileScreen;
