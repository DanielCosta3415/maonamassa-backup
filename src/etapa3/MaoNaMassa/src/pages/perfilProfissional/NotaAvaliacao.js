import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotaAvaliacao = ({ nota }) => {
  const estrelas = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(nota)) {
      estrelas.push(
        <MaterialCommunityIcons key={i} name="star" size={16} color="#FFD700" />
      );
    } else if (
      i === Math.ceil(nota) &&
      nota % 1 >= 0.25 &&
      nota % 1 < 0.75
    ) {
      estrelas.push(
        <MaterialCommunityIcons
          key={i}
          name="star-half-full"
          size={16}
          color="#FFD700"
        />
      );
    } else {
      estrelas.push(
        <MaterialCommunityIcons
          key={i}
          name="star-outline"
          size={16}
          color="#FFD700"
        />
      );
    }
  }

  return <View style={{ flexDirection: "row" }}>{estrelas}</View>;
};

export default NotaAvaliacao;
