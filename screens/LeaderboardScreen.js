import { View, Text, SafeAreaView, ScrollView } from "react-native";
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
  const [value, setValue] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [leader2, setLeader2] = useState([]);
  const [userName, setUserName] = useState("");
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
        let itemData=[];
        itemData.push(dataToPush);

        console.log(itemData + "index is at " + i);
        setProfileImage([...profileImage, itemData]);
      });
    }
    //   leaderboard.map(person => (
    //     onSnapshot(doc(db, "levelUpAccounts", person.id), (snapshot) => {
    //     console.log(person.id + 'right here maube')
    //     const tempData = [person.id]
    //     setProfileImage(tempData);
    //  })))
  }, []);

  console.log(leaderboard);
  useEffect(() => {
    let unsub;
    const getAllUser = async () => {
      const queryGroup = query(
        collectionGroup(db, "users"),
        orderBy("totalScore", "desc")
      );
      const queryGroupSnapShot = await getDocs(queryGroup);
      // console.log(queryGroupSnapShot.docs.at(1).data());
      // console.log("wow the log above me has the daata")
      // console.log("length of info " + queryGroupSnapShot.docs.length);
      let tempLeaderBoard = [];

      // const profileRef = doc(db, "levelUpAccounts", id, "users", user);
      // const profileSnap = await getDoc(profileRef);
      // for (let i = 0; i < queryGroupSnapShot.docs.length; i++) {
      //   console.log(i + ' is the index')
      //   tempLeaderBoard.push(queryGroupSnapShot.doc.at(0).data());
      // }
      queryGroupSnapShot.forEach((data) => {
        //console.log("player " + doc.id, " => ", doc.data());
        // onSnapshot(doc(db, "levelUpAccounts", id), (snapshot) => {
        //   setProfileImage(snapshot.get("profilePicture"));
        // });

        // console.log(data.data().totalScore)
        const docData = {
          id: data.id,
          data: data.data(),
          imgUrl: "",
        };
        if (docData.data.gameId === id) {
          tempLeaderBoard.push(docData);
        }
      });
      setLeaderboard(tempLeaderBoard);
      // const leaderboardRef = collection(db, "leaderboard");
      // const q = query(
      //   leaderboardRef,
      //   where("totalScore", ">", 0),
      //   orderBy("totalScore", "asc")
      // );
      // const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs);
      // onSnapshot(leaderboardRef, (snapshot) => {
      //   let scoreInfo = [];
      //   snapshot.docs.forEach((doc) => {
      //     scoreInfo.push({ ...doc.data(), id: doc.id });
      //   });
      //   console.log(scoreInfo);
      // });
    };
    getAllUser();
  }, []);
  useEffect(() => {});
  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#461873", "#28002F", "#FBDA58"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.8, y: 0.8 }}
        locations={[0.2, 0.5, 0.8]}
      >
        <View className="items-start px-3">
          <Text className="font-bold text-2xl text-white">LEADERBOARD</Text>
          <Text className="text-white">{name}</Text>
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
            />
          ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
