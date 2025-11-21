import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-paper";
import Clientes from "../../Dados/Clientes.json";
import NotaAvaliacao from "./NotaAvaliacao";

const CardAvaliacao = ({ pedido }) => {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const encontrado = Clientes.find((c) => c.id === pedido.idCliente);
    setCliente(encontrado);
  }, [pedido.idCliente]);

  if (!cliente) {
    return null;
  }

  return (
    <View style={styles.containerAvaliacao}>
      <View style={styles.containerAvaliacao__title}>
        <Avatar.Image size={32} source={{ uri: cliente.avatar }} />
        <View>
          <Text style={styles.containerAvaliacao__nome}>{cliente.nome}</Text>
          <NotaAvaliacao nota={pedido.nota} />
        </View>
      </View>

      <Text style={styles.containerAvaliacao__comentario}>
        {pedido.comentario}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAvaliacao: {
    gap: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6FF",
    paddingVertical: 8,
  },
  h2: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 24,
  },
  containerAvaliacao__title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  containerAvaliacao__nome: {
    fontFamily: "KrubSemibold",
    fontSize: 14,
    color: "#6B7588",
  },
  containerAvaliacao__comentario: {
    fontFamily: "Krub",
    fontSize: 12,
    color: "#3A3A3C",
  },
});

export default CardAvaliacao;
