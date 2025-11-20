import React, { useMemo, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { Toast } from "toastify-react-native";
import Dropdown from "react-native-input-select";

// Mocks existentes no repo
import CATEGORIAS from "../../Dados/Categorias.json";
import PROFISSIONAIS from "../../Dados/Profissionais.json"

const CATEGORIAS_OPTIONS =
  (CATEGORIAS || []).map((c) => ({ label: c?.nome ?? "", value: c?.nome ?? "" })) || [];

const Busca = ({ navigation }) => {
  // Filtros
  const [termo, setTermo] = useState("");
  const [categoriasSel, setCategoriasSel] = useState([]);
  const [cidade, setCidade] = useState("");
  const [uf, setUF] = useState("");

  // Lista filtrada (derivada de estado)
  const resultados = useMemo(() => {
    const t = (termo || "").toLowerCase().trim();
    const catSet = new Set(categoriasSel || []);
    const filtraPorCategoria = (arr) =>
      !catSet.size || (Array.isArray(arr) && arr.some((x) => catSet.has(x)));

    return (PROFISSIONAIS || []).filter((p) => {
      const nomeOk = !t || String(p?.nome || "").toLowerCase().includes(t);
      const catOk = filtraPorCategoria(p?.categorias);
      const end0 = Array.isArray(p?.endereco) ? p.endereco[0] : null;
      const cidadeOk =
        !cidade || String(end0?.cidade || "").toLowerCase().includes(cidade.toLowerCase());
      const ufOk = !uf || String(end0?.estado || "").toUpperCase() === String(uf).toUpperCase();
      return nomeOk && catOk && cidadeOk && ufOk;
    });
  }, [termo, categoriasSel, cidade, uf]);

  const aplicarFiltros = useCallback(() => {
    if ((termo || categoriasSel.length || cidade || uf) && resultados.length === 0) {
      Toast.error("Nenhum profissional encontrado para os filtros aplicados.", "bottom");
    } else {
      Toast.success(`Resultados: ${resultados.length}`, "bottom");
    }
  }, [termo, categoriasSel, cidade, uf, resultados.length]);

  const abrirPerfil = (id) => {
    // Ajuste o nome da rota se necessário, conforme cadastro no App.js
    if (navigation?.navigate) navigation.navigate("PerfilProfissional", { id });
    else Toast.success("Abrindo perfil...", "bottom");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buscar Profissionais</Text>

      {/* Filtros */}
      <Card style={styles.card}>
        <Card.Title title="Filtros" />
        <Card.Content style={styles.gap}>
          <TextInput
            mode="outlined"
            label="Nome do profissional"
            value={termo}
            onChangeText={setTermo}
          />

          <View style={styles.row}>
            <View style={[styles.col, { zIndex: 10 }]}>
              <Dropdown
                placeholder="Categorias (múltipla seleção)"
                options={CATEGORIAS_OPTIONS}
                selectedValue={categoriasSel}
                onValueChange={(val) => setCategoriasSel(val)}
                isMultiple
                isSearchable
                primaryColor={"#DADCEA"}
                dropdownStyle={styles.dropdown}
                placeholderStyle={{ color: "#3A3A3C" }}
                dropdownIconStyle={{ top: 30 }}
                style={{ backgroundColor: "#fff", minHeight: 96 }}
              />
            </View>
          </View>

          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Cidade"
              value={cidade}
              onChangeText={setCidade}
              style={styles.col}
            />
            <TextInput
              mode="outlined"
              label="UF"
              value={uf}
              onChangeText={(v) => setUF((v || "").toUpperCase().slice(0, 2))}
              style={styles.col}
              maxLength={2}
              autoCapitalize="characters"
            />
          </View>

          <Button mode="contained" onPress={aplicarFiltros}>
            Aplicar filtros
          </Button>
        </Card.Content>
      </Card>

      {/* Resultado */}
      <View style={styles.resultHeader}>
        <Text style={styles.resultText}>
          {resultados.length} {resultados.length === 1 ? "profissional" : "profissionais"} encontrado
          {resultados.length === 1 ? "" : "s"}
        </Text>
      </View>

      {resultados.map((p) => {
        const end0 = Array.isArray(p?.endereco) ? p.endereco[0] : null;
        const local = [end0?.cidade, end0?.estado].filter(Boolean).join(" / ");
        return (
          <Card key={p.id} style={styles.card}>
            <Card.Content style={styles.cardRow}>
              <Image source={{ uri: p?.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{p?.nome}</Text>
                {!!p?.categorias?.length && (
                  <Text style={styles.categorias}>
                    {p.categorias.join(" · ")}
                  </Text>
                )}
                <Text style={styles.localValor}>
                  {local ? `📍 ${local}` : "📍 Não informado"}
                  {typeof p?.valorCobradoPorHora === "number"
                    ? `   ·   R$ ${p.valorCobradoPorHora}/h`
                    : ""}
                </Text>
                <View style={styles.actions}>
                  <Button mode="contained" onPress={() => abrirPerfil(p.id)}>
                    Ver perfil
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        );
      })}

      {resultados.length === 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={{ color: "#6b7280" }}>
              Ajuste os filtros acima para encontrar profissionais.
            </Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 4 },
  card: { backgroundColor: "#fff" },
  gap: { gap: 12 },
  row: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },
  dropdown: {
    borderColor: "#DADCEA",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  resultHeader: { marginTop: 4, marginBottom: -4 },
  resultText: { color: "#374151", fontSize: 14 },
  cardRow: { flexDirection: "row", gap: 12, alignItems: "center" },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  nome: { fontSize: 16, fontWeight: "600" },
  categorias: { color: "#475569", marginTop: 2 },
  localValor: { color: "#334155", marginTop: 6 },
  actions: { marginTop: 8, flexDirection: "row", gap: 8 },
});

export default Busca;
