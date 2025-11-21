import React, { useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button, Card, HelperText } from "react-native-paper";
import { Toast } from "toastify-react-native";
import Dropdown from "react-native-input-select";

// Mocks (existentes no repo)
import CLIENTES from "../../Dados/Clientes.json";

const UFS = [
  { label: "AC", value: "AC" }, { label: "AL", value: "AL" }, { label: "AP", value: "AP" },
  { label: "AM", value: "AM" }, { label: "BA", value: "BA" }, { label: "CE", value: "CE" },
  { label: "DF", value: "DF" }, { label: "ES", value: "ES" }, { label: "GO", value: "GO" },
  { label: "MA", value: "MA" }, { label: "MT", value: "MT" }, { label: "MS", value: "MS" },
  { label: "MG", value: "MG" }, { label: "PA", value: "PA" }, { label: "PB", value: "PB" },
  { label: "PR", value: "PR" }, { label: "PE", value: "PE" }, { label: "PI", value: "PI" },
  { label: "RJ", value: "RJ" }, { label: "RN", value: "RN" }, { label: "RS", value: "RS" },
  { label: "RO", value: "RO" }, { label: "RR", value: "RR" }, { label: "SC", value: "SC" },
  { label: "SP", value: "SP" }, { label: "SE", value: "SE" }, { label: "TO", value: "TO" },
];

const EditarPerfilCliente = ({ navigation, route }) => {
  // Se vier um id pela navegação, usamos; senão, usa o primeiro mock
  const clienteId = route?.params?.id ?? CLIENTES?.[0]?.id ?? 1;
  const cliente = useMemo(
    () => CLIENTES.find((c) => c.id === clienteId) ?? CLIENTES[0],
    [clienteId]
  );

  const [nome, setNome] = useState(cliente?.nome ?? "");
  const [telefone, setTelefone] = useState(cliente?.telefone ?? "");
  const [email, setEmail] = useState(cliente?.email ?? "");
  const [avatar, setAvatar] = useState(cliente?.avatar ?? "");

  // Endereço (objeto simples no mock de Clientes)
  const [cep, setCEP] = useState(cliente?.endereco?.cep ?? "");
  const [rua, setRua] = useState(cliente?.endereco?.rua ?? "");
  const [numero, setNumero] = useState(cliente?.endereco?.numero ?? "");
  const [complemento, setComplemento] = useState(cliente?.endereco?.complemento ?? "");
  const [bairro, setBairro] = useState(cliente?.endereco?.bairro ?? "");
  const [cidade, setCidade] = useState(cliente?.endereco?.cidade ?? "");
  const [estado, setEstado] = useState(cliente?.endereco?.estado ?? "");

  const temErro = {
    nome: !nome?.trim(),
    telefone: !telefone?.trim(),
    email: !email?.trim(),
    cep: !cep?.trim(),
    rua: !rua?.trim(),
    numero: !numero?.trim(),
    bairro: !bairro?.trim(),
    cidade: !cidade?.trim(),
    estado: !estado?.trim(),
  };

  const buscarCEP = async () => {
    const digits = (cep || "").replace(/\D/g, "");
    if (digits.length !== 8) {
      Toast.error("CEP inválido. Use 8 dígitos.", "bottom");
      return;
    }
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await resp.json();
      if (data.erro) {
        Toast.error("CEP não encontrado.", "bottom");
        return;
      }
      setRua(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
      Toast.success("Endereço preenchido pelo CEP!");
    } catch (e) {
      Toast.error("Erro ao buscar o CEP.", "bottom");
    }
  };

  const salvar = () => {
    // Apenas validação e feedback (mock). Persistência real não faz parte das pages ainda.
    if (Object.values(temErro).some(Boolean)) {
      Toast.error("Preencha todos os campos obrigatórios.", "bottom");
      return;
    }
    // Aqui poderíamos enviar para API/Firestore no futuro.
    Toast.success("Perfil atualizado (mock).");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil (Cliente)</Text>

      <Card style={styles.card}>
        <Card.Title title="Informações pessoais" />
        <Card.Content style={styles.gap}>
          {!!avatar && (
            <View style={{ alignItems: "center" }}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
            </View>
          )}
          <TextInput
            mode="outlined"
            label="URL do Avatar"
            value={avatar}
            onChangeText={setAvatar}
          />
          <TextInput
            mode="outlined"
            label="Nome*"
            value={nome}
            onChangeText={setNome}
            error={temErro.nome}
          />
          <HelperText type="error" visible={temErro.nome}>
            Informe o nome.
          </HelperText>

          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Telefone*"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
              style={styles.col}
              error={temErro.telefone}
            />
            <TextInput
              mode="outlined"
              label="E-mail*"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.col}
              error={temErro.email}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Endereço" />
        <Card.Content style={styles.gap}>
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="CEP*"
              value={cep}
              onChangeText={setCEP}
              keyboardType="numeric"
              style={[styles.col, { flex: 1.2 }]}
              error={temErro.cep}
            />
            <Button mode="contained" style={[styles.col, { flex: 0.8 }]} onPress={buscarCEP}>
              Buscar CEP
            </Button>
          </View>

          <TextInput
            mode="outlined"
            label="Rua*"
            value={rua}
            onChangeText={setRua}
            error={temErro.rua}
          />
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Número*"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
              style={styles.col}
              error={temErro.numero}
            />
            <TextInput
              mode="outlined"
              label="Complemento"
              value={complemento}
              onChangeText={setComplemento}
              style={styles.col}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Bairro*"
              value={bairro}
              onChangeText={setBairro}
              style={styles.col}
              error={temErro.bairro}
            />
            <TextInput
              mode="outlined"
              label="Cidade*"
              value={cidade}
              onChangeText={setCidade}
              style={styles.col}
              error={temErro.cidade}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.col, { zIndex: 10 }]}>
              <Dropdown
                placeholder="Estado (UF)*"
                options={UFS}
                selectedValue={estado}
                onValueChange={(val) => setEstado(val)}
                primaryColor={"#DADCEA"}
                isSearchable
                dropdownStyle={styles.dropdown}
                placeholderStyle={{ color: "#3A3A3C" }}
                dropdownIconStyle={{ top: 30 }}
                style={{ backgroundColor: "#fff" }}
              />
              <HelperText type="error" visible={temErro.estado}>
                Selecione o estado (UF).
              </HelperText>
            </View>
            <View style={styles.col} />
          </View>
        </Card.Content>

        <Card.Actions>
          <Button mode="contained" onPress={salvar}>
            Salvar alterações
          </Button>
        </Card.Actions>
      </Card>

      <Text style={styles.obs}>
        * Campos obrigatórios — alterações são **locais** (mock), sem persistência real.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 4 },
  card: { backgroundColor: "#fff" },
  gap: { gap: 12 },
  row: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 8 },
  dropdown: {
    borderColor: "#DADCEA",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  obs: { color: "#6b7280", fontSize: 12, marginTop: 8 },
});

export default EditarPerfilCliente;
