import { View, Text, ScrollView } from "react-native";
import React from "react";
import GameCard from "./GameCard";
const GameCardRow = () => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={true}>
        <GameCard
          name={"Super Smash Bros Ultimate"}
          imgUrl={
            "https://cdn.shopify.com/s/files/1/0747/3829/products/mL2398_1024x1024.jpg?v=1571445543"
          }
          highScore={2}
        />
      </ScrollView>
    </View>
  );
};

export default GameCardRow;
