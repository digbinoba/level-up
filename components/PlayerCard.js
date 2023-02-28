import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const deviceWidth = Math.round(Dimensions.get("window").width);

const PlayerCard = ({name, imgUrl}) => {
  return (
    <TouchableOpacity
      className="mt-2"
    >
      <View
        className="rounded-xl mx-1.5"
        style={{
          width: deviceWidth - 10,
          height: 150,
          backgroundColor: "black",
        }}
      >
        <Image
          className="rounded-xl"
          source={{
            uri: imgUrl,
          }}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.7,
          }}
        />
        <Text className="font-extrabold text-white absolute bottom-10 right-3 text-xl pb-6">
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlayerCard;
