import React from "react";
// import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, NativeModules } from "react-native";
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: STATUSBAR_HEIGHT,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
