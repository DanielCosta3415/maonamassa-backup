import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import InfoProfissional from "./InfoProfissional";
import SobreProfissional from "./SobreProfissional";
import BotaoRealizarPedido from "./BotaoRealizarPedidos";
import Pedidos from "../../Dados/Pedidos.json";

const PerfilProfissional = ({ navigation, route }) => {
  const profissional = route.params?.profissional;
  const [pedidos, setPedidos] = useState([]);
  const onRealizarPedido = () => {
    navigation.navigate("CriarPedido", { profissional });
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    async function fetchPedidos() {
      try {
        if (!profissional?.id) return;

        const url = `https://maonamassa-api.onrender.com/contratacao?professional_id=${profissional.id}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar pedidos");

        const pedidosFiltrados = await response.json();
        setPedidos(pedidosFiltrados);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPedidos();
  }, [profissional]);

  return (
    <ScrollView style={styles.homeContainer}>
      <Appbar.Header
        mode="center-aligned"
        style={{
          borderBottomWidth: 1,
          borderColor: "#DADCEA",
          backgroundColor: "#F5F6FF",
        }}
      >
        <Appbar.Action
          icon="chevron-left"
          iconColor="#8F90A6"
          onPress={handleGoBack}
        />
        <Appbar.Content
          titleStyle={{
            fontFamily: "InterBold",
            fontSize: 14,
            color: "#8F90A6",
          }}
          title="Perfil do profissional"
        />
        <Appbar.Action
          icon="bell-outline"
          iconColor="#8E5AE6"
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <InfoProfissional dadosProfissional={profissional} pedidos={pedidos} />
      <BotaoRealizarPedido onRealizarPedido={onRealizarPedido} />
      <SobreProfissional dadosProfissional={profissional} pedidos={pedidos} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 70,
  },
});

export default PerfilProfissional;
