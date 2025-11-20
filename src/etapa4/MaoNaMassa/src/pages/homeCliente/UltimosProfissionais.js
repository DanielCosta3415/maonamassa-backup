import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ListaDeProfissionais from "./ListaDeProfissionais";

const { width: screenWidth } = Dimensions.get("window");

const UltimosProfissionais = () => {
  return (
    <View style={styles.professionalListContainer}>
      <Text style={styles.h2}>Últimos profissionais</Text>
      <ListaDeProfissionais />
    </View>
  );
};

const styles = StyleSheet.create({
  professionalListContainer: {
    width: screenWidth,
    paddingHorizontal: 16,
  },
  h2: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 24,
  },
});

export default UltimosProfissionais;
