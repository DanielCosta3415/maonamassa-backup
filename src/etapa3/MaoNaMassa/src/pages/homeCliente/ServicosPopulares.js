import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ListaDeServicos from "./ListaDeServicos";

const { width: screenWidth } = Dimensions.get("window");

const ServicosPopulares = () => {
  return (
    <View style={styles.professionalListContainer}>
      <Text style={styles.h2}>Serviços mais populares</Text>
      <ListaDeServicos />
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

export default ServicosPopulares;
