import { FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import HomeScreen from "../components/homeScreen";
import AppText from "../components/Text";
import Button from "../components/Button";
import { getItems } from "../api/Item";
import Card from "../components/Card";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../config/colors";

const ActionBarImage = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png",
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          marginLeft: 15,
        }}
      />
    </View>
  );
};
const ListingScreen = ({ navigation }) => {
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(getItems);

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <HomeScreen style={styles.screen} navigation={navigation}>
        {error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
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
      </HomeScreen>
    </>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({});
