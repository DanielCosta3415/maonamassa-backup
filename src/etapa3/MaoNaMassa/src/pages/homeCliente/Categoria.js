import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconeCategoria from "./IconeCategoria";

const Categoria = (props) => {
  return (
    <View style={styles.categoryContainer}>
      <IconeCategoria icon={props.icon} />
      <Text style={styles.categoryContainer__text}>{props.nome}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  categoryContainer__text: {
    textAlign: "center",
    fontFamily: "Krub",
    fontSize: 12,
    color: "#3A3A3C",
    marginTop: 4,
  },
});

export default Categoria;
