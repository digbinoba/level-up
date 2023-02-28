import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useFonts } from "expo-font";

const LoginScreen = () => {
  const { accessToken, promptAsync, request, firebaseLogin, user, loading } =
    useAuth();
  const someImg = require("../assets/loginPic.png");
  const wallpaper = require("../assets/loginBG.jpg");

    const [loaded] = useFonts({
      Valorant: require("../assets/Fonts/Valorant-Font.ttf"),
      Karla: require("../assets/Fonts/Karla-Variable.ttf"),
    });

    if (!loaded) {
      return null;
    }
  return (
    <View>
      <ImageBackground
        resizeMethod="cover"
        source={wallpaper}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View className="items-center py-20">
          <Image
            source={someImg}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <View className="flex justify-center items-center">
          <Text
            className="text-white font-bold text-5xl"
            style={{
              fontFamily: "Valorant",
            }}
          >
            Level Up
          </Text>
        </View>

        <TouchableOpacity
          className="absolute bottom-20 w-52 bg-white p-4 rounded-2xl"
          style={{
            marginHorizontal: "25%",
          }}
        >
          <Button
            title={accessToken ? "Firebase is enabled!" : "Login with firebase"}
            onPress={() => firebaseLogin()}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl"
          style={{
            marginHorizontal: "25%",
          }}
        >
          <Button
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
              promptAsync({ useProxy: true }).then(res => {
                res
              });
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
