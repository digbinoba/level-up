import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    Valorant: require("../assets/Fonts/Valorant-Font.ttf"),
    Karla: require("../assets/Fonts/Karla-Variable.ttf"),
  });
};
