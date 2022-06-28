import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";

import colors from "../config/colors";
import Text from "../components/Text";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { ItemContext } from "../auth/ItemProvider";
import { Header } from "../components/Header";

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params;
  const { addToCart, addOrRemoveFromWishList } = useContext(ItemContext);

  const onAddToCart = () => {
    addToCart(listing.id);
  };

  const addToWishList = () => {
    addOrRemoveFromWishList(listing.id);
  };
  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <View style={styles.headerContainer}>
          <Header navigation={navigation} position="absolute" />
          <SliderBox
            images={listing?.images}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            dotColor={colors.primary}
            autoplay
            resizeMode="cover"
            sliderBoxHeight={300}
            ImageComponentStyle={{ width: "100%" }}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.description}>{listing.description}</Text>
          <Text style={styles.price}>${listing.price}</Text>
        </View>
        <View style={styles.parent}>
          <View style={styles.chat_wish}>
            <Button
              title="Add to WishList"
              alignItems="center"
              onPress={() => addToWishList()}
              width="45%"
            />
            <Button
              title="Chat"
              alignItems="center"
              onPress={() => navigation.navigate("Chat")}
              width="45%"
            />
          </View>
          <Button
            title="Add to cart"
            alignItems="center"
            onPress={() => onAddToCart()}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginHorizontal: 10,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  description: {
    fontSize: 12,
    fontWeight: "200",
  },
  parent: {
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
    top: 0,
    left: 0,
  },
  chat_wish: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default ListingDetailsScreen;
