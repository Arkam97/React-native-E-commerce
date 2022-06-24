import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../config/colors";
import NumberFormat from "react-number-format";
import CustomText from "./CustomText";

const Number = ({ price, color, style }) => {
  return (
    <NumberFormat
      value={price}
      displayType={"text"}
      thousandSeparator={true}
      suffix={" đ"}
      renderText={(formattedValue) => (
        <View
          style={
            color
              ? { ...styles.priceContainer, backgroundColor: color }
              : styles.container
          }
        >
          <CustomText
            style={[style, { color: color ? "#fff" : Colors.secondary }]}
          >
            {formattedValue}
          </CustomText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  priceContainer: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  price: {
    fontSize: 13,
  },
});

export default Number;
