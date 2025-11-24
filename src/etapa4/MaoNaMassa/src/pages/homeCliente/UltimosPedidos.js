import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ListaDePedidos from "./ListaDePedidos";

const { width: screenWidth } = Dimensions.get("window");

const UltimosPedidos = ({ user }) => {
  return (
    <View style={styles.professionalListContainer}>
      <Text style={styles.h2}>Seus pedidos mais recentes</Text>
      <ListaDePedidos user={user} />
    </View>
  );
};

const styles = StyleSheet.create({
  professionalListContainer: {
    width: screenWidth,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  h2: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 24,
  },
});

export default UltimosPedidos;
