import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Button, TextInput, HelperText } from "react-native-paper";
import Dropdown from "react-native-input-select";
import { Toast } from "toastify-react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Cabecalho from "./Cabecalho";
import InfoUsuario from "./InfoUsuario";
import DateInput from "./DateInput";

const API_BASE_URL = "https://maonamassa-api.onrender.com";
const STATUS_OPTIONS = [
  { value: "aceito", label: "Aceito" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "concluido", label: "Concluído" }
];

const AtualizarPedido = ({ route }) => {
  const { order } = route.params;

  const [status, setStatus] = useState(order.status);
  const [orcamento, setOrcamento] = useState(order.preco.toString());
  const [dataTermino, setDataTermino] = useState(order.data);

  const error = {
    status: !isStatusOK(status),
    orcamento: !isOrcamentoOK(orcamento),
    dataTermino: !isDataTerminoOK(dataTermino)
  };

  const [clientInfo, setClientInfos] = useState({ nome: "", avatar: "" });
  const [categories, setCategories] = useState(order.servicos);

  useEffect(() => {
    fetchClient(order.cliente_id, setClientInfos);
    fetchCategories(order.servicos, setCategories);
  }, [order.cliente_id, order.servicos]);

  const onChangedStatus = (newValue) => {
    if (!isStatusOK(newValue)) {
      setStatus("");
      return;
    }

    setStatus(newValue);
  };

  const onChangedOrcamento = (newValue) => {
    const normalized = newValue.replace(/[^\d.,]/g, "").replace(",", ".");

    if (!isOrcamentoOK(normalized)) {
      setOrcamento(normalized);
      return;
    }

    setOrcamento(normalized);
  };

  const onChangedDataTermino = (newDate) => {
    if (!isDataTerminoOK(newDate)) {
      setDataTermino("");
      return;
    }

    setDataTermino(newDate);
  };

  const onSaveData = async () => {
    const newData = {
      status,
      preco: orcamento,
      data: dataTermino.toISOString()
    };

    if (error.status || error.orcamento || error.dataTermino) {
      Toast.error("Por favor, corrija os erros antes de salvar.");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/contratacao/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData)
    });

    if (res.ok) {
      Toast.success("Informações do pedido atualizado com sucesso");
    } else {
      Toast.error("Erro ao atualizar informações do pedido");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <Cabecalho />

        <ScrollView style={styles.conteudo}>
          <View style={styles.header}>
            <Text style={[styles.title, styles.h1]}>Pedido {order.number}</Text>
            <View style={styles.categories}>{
              categories.map(category => {
                return (
                  <Text
                    key={category}
                    style={styles.category}
                  >
                    {category}
                  </Text>
                );
              })
            }</View>
          </View>

          <View>
            <InfoUsuario label="Cliente" usuario={clientInfo} />

            <Dropdown
              label="Status do Pedido"
              placeholder="Atualize o status..."

              options={STATUS_OPTIONS}
              selectedValue={status}
              onValueChange={onChangedStatus}

              dropdownContainerStyle={{ marginBottom: 0 }}
              error={error.status ? "Por favor, selecione um status válido." : ""}
            />

            <View style={styles.fields}>
              <View style={styles.field}>
                <TextInput
                  label="Orçamento"
                  placeholder="Defina o valor..."
                  left={<TextInput.Affix text="R$ " />}
                  keyboardType="decimal-pad"
                  onChangeText={onChangedOrcamento}
                  value={orcamento.toString()}
                  error={error.orcamento}
                />

                {error.orcamento ? <HelperText type="error" visible={true}>
                  Por favor, insira um orçamento válido.
                </HelperText> : null}
              </View>

              <View style={styles.field}>
                <DateInput
                  label={"Data de término"}
                  value={dataTermino}
                  onChange={onChangedDataTermino}
                  error={error.dataTermino}
                />
                {error.dataTermino ? <HelperText type="error" visible={true}>
                  Por favor, selecione uma data de término válida.
                </HelperText> : null}
              </View>
            </View>

            <View>
              <Text style={[styles.title, styles.h2]}>Descrição</Text>
              <Text>{order.descricao}</Text>
            </View>

            <View>
              <Text style={[styles.title, styles.h2]}>Endereço</Text>
              <Endereco {...order.localizacao} />
            </View>
          </View>

          <Button
            mode="contained"
            style={{ marginTop: 20, borderRadius: 10 }}
            onPress={onSaveData}
          >
            Salvar Alterações
          </Button>
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

async function fetchClient(clientId, setInfo) {
  const res = await fetch(`${API_BASE_URL}/users/${clientId}`);
  const data = await res.json();

  if (!res.ok) {
    console.error("Erro ao buscar informações do cliente");
    setInfo({ nome: "Cliente não encontrado", avatar: "" });
    return;
  }

  setInfo({
    nome: data.nome,
    avatar: data.foto_blob ?? ""
  });
}

async function fetchCategories(categories, setCategories) {
  const res = await fetch(`${API_BASE_URL}/servico?id=${categories.join("&id=")}`);
  const data = await res.json();
  const names = data.map(category => category.nome);


  if (!res.ok) {
    console.error("Erro ao buscar categorias");
    setCategories([]);
    return;
  }

  setCategories(names);
}

function Endereco({ cep, rua, numero, complemento, bairro, cidade, estado }) {
  return (
    <View style={styles.addressContainer}>
      <Text style={styles.addressInfo}>
        <Text style={[styles.h3, styles.addressTitle]}>CEP</Text>
        {"\n" + cep}
      </Text>
      <Text style={styles.addressInfo}>
        <Text style={[styles.h3, styles.addressTitle]}>Logradouro</Text>
        {"\n" + rua}
      </Text>
      <Text style={styles.addressInfo}>
        <Text style={[styles.h3, styles.addressTitle]}>Número</Text>
        {"\n" + numero}
      </Text>
      <Text style={styles.addressInfo}>
        <Text style={[styles.h3, styles.addressTitle]}>Complemento</Text>
        {"\n" + complemento}
      </Text>
      <Text style={styles.addressInfo}>
        <Text style={[styles.h3, styles.addressTitle]}>Bairro</Text>
        {"\n" + bairro}
      </Text>
      <Text style={styles.addressInfo}>
        <Text style={[styles.h3, styles.addressTitle]}>Cidade</Text>
        {"\n" + cidade}
      </Text>
      <Text style={styles.addressInfo}>
        <Text style={[styles.h3, styles.addressTitle]}>Estado</Text>
        {"\n" + estado}
      </Text>
    </View>
  );
}

function isStatusOK(status) {
  return (
    status !== null &&
    status !== undefined &&
    typeof status === "string" &&
    STATUS_OPTIONS.some(opt => opt.value === status)
  );
}

function isOrcamentoOK(orcamento) {
  const parsed = parseFloat(orcamento);

  return (
    orcamento !== null &&
    orcamento !== undefined &&
    /^\d+[\.,]?\d{0,2}$/.test(orcamento) &&
    !isNaN(parsed) &&
    parsed >= 0
  );
}

function isDataTerminoOK(dataTermino) {
  const parsed = new Date(dataTermino);

  return (
    dataTermino !== null &&
    dataTermino !== undefined &&
    parsed instanceof Date &&
    !isNaN(parsed)
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  conteudo: {
    padding: 20
  },
  header: {
    flex: 1,
    flexDirection: "row",
    columnGap: 10
  },
  title: {
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10
  },
  h1: {
    fontSize: 24,
  },
  h2: {
    fontSize: 18,
  },
  h3: {
    fontSize: 14,
  },
  categories: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10
  },
  category: {
    fontSize: 12,
    color: "#909090",
  },
  fields: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "10%",
    marginVertical: 15
  },
  field: {
    width: "45%"
  },
  addressContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "10%",
  },
  addressInfo: {
    width: "45%",
    marginBottom: 10
  },
  addressTitle: {
    marginBottom: 10,
    color: "#909090"
  }
});

export default AtualizarPedido;
