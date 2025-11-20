import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";

const InfoProfissional = ({ profissional }) => {
  return (
    <View style={styles.infoProfissional}>
      <Text style={styles.infoProfissional__label}>
        Profissional selecionado
      </Text>

      <View style={styles.infoProfissional__avatar_nome}>
        <Avatar.Image
          size={32}
          source={{ uri: profissional.userInfo.foto_blob }}
        />
        <Text style={styles.infoProfissional__text}>
          {profissional.userInfo.nome}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoProfissional: {
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

export default InfoProfissional;
