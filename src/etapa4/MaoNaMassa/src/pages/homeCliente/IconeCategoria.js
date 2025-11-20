import React from "react";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const IconeCategoria = (props) => {
  return (
    <View style={styles.iconBackground}>
      <MaterialCommunityIcons
        name={props.icon}
        size={32}
        style={styles.iconStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    color: "#8E5AE6",
  },
  iconBackground: {
    borderRadius: 6,
    width: 50,
    height: 50,
    backgroundColor: "#F5F6FF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconeCategoria;
