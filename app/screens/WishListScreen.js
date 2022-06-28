import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../config/colors";
import { Header } from "../components/Header";
import { ItemContext } from "../auth/ItemProvider";
import { WishListBody } from "../components/WishListBody";
import Screen from "../components/Screen";
export const WishListScreen = ({ navigation }) => {
  const { wishList } = useContext(ItemContext);
  console.log(wishList);
  return (
    <Screen>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <WishListBody wishList={wishList} navigation={navigation} />
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
});
