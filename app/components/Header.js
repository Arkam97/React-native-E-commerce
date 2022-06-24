import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../config/colors";

const { height } = Dimensions.get("window");

export const Header = ({ navigation, position }) => {
  return (
    <View style={[styles.header, { position: position }]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialIcons name="arrow-back-ios" size={30} color={colors.primary} />
      </TouchableOpacity>
      <View style={{ width: 15 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
    zIndex: 1,
  },
});
