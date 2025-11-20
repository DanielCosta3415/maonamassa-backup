import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Cabecalho from "../atualizarPedido/Cabecalho";
import Rodape from "../atualizarPedido/Rodape";
import CartaoPedido from "./CartaoPedido";

const estados = [
  { titulo: "Novos", chavePesquisa: "Novo" },
  { titulo: "Aceitos", chavePesquisa: "Aceito" },
  { titulo: "Em andamento" },
  { titulo: "Concluídos", chavePesquisa: "Concluído" },
  { titulo: "Cancelados", chavePesquisa: "Cancelado" }
];

function Estado({ nome }) {
  return <Text style={styles.estado} key={nome}>{nome}</Text>;
}

const PedidosRecebidos = () => {
  const [termoBusca, setTermoBusca] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <Cabecalho />

        <ScrollView style={styles.conteudo}>
          <TextInput
            label="Buscar Pedido"
            value={termoBusca}
            onChangeText={setTermoBusca}
            right={<TextInput.Icon icon="magnify" />}
          />

          <Text style={styles.titulo}>Meus pedidos</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {estados.map((estado) => <Estado key={estado.titulo} nome={estado.titulo} />)}
          </ScrollView>

          {Array.from({ length: 5 }).map((_, index) => {
            const estado = estados[index];

            return (
              <CartaoPedido
                key={index}
                numero={index + 1}
                cliente={index + 1}
                data={`2023-09-${index + 1}`}
                estado={estado.chavePesquisa ?? estado.titulo} />
            );
          })}
        </ScrollView>

        <Rodape />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  conteudo: {
    padding: 20,
    marginBottom: 115,
    gap: 20
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 24
  },
  estado: {
    fontSize: 16,
    marginRight: "5%"
  }
});

export default PedidosRecebidos;
