import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/list/listItem";
import ListItemSeperator from "../components/list/ListItemSeperator";
// import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { AuthContext } from "../auth/AuthProvider";
import useApi from "../hooks/useApi";
import { getUser } from "../api/user";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "MyListings",
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Chat",
  },
];

const AccountScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const {
    data: userData,
    error,
    loading,
    request: getUserDetails,
  } = useApi(getUser);

  useEffect(() => {
    getUserDetails(user.uid);
  }, []);

  console.log(userData);
  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      {error ||
        (userData === null && (
          <>
            <AppText>Couldn't retrieve the user.</AppText>
            <Button title="Retry" onPress={getUserDetails(user.uid)} />
          </>
        ))}
      <View style={styles.container}>
        <ListItem
          title={userData?.lname}
          subTitle={userData?.email}
          image={require("../assets/chair.jpg")}
          style={styles.listItem}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              style={styles.listItem}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item?.targetScreen, user.uid)}
            />
          )}
        />
        <ListItem
          title="Log Out"
          style={styles.listItem}
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logout()}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // marginVertical: 20,
  },
  listItem: {
    backgroundColor: colors.white,
    marginVertical: 10,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
