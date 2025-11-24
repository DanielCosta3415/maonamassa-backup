import React from "react";
import { StyleSheet, View, ScrollView, Text, Button } from "react-native";
import Profissionais from "../src/Dados/Profissionais.json";

const Menu = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1}>Menu</Text>
        <Button title="Agenda" onPress={() => navigation.navigate("Agenda")} />
        <Button
          title="Atualizar Pedido"
          onPress={() => navigation.navigate("Atualizar Pedido")}
        />
        <Button
          title="Avaliar Profissional"
          onPress={() => navigation.navigate("Avaliar Profissional")}
        />
        <Button title="Busca" onPress={() => navigation.navigate("Busca")} />
        <Button
          title="Cadastro"
          onPress={() => navigation.navigate("Cadastro")}
        />
        <Button
          title="Criar Pedido"
          onPress={() =>
            navigation.navigate("Criar Pedido", {
              profissional: Profissionais[0],
            })
          }
        />
        <Button
          title="Detalhe de Pedido (cliente)"
          onPress={() => navigation.navigate("Detalhe de Pedido (cliente)")}
        />
        <Button
          title="Editar Perfil (cliente)"
          onPress={() => navigation.navigate("Editar Perfil (cliente)")}
        />
        <Button
          title="Editar Perfil (profissional)"
          onPress={() => navigation.navigate("Editar Perfil (profissional)")}
        />
        <Button
          title="Favoritos"
          onPress={() => navigation.navigate("Favoritos")}
        />
        <Button
          title="Home (cliente)"
          onPress={() => navigation.navigate("Home (cliente)")}
        />
        <Button
          title="Home (profissional)"
          onPress={() => navigation.navigate("Home (profissional)")}
        />
        <Button
          title="Listar Pedidos (cliente)"
          onPress={() => navigation.navigate("Listar Pedidos (cliente)")}
        />
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
        <Button
          title="Pedidos Recebidos"
          onPress={() => navigation.navigate("Pedidos Recebidos")}
        />
        <Button
          title="Onboarding"
          onPress={() => navigation.navigate("Onboarding")}
        />
        <Button
          title="Perfil (profissional)"
          onPress={() =>
            navigation.navigate("Perfil (profissional)", {
              profissional: Profissionais[0],
            })
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: "InterBold",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    gap: 10,
    fontFamily: "Inter",
  },
});

export default Menu;
