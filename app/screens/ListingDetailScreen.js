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
import ContactSellerForm from "../components/ContactSellerForm";
import Text from "../components/Text";
import ListItem from "../components/list/listItem";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { ItemContext } from "../auth/ItemProvider";
import { Header } from "../components/Header";

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params;
  const { addToCart } = useContext(ItemContext);

  const onAddToCart = () => {
    addToCart(listing.id);
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
          <Button
            title="Chat"
            alignItems="center"
            color={colors.white}
            onPress={() => navigation.navigate("Chat", listing.user)}
          />
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
});

export default ListingDetailsScreen;
