import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "../CustomStyleSheet";
import { useNavigation } from "@react-navigation/native";
import { leaderboardData } from "../assets/dummydata";
const LeaderboardCell = ({ image, userName, rank, id, gameId, gameData}) => {
  const navigation = useNavigation();
  const exampleData = leaderboardData;
  return (
    <View className="py-2">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("LeaderboardScreenModal", {
            userName,
            rank,
            id,
            gameId,
            gameData
          });
        }}
      >
        {/* Image */}
        <View className="flex-row justify-start items-center">
          <Image
            source={{
              uri: "https://static.wikia.nocookie.net/fzero/images/8/85/Cp2.jpg/revision/latest?cb=20150317022538",
              height: 50,
              width: 50,
            }}
            className="h-12 w-12 rounded-full"
          />
          <Text className="text-white">{userName}</Text>
          <Text className="text-white">{rank}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LeaderboardCell;
