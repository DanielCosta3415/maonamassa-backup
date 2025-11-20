import React from "react";
import { View, Text, StyleSheet, Platform, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  bg: "#F6F7FB",
  card: "#FFFFFF",
  text: "#1A1B2E",
  muted: "#6B7280",
  primary: "#757BC8",
  divider: "#E5E7EF",
  badgeBg: "#EEF0F6",
};

const ORDER = {
  id: 29830,
  categoria: "Pintor",
  cliente: { nome: "Ana Lúcia Sampaio", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
  profissional: { nome: "Ricardo Nogueira", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  status: "Criado",
  descricao:
    "Preciso de um profissional para realizar a pintura completa da parte interna do meu apartamento. A área inclui a sala de estar, um quarto e o corredor. Não há necessidade de lixamento, apenas retoques em pequenas imperfeições nas paredes.",
  endereco: {
    cep: "30130-005",
    logradouro: "Av. Afonso Pena",
    numero: "1500",
    complemento: "N/A",
    bairro: "Centro",
    cidade: "Belo Horizonte",
    estado: "Minas Gerais",
    dataInicio: "29/09/2025",
  },
};

const DetalhePedidoCliente = () => {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.logo}>Mão na massa</Text>
        <Pressable style={styles.bellBtn}>
          <Ionicons name="notifications-outline" size={20} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Pedido #{ORDER.id}</Text>
          <Text style={styles.category}>{ORDER.categoria}</Text>
        </View>

        <Text style={styles.sectionLabel}>Cliente</Text>
        <ProfileRow name={ORDER.cliente.nome} avatar={ORDER.clente?.avatar ?? ORDER.cliente.avatar} />

        <Text style={[styles.sectionLabel, { marginTop: 14 }]}>Profissional</Text>
        <ProfileRow name={ORDER.profissional.nome} avatar={ORDER.profissional.avatar} />

        <Text style={[styles.sectionLabel, { marginTop: 14 }]}>Status do pedido</Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{ORDER.status}</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Descrição</Text>
        <Text style={styles.paragraph}>{ORDER.descricao}</Text>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Endereço</Text>
        <View style={styles.grid}>
          <Field label="CEP" value={ORDER.endereco.cep} />
          <Field label="Logradouro" value={ORDER.endereco.logradouro} />
          <Field label="Número" value={ORDER.endereco.numero} />
          <Field label="Complemento" value={ORDER.endereco.complemento} />
          <Field label="Bairro" value={ORDER.endereco.bairro} />
          <Field label="Cidade" value={ORDER.endereco.cidade} />
          <Field label="Estado" value={ORDER.endereco.estado} />
          <Field label="Data de início" value={ORDER.endereco.dataInicio} />
        </View>
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );
};

const ProfileRow = ({ name, avatar }) => {
  return (
    <View style={styles.profileRow}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.profileName}>{name}</Text>
    </View>
  );
};

const Field = ({ label, value }) => {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
};

const BottomBar = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <Pressable style={styles.bottomItem}>
        <Ionicons name="person-outline" size={22} />
      </Pressable>
      <Pressable style={styles.bottomItem}>
        <Ionicons name="list-outline" size={22} />
      </Pressable>
      <View style={styles.homeFab}>
        <Ionicons name="home-outline" size={22} />
      </View>
      <Pressable style={styles.bottomItem}>
        <Ionicons name="heart-outline" size={22} />
      </Pressable>
      <Pressable style={styles.bottomItem}>
        <Ionicons name="settings-outline" size={22} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  bellBtn: { backgroundColor: "#FFFFFFAA", padding: 8, borderRadius: 14 },
  content: { paddingHorizontal: 20, paddingBottom: 110 },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 14, gap: 10 },
  title: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  category: { fontSize: 14, color: COLORS.primary, fontWeight: "700" },
  sectionLabel: { color: COLORS.muted, fontSize: 12, marginBottom: 6 },
  profileRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 28, height: 28, borderRadius: 14, marginRight: 10 },
  profileName: { fontSize: 14, color: COLORS.text },
  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.badgeBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: { fontSize: 12, color: COLORS.muted, fontWeight: "700" },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: COLORS.text, marginBottom: 6 },
  paragraph: { fontSize: 14, lineHeight: 22, color: COLORS.muted },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 8 },
  field: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 1 },
    }),
  },
  fieldLabel: { fontSize: 11, color: COLORS.muted, marginBottom: 4 },
  fieldValue: { fontSize: 14, color: COLORS.text, fontWeight: "600" },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 74,
    backgroundColor: "#FFFFFFEE",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: -2 } },
      android: { elevation: 8 },
    }),
  },
  bottomItem: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  homeFab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: -28,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 6 },
    }),
  },
});

export default DetalhePedidoCliente;
