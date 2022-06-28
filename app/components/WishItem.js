import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Alert,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Colors from "../config/colors";
import NumberFormat from "react-number-format";
import CustomText from "../components/CustomText";
import { ItemContext } from "../auth/ItemProvider";

export const renderRightAction = (text, color, action, x, progress) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });
  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <TouchableOpacity
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={action}
      >
        <Text style={styles.actionText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const WishItem = ({ navigation, item, id }) => {
  const { addToCart, addOrRemoveFromWishList } = useContext(ItemContext);
  const unmounted = useRef(false);
  console.log(id);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const addToCartAct = async () => {
    try {
      await addToCart(id);
      if (!unmounted.current) {
        Alert.alert("Cart", "Do you want to add this to cart", [
          {
            text: "OK",
          },
        ]);
      }
    } catch (err) {
      throw err;
    }
  };
  const removeFavoriteAct = () => {
    Alert.alert("Are your Sure", "Do you want to remove?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "yes",
        onPress: () => addOrRemoveFromWishList(id),
      },
    ]);
  };
  const RightActions = (progress) => {
    return (
      <View style={{ width: 170, flexDirection: "row" }}>
        {renderRightAction(
          "Add to Cart",
          Colors.primary,
          addToCartAct,
          70,
          progress
        )}
        {renderRightAction(
          "Remove",
          Colors.danger,
          removeFavoriteAct,
          30,
          progress
        )}
      </View>
    );
  };
  return (
    <View>
      <Swipeable
        friction={2}
        rightThreshold={40}
        renderRightActions={RightActions}
      >
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ListingDetailScreen", item)}
            style={{
              marginLeft: 5,
              width: "30%",
              height: "100%",
              marginRight: 10,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                height: 70,
                width: "100%",
                resizeMode: "contain",
                borderRadius: 10,
              }}
              source={{ uri: item.images[0] }}
            />
          </TouchableOpacity>
          <View style={styles.info}>
            <CustomText style={styles.title}>{item.title}</CustomText>
            <View style={styles.rateContainer}>
              <NumberFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" đ"}
                renderText={(formattedValue) => (
                  <View style={styles.priceContainer}>
                    <CustomText style={styles.price}>
                      {formattedValue}
                    </CustomText>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 90,
    flexDirection: "row",
    backgroundColor: Colors.white,
    marginTop: 5,
    borderRadius: 0,
    alignItems: "center",
  },
  info: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 10,
    width: "75%",
  },
  title: {
    fontSize: 15,
  },
  subText: {
    fontSize: 13,

    color: Colors.grey,
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  rate: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.grey,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 13,
    color: Colors.red,
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  rightAction: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
    flexDirection: "row",
    height: 90,
  },
  actionText: {
    color: "white",
    fontSize: 11,
    backgroundColor: "transparent",
    padding: 5,
  },
});
