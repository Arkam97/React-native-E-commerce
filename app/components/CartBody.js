import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Text,
} from "react-native";

import { ItemContext } from "../auth/ItemProvider";
import CustomText from "../components/CustomText";
import Colors from "../config/colors";
import { CartItem } from "./CartItem";
// import Messages from "../../../messages/user";

export const CartBody = ({ navigation, user, carts }) => {
  const { addToCart, clearCart, removeCartItem, decCartQuantity } =
    useContext(ItemContext);

  const removeHandler = (ID) => {
    Alert.alert("Are You Sure", "You want to delete?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => removeCartItem(ID),
      },
    ]);
  };
  return (
    <View style={styles.footer}>
      {carts?.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 20 }}>
            Cart is empty, Add items to cart
          </CustomText>
        </View>
      ) : (
        <View style={{ marginBottom: 80 }}>
          <FlatList
            data={carts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <CartItem
                  item={item}
                  onRemove={() => removeHandler(item.id)}
                  onAdd={() => {
                    addToCart(item.id);
                  }}
                  onDes={() => {
                    decCartQuantity(item.id);
                  }}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
  nextButton: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    borderColor: Colors.lighter_green,
    marginTop: 10,
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
