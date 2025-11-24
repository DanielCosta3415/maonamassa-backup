// src/pages/ProfessionalProfile.tsx
import { View, Image, StyleSheet, ScrollView } from "react-native";
import {
  Appbar,
  Avatar,
  Text,
  Chip,
  Button,
  Divider,
  Badge,
  useTheme,
  Card,
  List,
} from "react-native-paper";

export default function ProfessionalProfile() {
  const { colors } = useTheme();

  // mock de dados
  const prof = {
    nome: "Ricardo Nogueira",
    rating: 4.8,
    funcoes: ["Pintor", "Pedreiro"],
    bio:
      "Profissional experiente, especializado em pintura residencial e serviços de alvenaria. " +
      "Com mais de 15 anos de atuação, é conhecido por sua atenção aos detalhes, " +
      "organização e pontualidade na entrega dos projetos.",
    concluidos: 21,
    local: "BH/MG",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328d13a2?q=80&w=256&auto=format&fit=crop",
    projetos: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c08e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
    ],
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <Appbar.Header mode="small" style={{ backgroundColor: colors.background, elevation: 0 }}>
        <View style={styles.headerRow}>
          <Image
            source={{ uri: "https://dummyimage.com/120x28/000/fff&text=M%C3%A3o+na+massa" }}
            style={{ width: 120, height: 28 }}
            resizeMode="contain"
          />
          <Appbar.Action icon="bell-outline" onPress={() => {}} />
        </View>
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Top / avatar / nome / rating */}
        <View style={styles.topCard}>
          <Avatar.Image size={72} source={{ uri: prof.avatar }} />
          <Text variant="titleLarge" style={styles.nome}>
            {prof.nome}
          </Text>

          <View style={styles.ratingRow}>
            <List.Icon color="#A0AEC0" icon="star" />
            <Text style={{ color: "#A0AEC0", fontWeight: "600" }}>{prof.rating}</Text>
          </View>

          <View style={styles.chipsRow}>
            {prof.funcoes.map((f) => (
              <Chip key={f} mode="outlined" style={styles.chip}>
                {f}
              </Chip>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.primaryBtn}
            contentStyle={{ paddingVertical: 6 }}
          >
            Realizar pedido
          </Button>
        </View>

        <Divider style={{ marginTop: 6 }} />

        {/* Sobre */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={{ fontWeight: "700" }}>
              Sobre este profissional
            </Text>
            <Text style={{ color: colors.primary }} onPress={() => {}}>
              ver mais
            </Text>
          </View>

          <Text style={[styles.subtleLabel, { marginTop: 6 }]}>Biografia</Text>
          <Text style={styles.bio}>{prof.bio}</Text>

          {/* Métricas */}
          <View style={styles.metricsRow}>
            <Card mode="contained" style={styles.metricCard}>
              <Card.Content>
                <Text style={styles.metricValue}>{prof.concluidos}</Text>
                <Text style={styles.metricLabel}>Pedidos concluídos</Text>
              </Card.Content>
            </Card>

            <Card mode="contained" style={styles.metricCard}>
              <Card.Content>
                <Text style={styles.metricValue}>{prof.local}</Text>
                <Text style={styles.metricLabel}>Localização</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Projetos anteriores */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={{ fontWeight: "700" }}>
              Projetos anteriores
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
          >
            {prof.projetos.map((uri, i) => (
              <Card key={i} style={styles.projectCard} mode="elevated">
                <Image source={{ uri }} style={styles.projectImg} />
              </Card>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flex: 1,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topCard: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 6,
  },
  nome: { marginTop: 6, fontWeight: "700" },

  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 8,
  },
  chip: { borderRadius: 999 },

  primaryBtn: {
    alignSelf: "stretch",
    marginHorizontal: 16,
    borderRadius: 14,
    marginTop: 8,
  },

  section: { paddingHorizontal: 16, paddingTop: 14 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subtleLabel: { color: "#A0AEC0", fontSize: 12 },
  bio: {
    color: "#4A5568",
    marginTop: 4,
    lineHeight: 20,
    textAlign: "justify",
  },

  metricsRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  metricCard: { flex: 1, borderRadius: 12 },
  metricValue: { fontWeight: "800", fontSize: 18, marginBottom: 2 },
  metricLabel: { color: "#718096", fontSize: 12 },

  projectCard: { width: 240, borderRadius: 14, overflow: "hidden" },
  projectImg: { width: 240, height: 140, resizeMode: "cover" },
});
