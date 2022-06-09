import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    letterSpacing: 0.2,
    color: colors.medium,
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    alignSelf: "center",
  },
};
