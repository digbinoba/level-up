import { TouchableOpacity, View, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const GameCard = ({ name, imgUrl, highScore, id }) => {
  const [totalScore, setTotalScore] = useState(0);
  const { user, logOut } = useAuth();

  useEffect(() => {
    const getTotal = async () => {
      console.log(id);
      const scoreRef = doc(db, "leaderboard", id, "users", user);
      const scoreSnap = await getDoc(scoreRef);
      const total = scoreSnap.data().totalScore;
      setTotalScore(total);
      console.log(total);
    };
    getTotal();
  });
  return (
    <TouchableOpacity>
      <View className="flex-row pt-3 items-center mx-2 space-x-2">
        <Image
          source={{ uri: imgUrl }}
          style={{
            height: 200,
            width: 175,
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        />
        <View className="flex-1 items-center">
          <Text
            className="font-bold text-2xl text-white justify-center"
            style={{
              fontFamily: "Karla",
            }}
          >
            Current Score
          </Text>
          <Text
            className="font-bold text-2xl text-white"
            style={{
              fontFamily: "Valorant",
            }}
          >
            {totalScore}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;
