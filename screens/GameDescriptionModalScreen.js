import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import {
  addDoc,
  collection,
  doc,
  FieldValue,
  setDoc,
  updateDoc,
  arrayUnion,
  DocumentReference,
  Firestore,
  getFirestore,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const GameDescriptionModalScreen = () => {
  const {
    params: { name, description, imgUrl, id, gameObject },
  } = useRoute();

  const gameData = {
    points: 100,
    reference: DocumentReference,
  };
  const gameToAdd = {
    gameId: id,
    createdAt: Timestamp.fromDate(new Date()),
  };
  const gameRefToAdd = {
    name: name,
    description: description,
    imgUrl: imgUrl,
    id: id,
  };

  const scores = [
    {
      score: null,
      timestamp: null,
    },
  ];
  const { user } = useAuth();
  const addToLibraryAlert = () => {
    Alert.alert("Notification", `${name} has been added to your library!'`, [
      {
        text: "OK",
      },
    ]);
  };

  const addGameToLibrary = async () => {
    const docRef = doc(db, "levelUpAccounts", user);
    const gameLibDocRef = doc(db, "levelUpAccounts", user, "gameLibrary", id);
    const leaderboardDocRef = doc(db, "leaderboard", id, "users", user);
    const gameData2 = {
      points: 100,
      reference: doc(db, "gameLibrary", id),
    };
    console.log("going to userref");
    // Check if the game library exists
    updateDoc(docRef, {
      gameLibrary: arrayUnion(gameToAdd),
    })
      .then(() => {
        addToLibraryAlert();
      })
      .catch((error) => {
        alert("There is an error. Try again later.");
      });
    //make the user have a leaderboard spot for their game
    updateDoc(doc(db, "userGameLibrary", user), {
      games: arrayUnion(gameRefToAdd),
    }).catch((error) => {
      alert("couldnt add game to your library for some reason");
    });
    setDoc(gameLibDocRef, {
      gameRefToAdd,
    }).catch((error) => {
      alert("couldnt add a collection document");
    });

    //Make a document for the leaderboard collection
    setDoc(leaderboardDocRef, {
      scores,
      totalScore: 0,
    }).catch((error) => {
      alert("could add leaderboard for this game");
    });
  };
  return (
    <>
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
        <Image source={{ uri: imgUrl }} className="h-1/3 w-full rounded-sm" />
        {/* Description */}
        <View className="px-3 pb-4 pt-4">
          <Text
            className="font-bold text-lg text-white"
            style={{
              fontFamily: "Valorant",
            }}
          >
            {name}
          </Text>
          <Text className="text-sm text-white">{description}</Text>
        </View>

        {/* Add to library button */}

        <View className="flex-row justify-center">
          <TouchableOpacity
            className="bg-violet-500 rounded-lg w-2/4 items-center h-12 flex-row shadow-md"
            onPress={() => {
              addGameToLibrary();
            }}
          >
            <Text className="font-bold text-lg text-center flex-1">
              Add To Library
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default GameDescriptionModalScreen;
