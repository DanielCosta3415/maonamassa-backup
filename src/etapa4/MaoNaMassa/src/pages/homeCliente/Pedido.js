import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import moment from "moment";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import BotaoPedido from "./BotaoPedido";

const Pedido = ({ infoPedido, user }) => {
  const [profissional, setProfissional] = useState(null);
  const [categoriaNome, setCategoriaNome] = useState(null);
  const navigation = useNavigation();

  const handleButtonPress = () => {
    const status = infoPedido.status.toLowerCase();

    const enderecoObj = infoPedido.localizacao || {};
    const enderecoCompleto = [
      enderecoObj.rua,
      enderecoObj.numero,
      enderecoObj.bairro,
      enderecoObj.cidade,
      enderecoObj.estado,
      enderecoObj.cep,
      enderecoObj.complemento,
    ]
      .filter((part) => part && part.trim() !== "")
      .join(", ");

    const pedidoParaEnviar = {
      id: infoPedido.id,
      profissional: profissional?.nome || "Profissional",
      cliente: user?.nome || "Cliente",
      valor: infoPedido.valor || "Não informado",
      endereco: enderecoCompleto || "Endereço não informado",
      status: infoPedido.status,
      data: infoPedido.data,
      descricao: infoPedido.descricao,
    };

    if (status === "criado" || status === "aceito") {
      navigation.navigate("DetalhePedidoCliente", {
        pedido: pedidoParaEnviar,
      });
    } else if (status === "concluido") {
      navigation.navigate("AvaliarProfissional", {
        id: infoPedido.professional_id,
      });
    }
  };

  useEffect(() => {
    async function fetchProfissional() {
      try {
        const response = await fetch(
          `https://maonamassa-api.onrender.com/users?id=${infoPedido.professional_id}`
        );
        if (!response.ok) throw new Error("Erro ao buscar profissional");
        const data = await response.json();
        setProfissional(data[0] || null);
      } catch (error) {
        console.error(error);
      }
    }

    if (infoPedido.professional_id) {
      fetchProfissional();
    }
  }, [infoPedido.professional_id]);

  const servicoId = Array.isArray(infoPedido.servico_id)
    ? infoPedido.servico_id[0]
    : infoPedido.servico_id;

  useEffect(() => {
    async function fetchCategoria() {
      try {
        const response = await fetch(
          `https://maonamassa-api.onrender.com/servico?id=${servicoId}`
        );
        if (!response.ok) throw new Error("Erro ao buscar categoria");
        const data = await response.json();
        setCategoriaNome(data[0] || "Categoria desconhecida");
      } catch (error) {
        console.error(error);
      }
    }

    if (infoPedido.servico_id) {
      fetchCategoria();
    }
  }, [infoPedido.servico_id]);

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "concluido":
        return "#DDF9FA";
      case "em andamento":
      case "aceito":
        return "#D6F9E9";
      case "criado":
        return "#FFEAF9";
      case "cancelado":
        return "#FAF2E2";
      default:
        return "#E4D5FF";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "concluido":
        return "#00AAB7";
      case "em andamento":
      case "aceito":
        return "#009376";
      case "criado":
        return "#E440B5";
      case "cancelado":
        return "#DB7500";
      default:
        return "#E4D5FF";
    }
  };

  const getBotaoTexto = (status) => {
    switch (status.toLowerCase()) {
      case "concluido":
        return "Avaliar";
      case "criado":
      case "aceito":
        return "Editar";
      default:
        return status;
    }
  };

  const isBotaoHabilitado = (status) => {
    switch (status.toLowerCase()) {
      case "concluido":
      case "criado":
      case "aceito":
        return true;
      default:
        return false;
    }
  };

  const getProgressValue = (status) => {
    switch (status.toLowerCase()) {
      case "criado":
        return 0;
      case "aceito":
        return 0.1;
      case "em andamento":
        return 0.5;
      case "concluido":
        return 1;
      case "cancelado":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <View>
      <View style={styles.pedidosContainer}>
        <View style={styles.pedidosContainer__titulo}>
          <Text style={styles.pedidosContainer__num}>
            Pedido #{infoPedido.id}
          </Text>
          <View
            style={[
              styles.pedidosContainer__status,
              { backgroundColor: getStatusBackgroundColor(infoPedido.status) },
            ]}
          >
            <Text
              style={{
                color: getStatusTextColor(infoPedido.status),
                fontFamily: "KrubSemibold",
              }}
            >
              {infoPedido.status}
            </Text>
          </View>
        </View>
        <View style={styles.pedidosContainer__text_side}>
          <View style={styles.pedidosContainer__text_icon}>
            <MaterialCommunityIcons
              name="account-outline"
              size={16}
              style={styles.iconStyle}
            />
            <Text style={styles.pedidosContainer__text}>
              {profissional && profissional.nome
                ? profissional.nome
                : "Profissional"}
            </Text>
          </View>

          <View style={styles.pedidosContainer__text_icon_cat}>
            <MaterialCommunityIcons
              name={
                categoriaNome && categoriaNome.icon
                  ? categoriaNome.icon
                  : "dots-vertical-circle-outline"
              }
              size={16}
              style={styles.iconStyle}
            />
            <Text style={styles.pedidosContainer__text}>
              {categoriaNome && categoriaNome.nome
                ? categoriaNome.nome
                : "Não encontrada"}
            </Text>
          </View>
        </View>
        <View style={styles.pedidosContainer__text_icon}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={16}
            style={styles.iconStyle}
          />
          <Text style={styles.pedidosContainer__text}>{infoPedido.data}</Text>
        </View>
      </View>

      <ProgressBar
        progress={getProgressValue(infoPedido.status)}
        color="#F56A00"
      />

      <BotaoPedido
        textBtn={getBotaoTexto(infoPedido.status)}
        disabled={!isBotaoHabilitado(infoPedido.status)}
        onPress={handleButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pedidosContainer: {
    marginVertical: 32,
  },
  pedidosContainer__titulo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pedidosContainer__num: {
    fontFamily: "KrubSemibold",
    fontSize: 16,
    color: "#6B7588",
  },
  pedidosContainer__status: {
    paddingHorizontal: 16,
    paddingTop: 2,
  },
  pedidosContainer__text_side: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pedidosContainer__text_icon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pedidosContainer__text_icon_cat: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  pedidosContainer__text: {
    color: "#3A3A3C",
    fontFamily: "Krub",
    fontSize: 14,
  },
  iconStyle: {
    color: "#A371F8",
  },
});

export default Pedido;
