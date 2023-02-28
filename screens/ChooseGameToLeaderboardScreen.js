import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import SelectGameCard from "../components/SelectGameCard";
const ChooseGameToLeaderboardScreen = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    let unsub;

    const fetchGames = async () => {
      unsub = onSnapshot(collection(db, "gameLibrary"), (snapshot) => {
        setGames(
          snapshot.docs.map((game) => ({
            id: game.id,
            ...game.data(),
          }))
        );
      });
    };
    fetchGames();
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
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Text className="text-white font-bold text-2xl">Game Select</Text>
        </View>
        <ScrollView
          className="pt-4"
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        >
          {games?.map((game) => (
            <SelectGameCard
              name={game.name}
              imgUrl={game.imgUrl}
              key={game.id}
              id={game.id}
              description={game.description}
              gameObject={game}
              sendToLeaderBoard={false}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChooseGameToLeaderboardScreen;
