import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Titulo from "./titulo";
import Dados from "./dados";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("Profissional");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastrar = () => {
    setLoading(true);
    setTimeout(() => {
      console.log({ nome, email, perfil, senha });
      setLoading(false);
      alert("Cadastro concluído!");
    }, 2000);
  };

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("../../../assets/medium_bg.png")} // Altere o caminho conforme o nome/posição da imagem de fundo
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <Titulo />
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          ) : (
            <Dados
              nome={nome}
              setNome={setNome}
              email={email}
              setEmail={setEmail}
              perfil={perfil}
              setPerfil={setPerfil}
              senha={senha}
              setSenha={setSenha}
              onCadastrar={handleCadastrar}
            />
          )}
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cadastro;
