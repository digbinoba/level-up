import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import GameCardRow from "../components/GameCardRow";
import { ToggleButton, Button, SegmentedButtons } from "react-native-paper";
import LeaderboardCell from "../components/LeaderboardCell";
import { db } from "../firebase";
import { useRoute } from "@react-navigation/native";
import {
  query,
  orderBy,
  getDocs,
  collectionGroup,
  getDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
const LeaderboardScreen = ({ navigation }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const {
    params: { name, description, imgUrl, id, gameObject },
  } = useRoute();
  useLayoutEffect(() => {
    for (let i = 0; i < leaderboard.length; i++) {
      const playerId = leaderboard[i].id;
      const dataToPush = {
        playerId: playerId,
      };
      onSnapshot(doc(db, "levelUpAccounts", playerId), (snapshot) => {
        let temp = snapshot.get("profilePicture");
        dataToPush.imgUrl = temp;
        let itemData = [];
        itemData.push(dataToPush);
        setProfileImage([...profileImage, itemData]);
      });
    }
  }, []);

  useEffect(() => {
    let unsub;
    const getAllUser = async () => {
      const queryGroup = query(
        collectionGroup(db, "users"),
        orderBy("totalScore", "desc")
      );
      const queryGroupSnapShot = await getDocs(queryGroup);
      let tempLeaderBoard = [];
      queryGroupSnapShot.forEach((data) => {
        const docData = {
          id: data.id,
          data: data.data(),
          userId: data.id,
          imgUrl: "",
        };
        if (docData.data.gameId === id) {
          tempLeaderBoard.push(docData);
          // console.log(docData)
        }
      });

      setLeaderboard(tempLeaderBoard);
    };
    getAllUser();
  }, []);
  useEffect(() => {});
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
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View className="items-center px-3 justify-center pt-4">
            <Text
              className="font-bold text-2xl text-white"
              style={{
                fontFamily: "Valorant",
              }}
            >
              LEADERBOARD
            </Text>
            <Text
              className="text-white"
              style={{
                fontFamily: "Valorant",
              }}
            >
              {name}
            </Text>
          </View>
          <ScrollView>
            {/* Leaderboard Cells go here */}
            {leaderboard?.map((data, index) => (
              <LeaderboardCell
                userName={data.data.playersName}
                rank={index + 1}
                key={data.id}
                id={data.id}
                gameId={data.data.gameId}
                gameData={data.data.scores}
                userId={data.userId}
                totalScore={data.data.totalScore}
              />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
