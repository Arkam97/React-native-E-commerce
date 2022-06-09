import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User Account" component={AccountScreen} />
      <Stack.Screen name="Message" component={MessagesScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
