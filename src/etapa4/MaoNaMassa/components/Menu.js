import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../src/constants/colors";

const Menu = ({ navigation, role }) => {
  const handleNavigate = (screenName) => {
    try {
      navigation.navigate(screenName);
    } catch (error) {
      console.error(`Erro ao navegar para ${screenName}:`, error);
      alert(`Não foi possível navegar para ${screenName}`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.h1}>Menu de Telas</Text>

      {/* SEÇÃO: PEDIDOS */}
      <Text style={styles.sectionTitle}>📋 Pedidos</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("Agenda")}
      >
        <MaterialCommunityIcons
          name="calendar"
          size={20}
          color={colors.white}
        />
        <Text style={styles.buttonText}>Agenda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("ListarPedidosCliente")}
      >
        <MaterialCommunityIcons name="list" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Listar Pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("CriarPedido")}
      >
        <MaterialCommunityIcons name="plus" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Criar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("AtualizarPedido")}
      >
        <MaterialCommunityIcons name="pencil" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Atualizar Pedido</Text>
      </TouchableOpacity>

      {/* SEÇÃO: PERFIL */}
      <Text style={styles.sectionTitle}>👤 Perfil</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("EditarPerfilCliente")}
      >
        <MaterialCommunityIcons
          name="account-edit"
          size={20}
          color={colors.white}
        />
        <Text style={styles.buttonText}>Editar Perfil Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("EditarPerfilProfissional")}
      >
        <MaterialCommunityIcons
          name="briefcase-edit"
          size={20}
          color={colors.white}
        />
        <Text style={styles.buttonText}>Editar Perfil Profissional</Text>
      </TouchableOpacity>

      {/* SEÇÃO: BUSCAS */}
      <Text style={styles.sectionTitle}>🔍 Buscas</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("Busca")}
      >
        <MaterialCommunityIcons name="magnify" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Busca</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("PerfilProfissional")}
      >
        <MaterialCommunityIcons name="account" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Perfil Profissional</Text>
      </TouchableOpacity>

      {/* SEÇÃO: AVALIAÇÃO */}
      <Text style={styles.sectionTitle}>⭐ Avaliação</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("AvaliarProfissional")}
      >
        <MaterialCommunityIcons name="star" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Avaliar Profissional</Text>
      </TouchableOpacity>

      {/* SEÇÃO: GERENCIAMENTO */}
      <Text style={styles.sectionTitle}>⚙️ Gerenciamento</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("Favoritos")}
      >
        <MaterialCommunityIcons name="heart" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("PedidosRecebidos")}
      >
        <MaterialCommunityIcons name="inbox" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Pedidos Recebidos</Text>
      </TouchableOpacity>

      {/* SEÇÃO: SISTEMA */}
      <Text style={styles.sectionTitle}>🏠 Sistema</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("HomeCliente")}
      >
        <MaterialCommunityIcons name="home" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Home Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("HomeProfissional")}
      >
        <MaterialCommunityIcons
          name="briefcase"
          size={20}
          color={colors.white}
        />
        <Text style={styles.buttonText}>Home Profissional</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("DetalhePedidoCliente")}
      >
        <MaterialCommunityIcons
          name="information"
          size={20}
          color={colors.white}
        />
        <Text style={styles.buttonText}>Detalhes Pedido</Text>
      </TouchableOpacity>

      {/* SEÇÃO: AUTENTICAÇÃO */}
      <Text style={styles.sectionTitle}>🔐 Autenticação</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("Login")}
      >
        <MaterialCommunityIcons name="login" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("Cadastro")}
      >
        <MaterialCommunityIcons
          name="account-plus"
          size={20}
          color={colors.white}
        />
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate("TelaInicial")}
      >
        <MaterialCommunityIcons name="star" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Tela Inicial</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.background,
  },
  h1: {
    fontFamily: "InterBold",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
    color: colors.text,
  },
  sectionTitle: {
    fontFamily: "InterBold",
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: 20,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  buttonText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
    color: colors.btnPrimaryText,
  },
  spacer: {
    height: 20,
  },
});

export default Menu;
