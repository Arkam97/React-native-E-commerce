import React, { useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  NativeModules,
  StatusBar,
  Image,
  Text,
} from "react-native";
import colors from "../config/colors";
const { StatusBarManager } = NativeModules;
import { SearchBar } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ItemContext } from "../auth/ItemProvider";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 60;

const HomeScreen = ({ children, style }) => {
  const { getItemsCount } = useContext(ItemContext);
  const numberOfCartItem = getItemsCount();
  console.log(numberOfCartItem);
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar
        style={styles.statusBar}
        translucent
        backgroundColor={colors.primary}
      />
      <View style={styles.appBar}>
        <Image style={styles.logo} source={require("../assets/chair.jpg")} />
        <SearchBar
          style={styles.SearchBar}
          placeholder="Search..."
          // onChangeText={this.updateSearch}
          // value={search}
          containerStyle={{
            backgroundColor: colors.primary,
            borderTopWidth: 0,
            elevation: 0,
            borderBottomWidth: 0,
            width: "60%",
            justifyContent: "space-between",
          }}
          inputContainerStyle={{
            backgroundColor: colors.white,
            height: 35,
            margin: 5,
          }}
          lightTheme={colors.danger}
          round
        />
        <View
          style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
        >
          <MaterialCommunityIcons style={styles.icon} name="cart" size={30} />
          {numberOfCartItem > 0 ? (
            <View
              style={{
                position: "absolute",
                backgroundColor: colors.secondary,
                width: 16,
                height: 16,
                borderRadius: 15 / 2,
                right: 10,
                top: +10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 12,
                }}
              >
                {numberOfCartItem}
              </Text>
            </View>
          ) : null}
        </View>

        <MaterialCommunityIcons style={styles.icon} name="home" size={30} />
      </View>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUSBAR_HEIGHT,
    flex: 1,
    backgroundColor: colors.primary,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: colors.primary,
    height: APPBAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
  },
  view: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.light,
  },
  SearchBar: {
    backgroundColor: colors.white,
  },
  logo: {
    width: 35,
    height: 35,
    justifyContent: "flex-start",
    marginLeft: 10,
    borderRadius: 35,
  },

  icon: {
    color: colors.white,
    margin: 10,
    // justifyContent: "flex-end",
    position: "relative",
  },
});

export default HomeScreen;
