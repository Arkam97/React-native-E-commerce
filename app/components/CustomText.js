import React from "react";
import { Text, StyleSheet } from "react-native";
// Text.defaultProps.allowFontScaling = false;
const CustomText = ({ children, selectable, style }) => {
  return (
    <Text
      allowFontScaling={false}
      selectable={selectable}
      style={[styles.text, style]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    // fontFamily: "Roboto-Regular",
  },
});

export default CustomText;
