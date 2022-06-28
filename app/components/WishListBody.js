import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CustomText from "../components/CustomText";
import { WishItem } from "./WishItem";

export const WishListBody = ({ navigation, wishList }) => {
  return (
    <>
      {wishList.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            No Wish Items, Add some to Wish list
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={wishList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <WishItem
                navigation={navigation}
                item={item.product}
                id={item.id}
              />
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
