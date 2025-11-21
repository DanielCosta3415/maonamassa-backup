import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Profissional from "./Profissional";

const ListaDeProfissionais = () => {
  const [listaProfissionais, setListaProfissionais] = useState([]);
  const navigation = useNavigation();

  const handleSelectProfissional = (profissional) => {
    navigation.navigate("PerfilProfissional", { profissional });
  };

  useEffect(() => {
    async function fetchProfissionais() {
      try {
        const resProf = await fetch(
          "https://maonamassa-api.onrender.com/professional?_limit=5"
        );
        if (!resProf.ok) throw new Error("Erro ao buscar profissionais");
        const profissionais = await resProf.json();

        const resUsers = await fetch(
          "https://maonamassa-api.onrender.com/users"
        );
        if (!resUsers.ok) throw new Error("Erro ao buscar usuários");
        const users = await resUsers.json();

        const resCategorias = await fetch(
          "https://maonamassa-api.onrender.com/servico"
        );
        if (!resCategorias.ok) throw new Error("Erro ao buscar categorias");
        const categorias = await resCategorias.json();

        const profissionaisCompletos = profissionais.map((prof) => {
          const user = users.find((u) => u.id === prof.usuario_id);

          let nomesCategorias = [];
          if (prof.categoria_ids && Array.isArray(prof.categoria_ids)) {
            nomesCategorias = prof.categoria_ids
              .map((catId) => {
                const cat = categorias.find((c) => c.id === catId);
                return cat ? cat.nome : null;
              })
              .filter(Boolean);
          }

          return {
            ...prof,
            userInfo: user,
            categorias: nomesCategorias,
          };
        });

        setListaProfissionais(profissionaisCompletos);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfissionais();
  }, []);

  const renderProfissionais = ({ item }) => (
    <Profissional
      infoProfissional={item}
      usuario={item.userInfo}
      onPress={() => handleSelectProfissional(item)}
    />
  );

  return (
    <View style={styles.professionalListContainer__list}>
      <FlatList
        style={styles.profFlatList}
        data={listaProfissionais}
        renderItem={renderProfissionais}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  professionalListContainer__list: {
    flex: 1,
    paddingVertical: 32,
  },
  profFlatList: {
    flexGrow: 0,
    marginBottom: 16,
  },
});

export default ListaDeProfissionais;
