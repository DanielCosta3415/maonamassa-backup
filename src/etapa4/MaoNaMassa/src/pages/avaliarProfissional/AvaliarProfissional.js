import React, { useMemo, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button, Card, HelperText } from "react-native-paper";
import { Toast } from "toastify-react-native";
import Dropdown from "react-native-input-select";

// Mocks
import PROFISSIONAIS from "../../Dados/Profissionais.json";
import CATEGORIAS from "../../Dados/Categorias.json";

const NOTA_OPTIONS = [
  { label: "1 - Muito ruim", value: "1" },
  { label: "2 - Ruim", value: "2" },
  { label: "3 - Regular", value: "3" },
  { label: "4 - Bom", value: "4" },
  { label: "5 - Excelente", value: "5" },
];

const CATEGORIAS_OPTIONS =
  (CATEGORIAS || []).map((c) => ({ label: c?.nome ?? "", value: c?.nome ?? "" })) || [];

const AvaliarProfissional = ({ navigation, route }) => {
  // Profissional alvo (id via rota; senão, primeiro mock)
  const profId = route?.params?.id ?? PROFISSIONAIS?.[0]?.id ?? 1;
  const prof = useMemo(
    () => (PROFISSIONAIS || []).find((p) => p.id === profId) ?? (PROFISSIONAIS || [])[0],
    [profId]
  );

  // Estado do formulário
  const [nota, setNota] = useState("");
  const [categoria, setCategoria] = useState(prof?.categorias?.[0] || "");
  const [comentario, setComentario] = useState("");

  // Validações (simples, no padrão das pages)
  const temErro = {
    nota: !nota,
    categoria: !categoria,
    comentario: !(comentario && comentario.trim().length >= 6),
  };

  const enviar = useCallback(() => {
    if (Object.values(temErro).some(Boolean)) {
      Toast.error("Preencha os campos obrigatórios (nota, categoria e comentário).", "bottom");
      return;
    }
    // Mock de sucesso (sem persistência real)
    Toast.success("Avaliação enviada (mock).");
    // Você pode voltar ou ir ao perfil:
    // navigation?.goBack && navigation.goBack();
    // navigation?.navigate?.("PerfilProfissional", { id: profId });
  }, [temErro, profId]);

  const limpar = useCallback(() => {
    setNota("");
    setCategoria(prof?.categorias?.[0] || "");
    setComentario("");
    Toast.success("Formulário limpo.");
  }, [prof]);

  // Derivados para exibição
  const end0 = Array.isArray(prof?.endereco) ? prof.endereco[0] : null;
  const local = [end0?.cidade, end0?.estado].filter(Boolean).join(" / ");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Avaliar Profissional</Text>

      {/* Card: resumo do profissional */}
      <Card style={styles.card}>
        <Card.Title title="Profissional" />
        <Card.Content style={[styles.gap, { flexDirection: "row", alignItems: "center" }]}>
          <Image source={{ uri: prof?.avatar }} style={styles.avatar} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={styles.nome}>{prof?.nome}</Text>
            {!!prof?.categorias?.length && (
              <Text style={styles.categorias}>{prof.categorias.join(" · ")}</Text>
            )}
            <Text style={styles.local}>
              {local ? `📍 ${local}` : "📍 Local não informado"}
              {typeof prof?.valorCobradoPorHora === "number"
                ? `   ·   R$ ${prof.valorCobradoPorHora}/h`
                : ""}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Card: formulário de avaliação */}
      <Card style={styles.card}>
        <Card.Title title="Sua avaliação" />
        <Card.Content style={styles.gap}>
          <View style={[styles.row, { zIndex: 10 }]}>
            <View style={styles.col}>
              <Dropdown
                placeholder="Nota (1 a 5)*"
                options={NOTA_OPTIONS}
                selectedValue={nota}
                onValueChange={setNota}
                isSearchable
                primaryColor={"#DADCEA"}
                dropdownStyle={styles.dropdown}
                placeholderStyle={{ color: "#3A3A3C" }}
                dropdownIconStyle={{ top: 30 }}
                style={{ backgroundColor: "#fff" }}
              />
              <HelperText type="error" visible={temErro.nota}>
                Selecione a nota de 1 a 5.
              </HelperText>
            </View>
          </View>

          <View style={[styles.row, { zIndex: 9 }]}>
            <View style={styles.col}>
              <Dropdown
                placeholder="Categoria do serviço*"
                options={CATEGORIAS_OPTIONS}
                selectedValue={categoria}
                onValueChange={setCategoria}
                isSearchable
                primaryColor={"#DADCEA"}
                dropdownStyle={styles.dropdown}
                placeholderStyle={{ color: "#3A3A3C" }}
                dropdownIconStyle={{ top: 30 }}
                style={{ backgroundColor: "#fff" }}
              />
              <HelperText type="error" visible={temErro.categoria}>
                Informe a categoria do atendimento.
              </HelperText>
            </View>
          </View>

          <TextInput
            mode="outlined"
            label="Comentário*"
            value={comentario}
            onChangeText={setComentario}
            placeholder="Conte como foi sua experiência..."
            multiline
            numberOfLines={4}
            error={temErro.comentario}
          />
          <HelperText type="error" visible={temErro.comentario}>
            Escreva ao menos 6 caracteres sobre a sua experiência.
          </HelperText>

          <View style={[styles.row, { justifyContent: "flex-end" }]}>
            <Button mode="outlined" onPress={limpar}>
              Limpar
            </Button>
            <Button mode="contained" onPress={enviar}>
              Enviar avaliação
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 4 },
  card: { backgroundColor: "#fff" },
  gap: { gap: 12 },
  row: { flexDirection: "row", gap: 12, alignItems: "center" },
  col: { flex: 1 },
  dropdown: {
    borderColor: "#DADCEA",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  nome: { fontSize: 16, fontWeight: "600" },
  categorias: { color: "#475569", marginTop: 2 },
  local: { color: "#334155", marginTop: 6 },
});

export default AvaliarProfissional;
