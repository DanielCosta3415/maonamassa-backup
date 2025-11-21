import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const API_BASE_URL = "https://maonamassa-api.onrender.com";

const COLORS = {
  bg: "#F6F7FB",
  card: "#FFFFFF",
  text: "#1A1B2E",
  muted: "#6B7280",
  primary: "#757BC8",
  primaryDark: "#5860B4",
  divider: "#E5E7EF",
  badgeBg: "#EEF0F6",
};

const DetalhePedidoCliente = ({ route, navigation }) => {
  const pedidoInicial =
    route?.params?.pedido ?? {
      id: 1,
      number: "#12345",
      status: "Novo",
      profissional: "Profissional",
      cliente: "Você",
      data: "01/01/2025",
      descricao: "Serviço solicitado pelo cliente.",
      endereco: "Endereço não informado",
      valor: "R$ 0,00",
    };

  const [pedido, setPedido] = useState(pedidoInicial);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function getStatusColor(status) {
    const s = (status || "").toLowerCase();
    if (s.includes("conclu")) return "#16A34A";
    if (s.includes("cancel")) return "#DC2626";
    if (s.includes("andam")) return "#FB923C";
    if (s.includes("aceit")) return "#2563EB";
    return COLORS.primary;
  }

  async function cancelarPedido() {
    try {
      setCarregando(true);
      setErro("");
      setSucesso("");
      if (pedido.id) {
        await fetch(`${API_BASE_URL}/contratacao/${pedido.id}`, {
          method: "DELETE",
        });
      }
      setSucesso("Pedido cancelado com sucesso.");
      if (navigation && navigation.goBack) {
        navigation.goBack();
      }
    } catch (e) {
      setErro("Não foi possível cancelar o pedido.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation && navigation.goBack && navigation.goBack()}
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes do pedido</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <View>
              <Text style={styles.orderLabel}>Pedido</Text>
              <Text style={styles.orderNumber}>
                {pedido.number ?? `#${pedido.id}`}
              </Text>
            </View>
            <View
              style={[
                styles.badge,
                { backgroundColor: COLORS.badgeBg, borderColor: getStatusColor(pedido.status) },
              ]}
            >
              <View
                style={[
                  styles.badgeDot,
                  { backgroundColor: getStatusColor(pedido.status) },
                ]}
              />
              <Text style={styles.badgeText}>{pedido.status}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações gerais</Text>
            <Field label="Profissional" value={pedido.profissional ?? "-"} />
            <Field label="Cliente" value={pedido.cliente ?? "-"} />
            <Field label="Data" value={pedido.data ?? "-"} />
            <Field label="Valor estimado" value={pedido.valor ?? "-"} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Endereço</Text>
            <Field label="Local" value={pedido.endereco ?? "-"} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição do serviço</Text>
            <Text style={styles.descricao}>
              {pedido.descricao ?? "Nenhuma descrição informada."}
            </Text>
          </View>

          {erro ? <Text style={styles.errorText}>{erro}</Text> : null}
          {sucesso ? <Text style={styles.successText}>{sucesso}</Text> : null}

          <View style={styles.buttonsRow}>
            <Pressable
              style={[styles.btnSec, carregando && styles.btnDisabled]}
              disabled={carregando}
              onPress={() =>
                navigation && navigation.goBack && navigation.goBack()
              }
            >
              <Text style={styles.btnSecText}>Voltar</Text>
            </Pressable>

            <Pressable
              style={[styles.btnPri, carregando && styles.btnDisabled]}
              disabled={carregando}
              onPress={cancelarPedido}
            >
              {carregando ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.btnPriText}>Cancelar pedido</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );
};

const Field = ({ label, value }) => {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
};

const BottomBar = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bottomBar,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
    >
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
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
    }),
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  orderLabel: {
    fontSize: 13,
    color: COLORS.muted,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 2,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  section: {
    marginTop: 12,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  fieldRow: {
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 14,
    color: COLORS.text,
  },
  descricao: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 13,
    color: "#DC2626",
  },
  successText: {
    marginTop: 10,
    fontSize: 13,
    color: "#16A34A",
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },
  btnSec: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.divider,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  btnPri: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnSecText: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 14,
  },
  btnPriText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
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
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -2 },
      },
      android: { elevation: 8 },
    }),
  },
  bottomItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  homeFab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: -28,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
  },
});

export default DetalhePedidoCliente;
