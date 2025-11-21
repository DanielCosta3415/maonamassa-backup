import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const TABS = [
  { key: "novos", label: "Novos" },
  { key: "aceitos", label: "Aceitos" },
  { key: "andamento", label: "Em andamento" },
  { key: "concluidos", label: "Concluídos" },
  { key: "cancelados", label: "Cancelados" },
];

const MOCK_ORDERS = [
  { id: "29830-1", number: "#29830", cliente: "Ana Lúcia Sampaio", data: "29/09/2025", status: "Novo", tab: "novos" },
  { id: "29830-2", number: "#29830", cliente: "Ana Lúcia Sampaio", data: "29/09/2025", status: "Novo", tab: "novos" },
  { id: "29830-3", number: "#29830", cliente: "Ana Lúcia Sampaio", data: "29/09/2025", status: "Novo", tab: "novos" },
];

const COLORS = {
  bg: "#F6F7FB",
  card: "#FFFFFF",
  text: "#1A1B2E",
  muted: "#6B7280",
  primary: "#757BC8",
  primaryDark: "#5860B4",
  divider: "#D9DDE8",
  field: "#F2F4F8",
  badgeBg: "#EEF0F6",
};

const HomeProfissional = () => {
  const [activeTab, setActiveTab] = useState("novos");
  const [query, setQuery] = useState("");
  const data = useMemo(
    () =>
      MOCK_ORDERS.filter(
        (o) =>
          o.tab === activeTab &&
          (o.number.includes(query) || o.cliente.toLowerCase().includes(query.toLowerCase()))
      ),
    [activeTab, query]
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.logo}>Mão na massa</Text>
        <Pressable hitSlop={10} style={styles.bellBtn}>
          <Ionicons name="notifications-outline" size={20} />
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} style={styles.searchIcon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar pedidos"
          placeholderTextColor={COLORS.muted}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      <Text style={styles.sectionTitle}>Meus pedidos</Text>

      <View style={styles.tabsRow}>
        {TABS.map((t) => {
          const active = t.key === activeTab;
          return (
            <Pressable key={t.key} onPress={() => setActiveTab(t.key)} style={styles.tabBtn}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
              <View style={[styles.tabUnderline, active && styles.tabUnderlineActive]} />
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <BottomBar />
    </SafeAreaView>
  );
};

const OrderCard = ({ order }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <Text style={styles.orderId}>Pedido {order.number}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="account-outline" size={18} color={COLORS.muted} style={styles.infoIcon} />
        <Text style={styles.infoText}>{order.cliente}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={18} color={COLORS.muted} style={styles.infoIcon} />
        <Text style={styles.infoText}>{order.data}</Text>
      </View>

      <View style={styles.divider} />

      <Pressable style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>Aceitar pedido</Text>
      </Pressable>
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
  searchWrap: {
    marginHorizontal: 20,
    marginBottom: 16,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.field,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, paddingVertical: Platform.OS === "ios" ? 10 : 8 },
  sectionTitle: { marginHorizontal: 20, marginBottom: 8, fontSize: 18, fontWeight: "700", color: COLORS.text },
  tabsRow: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 12, marginBottom: 8 },
  tabBtn: { paddingHorizontal: 8, paddingVertical: 10, marginHorizontal: 4, alignItems: "center" },
  tabText: { fontSize: 13, color: COLORS.muted },
  tabTextActive: { color: COLORS.text, fontWeight: "700" },
  tabUnderline: { height: 2, width: "100%", marginTop: 8, backgroundColor: "transparent", borderRadius: 2 },
  tabUnderlineActive: { backgroundColor: COLORS.primary },
  listContent: { paddingHorizontal: 16, paddingBottom: 90 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 2 },
    }),
  },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  orderId: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  badge: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: COLORS.badgeBg, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: "600", color: COLORS.muted },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  infoIcon: { marginRight: 8 },
  infoText: { fontSize: 14, color: COLORS.muted },
  divider: { height: 2, borderRadius: 2, backgroundColor: COLORS.divider, marginVertical: 12 },
  primaryBtn: { height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primary },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
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

export default HomeProfissional;
