import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailScreen from "../screens/ListingDetailScreen";
import { WishListScreen } from "../screens/WishListScreen";

const Stack = createStackNavigator();

const FeedNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="ListingScreen" component={ListingScreen} />
      <Stack.Screen
        name="ListingDetailScreen"
        component={ListingDetailScreen}
      />
      <Stack.Screen name="WishListScreen" component={WishListScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
