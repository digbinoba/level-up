import { TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
const GameCard = ({ name, imgUrl }) => {
  return (
    <TouchableOpacity>
      <Card
        mode="elevated"
        style={{
          height: 260,
          width: 300,
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <Card.Cover
          source={{
            uri: imgUrl,
          }}
          resizeMode={"cover"}
        />
        <Card.Title title={name} className="font-bold text-red-500" />
      </Card>
    </TouchableOpacity>
  );
};

export default GameCard;
