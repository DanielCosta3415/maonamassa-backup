import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import IconeCategoria from "./IconeCategoria";

const Categoria = ({ nome, icon, id, navigation }) => {
  const handlePress = () => {
    navigation.navigate("Busca", { categoriaSelecionada: id });
  };

  return (
    <TouchableOpacity style={styles.categoryContainer}>
      <IconeCategoria icon={icon} />
      <Text style={styles.categoryContainer__text}>{nome}</Text>
    </TouchableOpacity>
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
