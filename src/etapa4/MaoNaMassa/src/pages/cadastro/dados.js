import React, { useState } from "react";
import { StyleSheet, Button, TextInput, Text, View } from "react-native";
import { HelperText } from "react-native-paper";

const Dados = ({
  nome,
  setNome,
  email,
  setEmail,
  perfil,
  setPerfil,
  senha,
  setSenha,
  onCadastrar,
}) => {
  /*   const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("Profissional");
  const [senha, setSenha] = useState(""); */
  const [isHungry, setIsHungry] = useState(true);

  const hasErrors = () => {
    return email.length > 0 && !email.includes("@");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNome}
        value={nome}
        placeholder="Digite seu nome"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholder="Digite seu e-mail"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Perfil</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPerfil}
        value={perfil}
        placeholder="Digite seu perfil"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
        placeholder="Digite sua senha"
      />
      <HelperText type="error" visible={hasErrors()}>
        Email inválido!
      </HelperText>

      <Button
        color="#f6b93b"
        onPress={onCadastrar}
        disabled={!isHungry}
        title={isHungry ? "Cadastrar" : "Cadastro efetuado"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 9,
    height: 45,
  },
  label: {
    marginBottom: 6,
    fontWeight: "bold",
    color: "#fff", // cor branca
    fontSize: 14,
  },
});

export default Dados;
