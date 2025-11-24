import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image
      source={require("../../../assets/logo-white-lg.png")}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 32,
    alignSelf: "center",
  },
  logo: {
    padding: 90,
    width: 250,
    height: 170,
    marginRight: 20,
  },
});

export default Logo;
