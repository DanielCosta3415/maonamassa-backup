import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

const InfoUsuario = ({ label, usuario }) => {
  return (
    <View style={styles.infoProfissional}>
      <Text style={styles.infoProfissional__label}>
        {label}
      </Text>

      <View style={styles.infoProfissional__avatar_nome}>
        <Avatar.Image size={32} source={{ uri: usuario.avatar }} />
        <Text style={styles.infoProfissional__text}>{usuario.nome}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoProfissional: {
    marginBottom: 15,
    gap: 8,
  },
  infoProfissional__label: {
    fontFamily: "Krub",
    fontSize: 12,
    color: "#8F90A6",
  },
  infoProfissional__avatar_nome: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoProfissional__text: {
    fontFamily: "Krub",
    color: "#3A3A3C",
    fontSize: 14,
  },
});

export default InfoUsuario;
