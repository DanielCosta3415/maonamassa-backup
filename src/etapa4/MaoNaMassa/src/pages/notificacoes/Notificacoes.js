import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ListaDeNotificacoes from "./ListaDeNotificacoes";

const Notificacoes = () => {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [listaNotificacoes, setListaNotificacoes] = useState([]);

  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const role = await AsyncStorage.getItem("userRole");
        if (role !== null) {
          setUserRole(role);
        }

        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.error("Erro ao carregar dados do usuário", e);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    async function fetchNotificacoes() {
      try {
        if (!user?.id) return;

        const url = `https://maonamassa-api.onrender.com/notificacao?destinatario_id=${user.id}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar pedidos");

        const notificacoesData = await response.json();
        setListaNotificacoes(notificacoesData.reverse());
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotificacoes();
  }, [user]);

  return (
    <ScrollView style={styles.homeContainer}>
      <Appbar.Header
        mode="center-aligned"
        style={{
          borderBottomWidth: 1,
          borderColor: "#DADCEA",
          backgroundColor: "#F5F6FF",
        }}
      >
        <Appbar.Action
          icon="chevron-left"
          iconColor="#8F90A6"
          onPress={handleGoBack}
        />
        <Appbar.Content
          titleStyle={{
            fontFamily: "InterBold",
            fontSize: 14,
            color: "#8F90A6",
          }}
          title="Minhas notificações"
        />
      </Appbar.Header>
      <ListaDeNotificacoes
        listaDeNotificacoes={listaNotificacoes}
        userRole={userRole}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 70,
  },
});

export default Notificacoes;
