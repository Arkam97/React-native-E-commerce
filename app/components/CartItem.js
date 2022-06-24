import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";

import Colors from "../config/colors";
import NumberFormat from "../components/NumberFormat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomText from "../components/CustomText";

export const CartItem = ({ item, onAdd, onDes, onRemove }) => {
  console.log(item);
  const AddItemHandler = async () => {
    await onAdd();
  };

  const checkDesQuantity = async () => {
    if (item.qty == 1) {
      Alert.alert("Are You Sure", "You want to delete?", [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: onRemove,
        },
      ]);
    } else {
      await onDes();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={{
            width: "100%",
            height: 90,
            resizeMode: "stretch",
            borderRadius: 5,
          }}
          source={{ uri: item.product.images[0] }}
        />
      </View>
      <View style={styles.right}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText style={styles.title}>{item.product.title}</CustomText>
          <View>
            <TouchableOpacity onPress={onRemove}>
              <MaterialCommunityIcons name="close" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <CustomText style={{ color: Colors.primary, fontSize: 12 }}>
          Cung cấp bởi Cát Tường
        </CustomText>
        <NumberFormat price={item.totalPrice} />
        <View style={styles.box}>
          <TouchableOpacity onPress={checkDesQuantity} style={styles.boxMin}>
            <MaterialCommunityIcons name="minus" size={16} />
          </TouchableOpacity>
          <View>
            <CustomText style={styles.boxText}>{item.qty}</CustomText>
          </View>
          <TouchableOpacity onPress={AddItemHandler} style={styles.boxMin}>
            <MaterialCommunityIcons name="plus" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  left: {
    width: "35%",
    height: "100%",
    alignItems: "center",
  },
  right: {
    width: "65%",
    paddingLeft: 15,
    height: 90,
    // overflow: "hidden",
  },
  title: {
    fontSize: 14,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Platform.OS === "ios" ? 30 : 25,
    backgroundColor: Colors.secondary,
    width: 90,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  boxMin: {
    width: "30%",
    alignItems: "center",
  },
  boxText: {
    fontSize: 12,
  },
});
