import React, { useMemo, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { Toast } from "toastify-react-native";
import Dropdown from "react-native-input-select";

// Mocks
import PROFISSIONAIS from "../../Dados/Profissionais.json";

const Agenda = ({ navigation, route }) => {
  // Profissional alvo (id via rota; senão, primeiro mock)
  const profId = route?.params?.id ?? PROFISSIONAIS?.[0]?.id ?? 1;
  const prof = useMemo(
    () => (PROFISSIONAIS || []).find((p) => p.id === profId) ?? (PROFISSIONAIS || [])[0],
    [profId]
  );

  // Estado local de disponibilidade: [{ dia: "Seg", horarios: ["08:00", "09:00", ...] }, ...]
  const [disp, setDisp] = useState(() => {
    const base = Array.isArray(prof?.disponibilidade) ? prof.disponibilidade : [];
    // normaliza estrutura
    return base.map((d) => ({
      dia: String(d?.dia || ""),
      horarios: Array.isArray(d?.horarios) ? [...d.horarios] : [],
    }));
  });

  // Dias disponíveis do mock (ex.: Seg, Ter, Qua, Qui, Sex, Sab)
  const diasOptions = useMemo(
    () => disp.map((d) => ({ label: d.dia, value: d.dia })),
    [disp]
  );

  // Dia selecionado
  const [diaSel, setDiaSel] = useState(diasOptions?.[0]?.value || "");
  const horariosDoDia = useMemo(() => {
    const d = disp.find((x) => x.dia === diaSel);
    return d ? d.horarios : [];
  }, [disp, diaSel]);

  // Seleção temporária de horários (para remover em lote)
  const [selecionados, setSelecionados] = useState([]);
  const toggleSelecionado = useCallback((h) => {
    setSelecionados((prev) =>
      prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]
    );
  }, []);

  // Adicionar novo horário (texto "HH:MM")
  const [novoHora, setNovoHora] = useState("");
  const validarHora = (v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v);

  const adicionarHorario = useCallback(() => {
    const v = (novoHora || "").trim();
    if (!validarHora(v)) {
      Toast.error("Informe um horário válido no formato HH:MM (00–23:59).", "bottom");
      return;
    }
    setDisp((prev) =>
      prev.map((d) => {
        if (d.dia !== diaSel) return d;
        if (d.horarios.includes(v)) {
          Toast.error("Esse horário já existe para o dia selecionado.", "bottom");
          return d;
        }
        const novos = [...d.horarios, v].sort();
        Toast.success("Horário adicionado.");
        return { ...d, horarios: novos };
      })
    );
    setNovoHora("");
  }, [diaSel, novoHora]);

  const removerSelecionados = useCallback(() => {
    if (!selecionados.length) {
      Toast.error("Nenhum horário selecionado.", "bottom");
      return;
    }
    setDisp((prev) =>
      prev.map((d) => {
        if (d.dia !== diaSel) return d;
        const rest = d.horarios.filter((h) => !selecionados.includes(h));
        return { ...d, horarios: rest };
      })
    );
    setSelecionados([]);
    Toast.success("Horário(s) removido(s).");
  }, [diaSel, selecionados]);

  const salvar = useCallback(() => {
    // Persistência real não faz parte das pages atuais → apenas feedback.
    // Aqui você poderia mandar para API/Firestore futuramente.
    Toast.success("Disponibilidade salva (mock).");
    // Ex.: navigation.goBack && navigation.goBack();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Disponibilidade (Dias / Horários)</Text>

      {/* Seleção de dia e cadastro de novo horário */}
      <Card style={styles.card}>
        <Card.Title title="Configurar" />
        <Card.Content style={styles.gap}>
          <View style={[styles.row, { zIndex: 10 }]}>
            <View style={styles.col}>
              <Dropdown
                placeholder="Selecione o dia"
                options={diasOptions}
                selectedValue={diaSel}
                onValueChange={setDiaSel}
                isSearchable
                primaryColor={"#DADCEA"}
                dropdownStyle={styles.dropdown}
                placeholderStyle={{ color: "#3A3A3C" }}
                dropdownIconStyle={{ top: 30 }}
                style={{ backgroundColor: "#fff" }}
              />
            </View>
          </View>

          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Novo horário (HH:MM)"
              value={novoHora}
              onChangeText={setNovoHora}
              placeholder="08:00"
              keyboardType="numeric"
              style={styles.col}
              maxLength={5}
            />
            <Button mode="contained" onPress={AdicionarWrapper}>
              Adicionar
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Grade de horários do dia selecionado */}
      <Card style={styles.card}>
        <Card.Title title={`Horários de ${diaSel || "—"}`} />
        <Card.Content style={styles.gap}>
          {horariosDoDia.length === 0 ? (
            <Text style={{ color: "#6b7280" }}>
              Nenhum horário cadastrado para este dia.
            </Text>
          ) : (
            <View style={styles.grid}>
              {horariosDoDia.map((h) => {
                const ativo = selecionados.includes(h);
                return (
                  <Button
                    key={h}
                    mode={ativo ? "contained" : "outlined"}
                    onPress={() => toggleSelecionado(h)}
                    style={styles.slotBtn}
                  >
                    {h}
                  </Button>
                );
              })}
            </View>
          )}

          <View style={[styles.row, { justifyContent: "flex-end" }]}>
            <Button mode="outlined" onPress={removerSelecionados}>
              Remover selecionados
            </Button>
            <Button mode="contained" onPress={salvar}>
              Salvar disponibilidade
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Text style={styles.obs}>
        • Edição local (mock) baseada nos dados de <Text style={{ fontWeight: "600" }}>{prof?.nome}</Text>.{"\n"}
        • Para persistir de verdade, integrar depois com API/Firestore (fora do escopo atual das pages).
      </Text>
    </ScrollView>
  );

  // Wrapper para manter mesma organização de handlers acima do return
  function AdicionarWrapper() {
    adicionarHorario();
  }
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  slotBtn: {
    minWidth: 88,
  },
  obs: { color: "#6b7280", fontSize: 12, marginTop: 8 },
});

export default Agenda;
