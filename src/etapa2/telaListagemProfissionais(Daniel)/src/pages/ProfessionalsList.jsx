import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default function ProfessionalsList() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Lista vazia por enquanto (mock virá depois)
  const data = useMemo(() => [], []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // TODO: integrar com serviço de busca de profissionais
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          // TODO: quando houver navegação, abrir Detalhe do Profissional
        }}
      >
        <View style={styles.item}>
          <View style={styles.avatar} />
          <View style={styles.itemRight}>
            <Text style={styles.itemTitle}>Nome do Profissional</Text>
            <Text style={styles.itemSubtitle}>Categoria • Distância • ⭐ 0,0</Text>
            <Text numberOfLines={2} style={styles.itemMuted}>
              Bio/descrição breve do profissional…
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((_, index) => String(index), []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>Carregando profissionais…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Não foi possível carregar</Text>
        <Text style={styles.muted}>{String(error)}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => {
          // TODO: refazer busca
        }}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Nenhum profissional encontrado</Text>
        <Text style={styles.muted}>Puxe para atualizar ou ajuste os filtros.</Text>
        {/* truque para permitir pull-to-refresh mesmo sem itens */}
        <FlatList
          data={[]}
          keyExtractor={(x, i) => String(i)}
          renderItem={null}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingVertical: 16 }}
          ListEmptyComponent={<View />}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TODO: Filtros de categoria/disponibilidade vão aqui no futuro */}
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  listContent: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  center: {
    flex: 1, alignItems: "center", justifyContent: "center",
    padding: 24, gap: 8, backgroundColor: "#FFFFFF"
  },
  title: { fontSize: 18, fontWeight: "600" },
  muted: { fontSize: 14, color: "#666", textAlign: "center" },
  retryBtn: {
    marginTop: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 8, backgroundColor: "#111827"
  },
  retryText: { color: "#FFF", fontWeight: "600" },

  item: {
    flexDirection: "row", alignItems: "flex-start",
    padding: 12, borderRadius: 12, backgroundColor: "#FAFAFA",
    borderWidth: 1, borderColor: "#EEE", gap: 12
  },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#E5E7EB" },
  itemRight: { flex: 1, gap: 4 },
  itemTitle: { fontSize: 16, fontWeight: "700" },
  itemSubtitle: { fontSize: 13, color: "#374151" },
  itemMuted: { fontSize: 12, color: "#6B7280" }
});