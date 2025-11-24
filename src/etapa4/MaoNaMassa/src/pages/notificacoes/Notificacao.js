import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import moment from "moment";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width: screenWidth } = Dimensions.get("window");

const Notificacao = ({ infoNotificacao, userRole }) => {
  const tempoRelativo = (dataISO) => {
    return moment(dataISO).fromNow(true);
  };

  const navigation = useNavigation();

  const handleButtonPress = () => {
    const status = infoPedido.status.toLowerCase();

    if (status === "criado" || status === "aceito") {
      navigation.navigate("EditarPedidoCliente", {
        profissionalId: infoPedido.professional_id,
        infoPedido: infoPedido,
      });
    } else if (status === "concluido") {
      navigation.navigate("AvaliarProfissional", {
        id: infoPedido.professional_id,
      });
    }
  };

  const handleDetalhePedido = () => {
    navigation.navigate("DetalhePedidoCliente");
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
        return "Não é possível alterar este pedido";
    }
  };

  return (
    <View style={styles.notificacaoContainer}>
      <View>
        {infoNotificacao.remetente_id !== null ? (
          <Image
            source={{ uri: infoNotificacao.msg_img }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        ) : (
          <Image
            source={{ uri: "https://i.ibb.co/jkGhj6Qs/mnm-logo.png" }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        )}
      </View>
      <View style={styles.notificacaoContainer__msg}>
        <Text style={styles.notificacaoContainer__msg_text}>
          {infoNotificacao.mensagem}
        </Text>
      </View>
      <View style={styles.notificacaoContainer__time}>
        <Text style={styles.notificacaoContainer__time_text}>
          {tempoRelativo(infoNotificacao.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificacaoContainer: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    width: screenWidth,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6FF",
    paddingVertical: 8,
  },
  notificacaoContainer__msg: {
    fontFamily: "Krub",
    width: "70%",
  },
  notificacaoContainer__msg_text: {
    fontFamily: "Krub",
    fontSize: 14,
    color: "#3A3A3C",
  },
  notificacaoContainer__time: {
    width: "15%",
  },
  notificacaoContainer__time_text: {
    fontFamily: "Krub",
    fontSize: 12,
    color: "#8F90A6",
    textAlign: "center",
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

export default Notificacao;
