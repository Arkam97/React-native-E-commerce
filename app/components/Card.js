import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
// import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import FastImage from "react-native-fast-image";
import Text from "./Text";
import colors from "../config/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Card = ({ imageUrl, onPress, subTitle, title }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <FastImage
          style={styles.image}
          source={{
            uri: imageUrl,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
        />
        <View style={styles.cardBottom}>
          <View style={styles.detailsContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.subTitle}>
              {subTitle}
            </Text>
          </View>
          <View style={styles.addToCart}>
            <MaterialIcons
              style={styles.icon}
              name="favorite-border"
              color={colors.primary}
              size={25}
            />
            <Text numberOfLines={1} style={styles.subTitle}>
              View
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: "hidden",
    flex: 1,
    height: 250,
    margin: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white,
  },
  detailsContainer: {
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  addToCart: {
    marginTop: 10,
    alignSelf: "flex-end",
    marginRight: 10,
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "70%",
  },
  title: {
    marginBottom: 7,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  cardBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
  },
});
export default Card;
