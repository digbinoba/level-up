import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Alert,
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
      {/* Header */}
      <Image source={{ uri: imgUrl }} className="h-1/3 w-full rounded-sm" />
      {/* Description */}
      <View className="px-3 pb-4">
        <View className="flex-row items-center space-x-4 justify-center pt-4 pb-2">
          <Text>{"20K Players"}</Text>
          <Text>{"20K Players"}</Text>
          <Text>{"20K Players"}</Text>
        </View>
        <Text className="font-bold text-lg">{name}</Text>
        <Text className="text-sm">{description}</Text>
      </View>

      {/* Add to library button */}

      <View className="flex-row justify-center">
        <TouchableOpacity
          className="bg-violet-500 rounded-lg w-2/4 items-center h-12 flex-row"
          onPress={() => {
            addGameToLibrary();
          }}
        >
          <Text className="font-bold text-lg text-center flex-1">
            Add To library 2.0
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GameDescriptionModalScreen;
