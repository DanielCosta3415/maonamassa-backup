import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import Dropdown from "react-native-input-select";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";

// TODO: Quase o mesmo arquivo que "src\etapa3\MaoNaMassa\src\pages\criarPedido\InfoProfissional.js"
import InfoUsuario from "./InfoUsuario";
import DateInput from "./DateInput";

const AtualizarPedido = ({ pedido }) => {
  const [status, setStatus] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <Cabecalho />

        <ScrollView style={styles.conteudo}>
          <View>
            <Text>Pedido {pedido?.id ?? "#0000"}</Text>
            <Text>{pedido?.tipo ?? "Sem tipo"}</Text>
          </View>

          <View>
            <InfoUsuario
              label="Cliente"
              usuario={{ nome: "Ana Lúcia Sampaio", avatar: "https://example.com/avatar.jpg" }}
            />

            <Dropdown
              label="Status do Pedido"
              placeholder="Atualize o status..."
              options={[
                { label: "Aceito" },
                { label: "Em andamento" },
                { label: "Concluído" }
              ]}
              onValueChange={(value) => setStatus(value)}
              selectedValue={status}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: "10%" }}>
              <TextInput
                style={{ width: "45%" }}
                label="Orçamento"
                placeholder="Defina o valor..."
              />

              <DateInput label={"Data de término"} />
            </View>

            <View>
              <Text style={{ fontWeight: "bold", marginTop: 12 }}>Descrição</Text>
              <Text>{pedido?.descricao ?? "Sem descrição"}</Text>
            </View>

            <View>
              <Text style={{ fontWeight: "bold", marginTop: 12 }}>Endereço</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", columnGap: "10%" }}>
                <Text style={{ width: "45%" }}>{pedido?.rua ?? "Sem rua"}</Text>
                <Text style={{ width: "45%" }}>{pedido?.numero ?? "Sem número"}</Text>
                <Text style={{ width: "45%" }}>{pedido?.bairro ?? "Sem bairro"}</Text>
                <Text style={{ width: "45%" }}>{pedido?.cidade ?? "Sem cidade"}</Text>
                <Text style={{ width: "45%" }}>{pedido?.estado ?? "Sem estado"}</Text>
              </View>
            </View>
          </View>

          <Button mode="contained" style={{ marginTop: 20, borderRadius: 10 }}>
            Salvar Alterações
          </Button>
        </ScrollView>

        <Rodape />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  conteudo: {
    padding: 20
  }
});

export default AtualizarPedido;
