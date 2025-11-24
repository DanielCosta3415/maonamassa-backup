import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Notificacao from "./Notificacao";

const { width: screenWidth } = Dimensions.get("window");

const ListaDeNotificacoes = ({ listaDeNotificacoes, userRole }) => {
  const navigation = useNavigation();

  const handleSelectProfissional = (profissional) => {
    navigation.navigate("PerfilProfissional", { profissional });
  };

  const renderNotificacoes = ({ item }) => (
    <Notificacao
      infoNotificacao={item}
      userRole={userRole}
      onPress={() => handleSelectProfissional(item)}
    />
  );

  return (
    <View style={styles.professionalListContainer__list}>
      <FlatList
        style={styles.profFlatList}
        data={listaDeNotificacoes}
        renderItem={renderNotificacoes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  professionalListContainer__list: {
    flex: 1,
    width: screenWidth,
  },
  profFlatList: {
    flexGrow: 0,
    marginBottom: 16,
  },
});

export default ListaDeNotificacoes;
