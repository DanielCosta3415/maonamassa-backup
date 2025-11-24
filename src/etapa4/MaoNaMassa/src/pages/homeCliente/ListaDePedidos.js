import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Pedido from "./Pedido";

const ListaDePedidos = ({ user }) => {
  const [listaPedidos, setListaPedidos] = useState([]);
  const navigation = useNavigation();

  const handleSelectProfissional = (profissional) => {
    navigation.navigate("PerfilProfissional", { profissional });
  };

  useEffect(() => {
    async function fetchProfissionais() {
      if (!user) return;

      try {
        const url = `https://maonamassa-api.onrender.com/contratacao?cliente_id=${user.id}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar pedidos");
        const pedidos = await response.json();

        const pedidosOrdenados = pedidos.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const ultimos4Pedidos = pedidosOrdenados.slice(0, 4);

        setListaPedidos(ultimos4Pedidos);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfissionais();
  }, [user]);

  const renderPedidos = ({ item }) => (
    <Pedido
      infoPedido={item}
      user={user}
      onPress={() => handleSelectProfissional(item)}
    />
  );

  return (
    <View style={styles.professionalListContainer__list}>
      <FlatList
        style={styles.profFlatList}
        data={listaPedidos}
        renderItem={renderPedidos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  professionalListContainer__list: {
    flex: 1,
  },
  profFlatList: {
    flexGrow: 0,
    marginBottom: 16,
  },
});

export default ListaDePedidos;
