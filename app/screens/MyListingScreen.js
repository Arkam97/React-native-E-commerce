import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import useApi from "../hooks/useApi";
import { getItems } from "../api/Item";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import Button from "../components/Button";
import Card from "../components/Card";
import CustomText from "../components/CustomText";
import { Header } from "../components/Header";

const MyListingScreen = ({ route, navigation }) => {
  const userID = route.params;

  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(getItems);

  useEffect(() => {
    loadListings();
  }, []);

  console.log(listings);
  const filtered = listings.filter((item) => item.usr == userID);
  console.log(filtered);
  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      <Header navigation={navigation} position="relative" />
      {filtered?.length === 0 && !loading ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 20 }}>
            No Items, Add Some Item
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(filtered) => filtered.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.images[0]}
              onPress={() => navigation.navigate("ListingDetailScreen", item)}
            />
          )}
        />
      )}
    </Screen>
  );
};

export default MyListingScreen;

const styles = StyleSheet.create({
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
