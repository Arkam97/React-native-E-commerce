import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function Button({ title, onPress, color = "primary", alignItems }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color], alignItems: alignItems },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: color == colors.white ? colors.primary : colors.white },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    padding: 15,
    width: "90%",
    marginVertical: 10,
    // borderRadius: 2,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  text: {
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
});

export default Button;
