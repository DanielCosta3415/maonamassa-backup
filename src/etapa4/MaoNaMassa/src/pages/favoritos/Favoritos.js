import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const API_BASE_URL = "https://maonamassa-api.onrender.com";

const COLORS = {
  bg: "#F6F7FB",
  card: "#FFFFFF",
  text: "#1A1B2E",
  muted: "#6B7280",
  primary: "#757BC8",
  field: "#F2F4F8",
  chipBg: "#EEF0F6",
};

const AVATAR_PLACEHOLDER =
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=240&auto=format&fit=crop";

const FAVORITOS_MOCK = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i + 1),
  nome: "Ricardo Nogueira",
  avatar: AVATAR_PLACEHOLDER,
  tags: ["Pintor", "Pedreiro"],
  favorito: true,
}));

function normalizarFavorito(raw, index) {
  const id = raw?.id ?? index + 1;
  const nome =
    raw?.professional?.nome ??
    raw?.servico?.titulo ??
    raw?.nome ??
    `Favorito #${id}`;
  const avatar =
    raw?.professional?.avatar_url ?? raw?.avatar ?? AVATAR_PLACEHOLDER;
  const tags =
    Array.isArray(raw?.tags) && raw.tags.length > 0
      ? raw.tags
      : ["Serviços gerais"];

  return {
    id: String(id),
    nome,
    avatar,
    tags,
    favorito: true,
  };
}

const Favoritos = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const route = useRoute();

  let initialUser = route.params?.user ?? null;
  if (typeof initialUser === "string") {
    try {
      initialUser = JSON.parse(initialUser);
    } catch {
      // Se não conseguir parsear, deixa como está
    }
  }

  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    async function carregar() {
      if (!user) return;

      try {
        setCarregando(true);
        setErro("");
        const res = await fetch(
          `${API_BASE_URL}/favorito?id_cliente=${user.id}`
        );

        if (!res.ok) {
          throw new Error("Erro ao buscar favoritos");
        }
        const json = await res.json();
        const lista = Array.isArray(json) ? json : json?.data ?? [];
        const normalizados = lista.map(normalizarFavorito);
        setItems(normalizados.length > 0 ? normalizados : FAVORITOS_MOCK);
      } catch (e) {
        setErro("Não foi possível carregar seus favoritos.");
        setItems(FAVORITOS_MOCK);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [user]);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.nome.toLowerCase().includes(q) ||
        it.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [items, query]);

  const toggleFav = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, favorito: !it.favorito } : it))
    );
  };

  if (carregando && items.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.logo}>Mão na massa</Text>
        <Pressable style={styles.bellBtn}>
          <Ionicons name="notifications-outline" size={20} />
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} style={styles.searchIcon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar favoritos"
          placeholderTextColor={COLORS.muted}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      <Text style={styles.sectionTitle}>Meus favoritos</Text>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <FavoriteRow item={item} onToggle={() => toggleFav(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <BottomBar />
    </SafeAreaView>
  );
};

const FavoriteRow = ({ item, onToggle }) => {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.rowTextArea}>
        <Text style={styles.name}>{item.nome}</Text>
        <View style={styles.tagsRow}>
          {item.tags.map((t) => (
            <View key={t} style={styles.chip}>
              <Text style={styles.chipText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
      <Pressable style={styles.heartBtn} onPress={onToggle} hitSlop={10}>
        <Ionicons
          name={item.favorito ? "heart" : "heart-outline"}
          size={22}
          color={item.favorito ? COLORS.primary : "#7C8699"}
        />
      </Pressable>
    </View>
  );
};

const BottomBar = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 10) }]}
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
  },

  sectionTitle: {
    marginHorizontal: 20,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },

  errorText: {
    marginHorizontal: 20,
    marginBottom: 8,
    fontSize: 13,
    color: "#DC2626",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    marginVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
    }),
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  rowTextArea: { flex: 1 },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  tagsRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  chip: {
    backgroundColor: COLORS.chipBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chipText: { fontSize: 12, color: COLORS.muted },

  heartBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
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

  loadingCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.muted,
  },
});

export default Favoritos;
