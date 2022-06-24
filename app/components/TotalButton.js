import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../components/CustomText";
import Colors from "../config/colors";
import NumberFormat from "../components/NumberFormat";
// import colors from "../config/colors";

export const TotalButton = ({ total }) => {
  return (
    <View style={styles.total}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomText
          style={{ fontSize: 18, fontWeight: "800", color: Colors.secondary }}
        >
          Total Amount
        </CustomText>
        <NumberFormat
          price={total.toString()}
          style={{ fontSize: 18, fontWeight: "800" }}
        />
      </View>

      <TouchableOpacity onPress={() => {}}>
        <View style={styles.btn}>
          <CustomText style={{ color: Colors.white, fontSize: 16 }}>
            Tiến hành đặt hàng
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btn: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.medium,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    fontSize: 18,
    fontWeight: "800",
  },
  price: {
    color: Colors.black,
    fontSize: 16,
  },
});
