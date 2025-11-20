import { useMemo, useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import {
  Appbar,
  Searchbar,
  Text,
  Chip,
  Card,
  Button,
  Divider,
  Badge,
  useTheme,
  List,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// mock de pedidos
type Pedido = {
  id: number;
  cliente: string;
  data: string; // ISO ou dd/mm/aa
  status: "Novo" | "Aceito" | "Em andamento" | "Concluído" | "Cancelado";
};

const PEDIDOS: Pedido[] = [
  { id: 29830, cliente: "Ana Lúcia Sampaio", data: "29/09/2025", status: "Novo" },
  { id: 29831, cliente: "Ana Lúcia Sampaio", data: "29/09/2025", status: "Novo" },
  { id: 29832, cliente: "Ana Lúcia Sampaio", data: "29/09/2025", status: "Aceito" },
];

const ABAS = ["Novos", "Aceitos", "Em andamento", "Concluídos", "Cancelados"] as const;
type Aba = typeof ABAS[number];

export default function MeusPedidosScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const [aba, setAba] = useState<Aba>("Novos");

  const pedidosFiltrados = useMemo(() => {
    const norm = (s: string) => s.toLowerCase();
    const porAba = PEDIDOS.filter(p => {
      switch (aba) {
        case "Novos": return p.status === "Novo";
        case "Aceitos": return p.status === "Aceito";
        case "Em andamento": return p.status === "Em andamento";
        case "Concluídos": return p.status === "Concluído";
        case "Cancelados": return p.status === "Cancelado";
      }
    });
    if (!query.trim()) return porAba;
    return porAba.filter(p =>
      norm(p.cliente).includes(norm(query)) ||
      String(p.id).includes(norm(query))
    );
  }, [aba, query]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header mode="small" style={{ backgroundColor: colors.background, elevation: 0 }}>
        <View style={styles.brandRow}>
          {/* troque a logo por sua imagem local: require("../assets/logo.png") */}
          <Image
            source={{ uri: "https://dummyimage.com/140x32/000/fff&text=M%C3%A3o+na+massa" }}
            style={{ width: 140, height: 32, resizeMode: "contain" }}
          />
          <Appbar.Action icon={(props) => <MaterialCommunityIcons name="bell-outline" {...props} />} onPress={() => {}} />
        </View>
      </Appbar.Header>

      {/* Busca */}
      <View style={styles.section}>
        <Searchbar
          placeholder="Buscar pedidos"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
          inputStyle={{ fontSize: 14 }}
          icon="magnify"
        />
      </View>

      {/* Título */}
      <View style={[styles.section, { paddingTop: 0, paddingBottom: 8 }]}>
        <Text variant="titleLarge" style={{ fontWeight: "700" }}>
          Meus pedidos
        </Text>
      </View>

      {/* Abas (chips) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        style={{ marginBottom: 8 }}
      >
        {ABAS.map((label) => {
          const selected = aba === label;
          return (
            <Chip
              key={label}
              selected={selected}
              onPress={() => setAba(label)}
              mode={selected ? "flat" : "outlined"}
              style={{ borderRadius: 999 }}
              selectedColor={selected ? "white" : undefined}
              showSelectedCheck={false}
            >
              {label}
            </Chip>
          );
        })}
      </ScrollView>

      {/* Lista de cards */}
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {pedidosFiltrados.map((p) => (
          <PedidoCard key={p.id} pedido={p} />
        ))}
      </ScrollView>
    </View>
  );
}

function PedidoCard({ pedido }: { pedido: Pedido }) {
  const { colors } = useTheme();

  return (
    <Card mode="elevated" style={{ borderRadius: 16 }}>
      <Card.Content style={{ gap: 8 }}>
        {/* Linha título + badge */}
        <View style={styles.rowBetween}>
          <Text variant="titleMedium" style={{ fontWeight: "700" }}>
            Pedido #{pedido.id}
          </Text>

          <Badge
            style={{
              backgroundColor: "#EAEFF6",
              color: "#3B5B7A",
              borderRadius: 8,
              height: 26,
              alignSelf: "flex-start",
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
          >
            {pedido.status}
          </Badge>
        </View>

        {/* Cliente + Data */}
        <List.Item
          title={pedido.cliente}
          titleStyle={{ fontSize: 14 }}
          description={pedido.data}
          left={(props) => <List.Icon {...props} icon="account-outline" />}
          right={(props) => <List.Icon {...props} icon="calendar-blank-outline" />}
          style={{ paddingHorizontal: 0 }}
        />

        <Divider style={{ backgroundColor: colors.elevation.level1 }} />

        {/* Botão principal */}
        <Button
          mode="contained"
          onPress={() => {}}
          style={{ marginTop: 8, borderRadius: 12, paddingVertical: 6 }}
          contentStyle={{ paddingVertical: 4 }}
        >
          Aceitar pedido
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  brandRow: {
    flex: 1,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: { paddingHorizontal: 16, paddingVertical: 12 },
  search: { borderRadius: 14 },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});




