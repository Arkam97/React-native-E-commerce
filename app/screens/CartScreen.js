import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, StyleSheet, Platform, Text, Dimensions } from "react-native";
import { AuthContext } from "../auth/AuthProvider";
import { ItemContext } from "../auth/ItemProvider";
import { CartBody } from "../components/CartBody";
import { Header } from "../components/Header";
import { TotalButton } from "../components/TotalButton";
import Colors from "../config/colors";
// import { CartBody, TotalButton } from "./components";

const { height } = Dimensions.get("window");

export const CartScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { cartList, getTotalPrice } = useContext(ItemContext);

  let total = getTotalPrice();

  return (
    <View style={styles.container}>
      <Header navigation={navigation} position="relative" />
      <CartBody user={user} carts={cartList} navigation={navigation} />
      {cartList.length !== 0 ? (
        <TotalButton total={total} navigation={navigation} />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    marginVertical: 20,
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  centerLoader: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
  },
});
