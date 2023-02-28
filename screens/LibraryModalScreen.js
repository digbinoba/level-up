import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
  increment,
} from "firebase/firestore";
import { onValue } from "firebase/database";
const deviceWidth = Math.round(Dimensions.get("window").width);

const LibraryModalScreen = () => {
  const { user } = useAuth();
  const {
    params: { name, description, imgUrl, id, gameObject, userName },
  } = useRoute();
  console.log(imgUrl);
  const [profileImage, setProfileImage] = useState();

  const [enteredScore, setEnteredScore] = useState();
  const [totalScore, setTotalScore] = useState(0);
  const navigation = useNavigation();
  const score = {
    data: enteredScore,
    timeStamp: serverTimestamp(),
  };

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
  const realSubmitScore = async () => {
    console.log(user);
    const scoreRef = doc(db, "leaderboard", id, "users", user);
    const scoreSnap = await getDoc(scoreRef);
    console.log("checking score snap");
    console.log(scoreSnap.data());

    let unsub;
    const dataToEnter = {
      data: [
        {
          score: enteredScore,
          createdAt: Timestamp.fromDate(new Date()),
        },
      ],
    };
    updateDoc(scoreRef, {
      scores: arrayUnion({
        score: enteredScore,
        createdAt: Timestamp.fromDate(new Date()),
      }),
      totalScore: increment(enteredScore),
      gameId: id,
      nameOfGame: name,
      playersName: userName,
    })
      .then(() => {
        alert("Your score has been added!");
        navigation.goBack();
      })
      .catch((error) => {
        alert("couldnt add your score. try again later");
      });
  };
  return (
    <>
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
          {/* Header */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Image
                source={{ uri: imgUrl }}
                className="h-1/3 w-full rounded-sm"
              />
              {/* Description */}
              <View className="px-3 pb-4">
                <View className="flex-row items-center space-x-4 justify-center pt-4 pb-2"></View>
                <Text className="font-bold text-lg">{name}</Text>
                <Text className="text-sm text-white">{description}</Text>
              </View>
              {/* List the high score total */}
              <View className="px-3 pb-4">
                <View className="flex-row items-center space-x-4 justify-center pt-4 pb-2"></View>
                <Text className="font-bold text-lg">
                  {"your current high score"}
                </Text>
                <Text className="text-sm text-white">{totalScore}</Text>
              </View>
              {/* Submit Score */}
              <View className="bg-blue-200">
                <TextInput
                  className="text-white text-center text-xl"
                  placeholder="Enter your score here"
                  onChangeText={(score) => setEnteredScore(score)}
                  value={enteredScore}
                  keyboardType="numeric"
                  style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                  }}
                />
              </View>
              <View className="flex-row justify-center">
                <TouchableOpacity
                  className="bg-violet-500 rounded-lg w-2/4 items-center h-12 flex-row"
                  onPress={() => {
                    realSubmitScore();
                  }}
                >
                  <Text className="font-bold text-lg text-center flex-1">
                    Submit Score
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default LibraryModalScreen;
