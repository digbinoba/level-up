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
const LoginScreen = () => {
  const { accessToken, promptAsync, request, firebaseLogin, user, loading } =
    useAuth();
  const someImg = require("../assets/img1.png");
  return (
    <View>
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
        <View className="items-center">
          <Image
            source={someImg}
            style={{
              width: "50%",
              height: "50%",
            }}
          />
        </View>
        <Text>{loading ? "loading..." : "please Log in to the app"}</Text>
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
            title="Log in with expo"
            disabled={!request}
            onPress={() => {
              promptAsync({ useProxy: true });
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
