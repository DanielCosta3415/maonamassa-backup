import React, { useMemo, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, Card, HelperText } from "react-native-paper";
import { Toast } from "toastify-react-native";
import Dropdown from "react-native-input-select";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Mocks (mantendo o padrão das outras telas)
import CLIENTES from "../../Dados/Clientes.json";
import PROFISSIONAIS from "../../Dados/Profissionais.json";

const PAPEL_OPTIONS = [
  { label: "Cliente", value: "cliente" },
  { label: "Profissional", value: "profissional" },
];

const Login = ({ navigation, atualizarLogin }) => {
  const [papel, setPapel] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Validações simples, coerentes com o padrão das pages
  const validarEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());
  const temErro = {
    papel: !papel,
    email: !validarEmail(email),
    senha: !(senha && senha.trim().length >= 4),
  };

  const entrar = useCallback(async () => {
    if (Object.values(temErro).some(Boolean)) {
      Toast.error("Verifique os campos obrigatórios.", "bottom");
      return;
    }

    try {
      const response = await fetch(
        "https://maonamassa-api.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password: senha }),
        }
      );

      if (!response.ok) {
        throw new Error("Credenciais inválidas.");
      }

      const data = await response.json();

      await AsyncStorage.setItem("jwtToken", data.accessToken);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      Toast.success("Login efetuado com sucesso!");

      if (papel === "cliente") {
        navigation.navigate("HomeCliente", { id: data.user.id });
        await AsyncStorage.setItem("userRole", "cliente");
        atualizarLogin(true);
      } else {
        navigation.navigate("HomeProfissional", { id: data.user.id });
        await AsyncStorage.setItem("userRole", "profissional");
        atualizarLogin(true);
      }
    } catch (error) {
      Toast.error(error.message || "Erro ao logar.", "bottom");
    }
  }, [papel, email, senha]);

  const irParaCadastro = useCallback(() => {
    // Ajuste o nome da rota conforme o cadastro no seu stack
    navigation?.navigate?.("Cadastro");
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <Card style={styles.card}>
        <Card.Title title="Acesso" />
        <Card.Content style={styles.gap}>
          <View style={[styles.row, { zIndex: 10 }]}>
            <View style={styles.col}>
              <Dropdown
                placeholder="Entrar como*"
                options={PAPEL_OPTIONS}
                selectedValue={papel}
                onValueChange={setPapel}
                isSearchable
                primaryColor={"#DADCEA"}
                dropdownStyle={styles.dropdown}
                placeholderStyle={{ color: "#3A3A3C" }}
                dropdownIconStyle={{ top: 30 }}
                style={{ backgroundColor: "#fff" }}
              />
              <HelperText type="error" visible={temErro.papel}>
                Selecione um papel (Cliente ou Profissional).
              </HelperText>
            </View>
          </View>

          <TextInput
            mode="outlined"
            label="E-mail*"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={temErro.email}
          />
          <HelperText type="error" visible={temErro.email}>
            Informe um e-mail válido.
          </HelperText>

          <TextInput
            mode="outlined"
            label="Senha*"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            error={temErro.senha}
          />
          <HelperText type="error" visible={temErro.senha}>
            Sua senha deve ter pelo menos 4 caracteres (mock).
          </HelperText>

          <View style={[styles.row, { justifyContent: "flex-end" }]}>
            <Button mode="outlined" onPress={irParaCadastro}>
              Criar conta
            </Button>
            <Button mode="contained" onPress={entrar}>
              Entrar
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
  obs: { color: "#6b7280", fontSize: 12, marginTop: 8 },
});

export default Login;
