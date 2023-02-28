import { View, Text, ScrollView } from "react-native";
import React from "react";
import GameCard from "./GameCard";
const GameCardRow = () => {
  return (
    <View>
      <View className="mt-3 flex-row items-center justify-between">
        <Text className="font-bold text-lg text-white">Your Library</Text>
        <Text className="font-bold text-lg px-4 text-gray-400">See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <GameCard
          name={"Super Smash Bros Ultimate"}
          imgUrl={
            "https://cdn.shopify.com/s/files/1/0747/3829/products/mL2398_1024x1024.jpg?v=1571445543"
          }
        />
        <GameCard
          name={"Valorant"}
          imgUrl={"https://wallpapercave.com/wp/wp8480240.jpg"}
        />
        <GameCard
          name={"Tekken 8"}
          imgUrl={
            "https://www.fightersgeneration.com/news2022/news3/tekken8/screens/tekken8-key-art.jpg"
          }
        />
      </ScrollView>
    </View>
  );
};

export default GameCardRow;
