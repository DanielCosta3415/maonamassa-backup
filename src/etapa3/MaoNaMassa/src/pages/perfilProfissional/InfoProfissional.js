import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LabelCategoria from "./LabelCategoria";

const { width: screenWidth } = Dimensions.get("window");

const InfoProfissional = ({ dadosProfissional, pedidos }) => {
  const [avaliacao, setAvaliacao] = useState(0);

  useEffect(() => {
    if (pedidos && pedidos.length > 0) {
      const somaNotas = pedidos.reduce(
        (acc, pedido) => acc + (pedido.nota || 0),
        0
      );
      const media = somaNotas / pedidos.length;
      setAvaliacao(media.toFixed(1));
    } else {
      setAvaliacao("Sem avaliações");
    }
  }, [pedidos, dadosProfissional.avaliacao]);

  return (
    <View style={styles.infoProfessionalContainer}>
      <Avatar.Image size={56} source={{ uri: dadosProfissional.avatar }} />
      <Text style={styles.h1}>{dadosProfissional.nome}</Text>
      <View style={styles.infoProfessionalContainer__info}>
        <View style={styles.infoProfessionalContainer__avaliacao}>
          <MaterialCommunityIcons
            name="star"
            size={24}
            style={styles.infoProfessionalContainer__star}
          />
          <Text style={styles.infoProfessionalContainer__text}>
            {avaliacao}
          </Text>
        </View>
        <View style={styles.infoProfessionalContainer__divider}></View>
        <View style={styles.infoProfessionalContainer__valorCobrado}>
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={24}
            style={styles.infoProfessionalContainer__clock}
          />
          <Text style={styles.infoProfessionalContainer__text}>
            R$ {dadosProfissional.valorCobradoPorHora},00
          </Text>
        </View>
      </View>
      <LabelCategoria categorias={dadosProfissional.categorias} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoProfessionalContainer: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 32,
  },
  h1: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 28,
    textAlign: "center",
  },
  infoProfessionalContainer__info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  infoProfessionalContainer__avaliacao: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    color: "#6B7588",
  },
  infoProfessionalContainer__star: {
    color: "#F9CA24",
  },
  infoProfessionalContainer__divider: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: "#D6BEFF",
  },
  infoProfessionalContainer__valorCobrado: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  infoProfessionalContainer__clock: {
    color: "#00B4D8",
  },
  infoProfessionalContainer__text: {
    fontFamily: "Krub",
    color: "#6B7588",
  },
});

export default InfoProfissional;
