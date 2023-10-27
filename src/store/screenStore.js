import { create } from "zustand";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const useScreen = () => ({
  windowWidth: windowWidth,
  windowHeight: windowHeight,
});
export default create(useScreen);
