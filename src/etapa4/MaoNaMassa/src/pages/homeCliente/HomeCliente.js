import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import HomeHeader from "./HomeHeader";
import ListarCategorias from "./ListarCategorias";
import UltimosProfissionais from "./UltimosProfissionais";
import ServicosPopulares from "./ServicosPopulares";

import AsyncStorage from "@react-native-async-storage/async-storage";
import UltimosPedidos from "./UltimosPedidos";

const HomeCliente = ({ atualizarLogin }) => {
  const [user, setUser] = useState(null);

  const getUserFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue !== null) {
        const jsonValue = await AsyncStorage.getItem("user");
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;
        return user;
      }
    } catch (e) {
      console.error("Erro ao ler usuário do AsyncStorage", e);
    }
    return null;
  };

  useEffect(() => {
    async function loadUser() {
      const storedUser = await getUserFromStorage();
      setUser(storedUser);
    }
    loadUser();
  }, []);

  return (
    <ScrollView style={styles.homeContainer}>
      <HomeHeader user={user} atualizarLogin={atualizarLogin} />
      <ListarCategorias />
      <UltimosProfissionais />
      <UltimosPedidos user={user} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 70,
  },
});

export default HomeCliente;
