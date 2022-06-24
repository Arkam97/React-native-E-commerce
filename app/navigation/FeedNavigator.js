import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailScreen from "../screens/ListingDetailScreen";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../config/colors";

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
    </Stack.Navigator>
  );
};

export default FeedNavigator;
