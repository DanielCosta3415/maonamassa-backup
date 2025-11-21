import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Logo from "./logo";

const TelaInicial = ({ navigation }) => (
  <ImageBackground
    source={require("../../../assets/medium_bg.png")}
    style={styles.background}
    resizeMode="cover"
  >
    <Logo />
    <View style={styles.contentContainer}>
      <Text style={styles.subtitle}>
        Transforme suas habilidades em lucro com Mão na Massa – o serviço que te
        coloca em ação!
      </Text>
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Jé é cadastrado? Entrar.</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
  },
  button: {
    backgroundColor: "#f8f6fc",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 50,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#A085FF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    fontFamily: "KrubSemibold",
    fontSize: 16,
    color: "#ffffff",
  },
});

export default TelaInicial;
