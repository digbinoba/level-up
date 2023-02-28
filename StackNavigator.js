import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useState, useLayoutEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

//Screen names
const homeName = "Home";
const leaderboardName = "Leaderboards";
const leaderboardGameSelected = "LeaderboardGameSelected";
const profileName = "Profile";
const analyticsName = "Analytics";
const loginName = "Login";
const selectGameScreen = "SelectGameScreen";
const gameDescriptionModalScreen = "GameDescriptionModalScreen";
const leaderboardScreenModal = "LeaderboardScreenModal";
const makeLevelUpProfileModalScreen = "MakeLevelUpProfileModalScreen";
const libraryModalScreen = "LibraryModalScreen";
const chooseGameToLeaderboardScreen = "Leaderboards";
//Screens
import HomeScreen from "./screens/HomeScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import LoginScreen from "./screens/LoginScreen";
import SelectGameScreen from "./screens/SelectGameScreen";
import GameDescriptionModalScreen from "./screens/GameDescriptionModalScreen";
import LeaderboardScreenModal from "./screens/LeaderboardScreenModal";
import MakeLevelUpProfileModalScreen from "./screens/MakeLevelUpProfileModalScreen";
import LibraryModalScreen from "./screens/LibraryModalScreen";
import ChooseGameToLeaderboardScreen from "./screens/ChooseGameToLeaderboardScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "./hooks/useAuth";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomNavTabs() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      barStyle={{ backgroundColor: "#4B354D" }}
      activeColor="#ffd500"
      inactiveColor="ffffff"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home";
          } else if (rn === chooseGameToLeaderboardScreen) {
            iconName = focused ? "leaderboard" : "leaderboard";
          } else if (rn === analyticsName) {
            iconName = focused ? "analytics" : "analytics";
          } else if (rn === profileName) {
            iconName = focused ? "person" : "person";
          }
          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={leaderboardName} component={ChooseGameToLeaderboardScreen} />
      {/* <Tab.Screen name={analyticsName} component={AnalyticsScreen} /> */}
      <Tab.Screen name={profileName} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  const { user } = useAuth();
  // check if the logged in user has a level up account

  //Return the Home Screen only if the user is logged in
  //If the user isn't logged in, we only show the login screen
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="test"
            component={BottomNavTabs}
            options={{
              title: "LevelUp",
              headerLeft: () => <MaterialIcons name={"menu"} size={24} />,
              headerRight: () => <MaterialIcons name={"person"} size={24} />,
            }}
          />
          <Stack.Screen name={selectGameScreen} component={SelectGameScreen} />
          <Stack.Screen
            name={leaderboardGameSelected}
            component={LeaderboardScreen}
          />

          {/* Modals */}
          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen
              name={gameDescriptionModalScreen}
              component={GameDescriptionModalScreen}
            />
            <Stack.Screen
              name={leaderboardScreenModal}
              component={LeaderboardScreenModal}
            />
            <Stack.Screen
              name={makeLevelUpProfileModalScreen}
              component={MakeLevelUpProfileModalScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name={libraryModalScreen}
              component={LibraryModalScreen}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name={loginName} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
