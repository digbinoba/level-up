import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "../CustomStyleSheet";
import { useNavigation } from "@react-navigation/native";
import { leaderboardData } from "../assets/dummydata";
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
const LeaderboardCell = ({
  image,
  userName,
  rank,
  id,
  gameId,
  gameData,
  userId,
  totalScore
}) => {
  const navigation = useNavigation();
  const exampleData = leaderboardData;
  const [profileImage, setProfileImage] = useState();

  console.log(profileImage);
  useLayoutEffect(() => {
    onSnapshot(doc(db, "levelUpAccounts", userId), (snapshot) => {
      setProfileImage(snapshot.get("profilePicture"));
    });
  }, []);
  return (
    <View className="py-2 px-3">
      <TouchableOpacity
        className="flex-row space-x-1 items-center shadow-sm shadow-yellow-200"
        onPress={() => {
          navigation.navigate("LeaderboardScreenModal", {
            userName,
            rank,
            id,
            gameId,
            gameData,
            totalScore,
          });
        }}
      >
        {/* Image */}
        <View className="flex-row justify-start items-center">
          <Image
            source={{
              uri: profileImage,
              height: 50,
              width: 50,
            }}
            className="h-12 w-12 rounded-full"
          />
          <Text
            className="text-white flex-1 p-3 text-lg"
            style={{
              fontFamily: "Karla",
            }}
          >
            {userName}
          </Text>
          <Text
            className="text-white pr-4 text-lg"
            style={{
              fontFamily: "Karla",
            }}
          >
            {rank}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LeaderboardCell;
