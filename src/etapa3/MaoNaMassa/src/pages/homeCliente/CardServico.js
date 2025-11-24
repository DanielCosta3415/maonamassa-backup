import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar, Card, IconButton } from "react-native-paper";

const { width: screenWidth } = Dimensions.get("window");

const CardServico = (props) => {
  return (
    <View style={styles.cardContainer}>
      <MaterialCommunityIcons
        name={props.icon}
        size={24}
        style={styles.iconStyle}
      />
      <View>
        <Text style={styles.h6}>{props.servico}</Text>
        <Text style={styles.numProf}>{props.profissionais} profissionais</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F5F6FF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  iconStyle: {
    color: "#8E5AE6",
  },
  h6: {
    fontFamily: "KrubSemibold",
    fontSize: 16,
    color: "#3A3A3C",
  },
  numProf: {
    fontFamily: "Krub",
    fontSize: 12,
    color: "#3A3A3C",
  },
  cardStyle: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
});

export default CardServico;
