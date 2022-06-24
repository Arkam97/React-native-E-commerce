import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MyListingScreen from "../screens/MyListingScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyListings"
        component={MyListingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
