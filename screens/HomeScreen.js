import { View, Text, SafeAreaView, ScrollView, Button } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import GameCardRow from "../components/GameCardRow";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logOut } = useAuth();
    const [hasLevelUpAccount, setHasLevelUpAccount] = useState();
    const [userName, setUserName] = useState("");
    useLayoutEffect(() => {
      onSnapshot(doc(db, "levelUpAccounts", user), (snapshot) => {
        if (!snapshot.exists()) {
          setHasLevelUpAccount(false);
          navigation.navigate("MakeLevelUpProfileModalScreen");
        }else{
          setHasLevelUpAccount(true);
          setUserName(snapshot.get("userName"))
        }
      });
    }, []);
  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#461873", "#28002F", "#FBDA58"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.8, y: 0.8 }}
        locations={[0.2, 0.5, 0.8]}
      >
          <>
            <View className="items-center">
              <Text className="font-bold text-2xl text-white">
                Welcome Back,
              </Text>
              <Text className="text-white">{hasLevelUpAccount ? userName : ""}</Text>
            </View>
            <Button title="log off" onPress={logOut} />
            <Button
              title="Go to game library"
              onPress={() => navigation.navigate("SelectGameScreen")}
            />
            <Button
              title="Make a profile"
              onPress={() =>
                navigation.navigate("MakeLevelUpProfileModalScreen")
              }
            />
            <ScrollView>
              <GameCardRow />
              <GameCardRow />
            </ScrollView>
          </>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
