import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { leaderboardData } from "../assets/dummydata";
import GameCardRow from "../components/GameCardRow";
import PlayerCard from "../components/PlayerCard";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
  increment,
  collection,
  where,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";
const LeaderboardScreenModal = () => {
  const navigation = useNavigation();
  const {
    params: { userName, rank, id, gameId, gameData },
  } = useRoute();
  const [gameLibrary, setGameLibrary] = useState([]);
  const [profileImage, setProfileImage] = useState([]);

  useLayoutEffect(() => {
    onSnapshot(doc(db, "levelUpAccounts", id), (snapshot) => {
      setProfileImage(snapshot.get("profilePicture"));
    });
  }, []);
  const reversedGameData = gameData
    .slice(0)
    .reverse()
    .map((element) => {
      return element;
    });
  const recentGames = reversedGameData.slice(0, 5);
  useEffect(() => {
    let unsub;
    const fetchGameLibrary = async () => {
      unsub = onSnapshot(
        collection(db, "levelUpAccounts", id, "gameLibrary"),
        (snapshot) => {
          setGameLibrary(
            snapshot.docs.map((game) => ({
              ...game.data(),
            }))
          );
        }
      );
    };
    fetchGameLibrary();
    return unsub;
  }, []);

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
                  uri: "https://wallpaper.dog/large/1004372.jpg",
                  height: 200,
                  width: 390,
                }}
              />
            </View>
            {/* Profile Picture */}
            <View className="flex-row justify-center absolute top-1/4 left-1/4 px-8 py-20">
              <Image
                source={{
                  uri: profileImage,
                  height: 100,
                  width: 100,
                }}
                className="h-36 w-36 rounded-full"
              />
            </View>
          </View>

          {/* Name and UserName */}
          <View className="py-20">
            <View className="flex-row items-center justify-center space-x-8">
              <Text className="text-white font-bold text-2xl">{userName}</Text>
              <Text className="text-white font-bold text-2xl">
                Current Rank: {rank}
              </Text>
            </View>
          </View>
          {/* Players Library */}
          <View className="flex-row pb-3 items-center mx-4 space-x-2">
            <Text className="text-white font-bold text-2xl">Recent Scores</Text>
          </View>
          <View className="py-3">
            <View className="flex-row items-center justify-center space-x-8">
              {/* Scores Column */}
              <View className="flex-col items-center justify-center space-x-8 flex">
                <Text className="text-white font-bold text-xl">Score</Text>
                {recentGames?.map((game) => (
                  <>
                    <Text className="text-white font-bold">{game.score}</Text>
                  </>
                ))}
              </View>
              {/* Date Column */}
              <View className="flex-col items-center justify-center space-x-8 flex">
                <Text className="text-white font-bold text-xl">Date</Text>
                {recentGames?.map((game) => (
                  <>
                    <Text className="text-white font-bold">
                      {game.createdAt
                        .toDate()
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ")}
                    </Text>
                  </>
                ))}
              </View>
            </View>
          </View>

          <View className="flex-row pb-3 items-center mx-4 space-x-2">
            <Text className="text-white font-bold text-2xl">
              {userName} also plays
            </Text>
          </View>
          <ScrollView>
            {gameLibrary?.map((library) => (
              <PlayerCard
                name={library.gameRefToAdd.name}
                imgUrl={library.gameRefToAdd.imgUrl}
                key={library.id}
              />
            ))}
          </ScrollView>

          {/* TO:DO Analyze Button */}
          {/* <View className="flex-row justify-center">
            <TouchableOpacity
              className="bg-violet-500 rounded-lg w-2/4 items-center h-12 flex-row"
              onPress={() => {
                navigation.navigate("Analytics");
              }}
            >
              <Text className="font-bold text-lg text-center flex-1">
                Analyze
              </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LeaderboardScreenModal;
