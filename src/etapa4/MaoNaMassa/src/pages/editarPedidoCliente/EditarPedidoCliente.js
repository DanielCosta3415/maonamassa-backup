import { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Modal,
  Portal,
  Provider as PaperProvider,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

import { Toast } from "toastify-react-native";

import InfoProfissional from "./InfoProfissional";
import BotaoSelecionarData from "./BotaoSelecionarData";
import FormularioPedido from "./FormularioPedido";
import ListaDeHorarios from "./ListaDeHorarios";

import "moment/locale/pt-br";
moment.locale("pt-br");

const { width: screenWidth } = Dimensions.get("window");

const EditarPedidoCliente = ({ navigation, route }) => {
  const profissionalId = route.params?.profissionalId;
  const infoPedido = route.params?.infoPedido;

  const [profissional, setProfissional] = useState(null);

  useEffect(() => {
    async function fetchProfissionalCompleto() {
      if (!profissionalId) return;

      try {
        // Busca dados em /users
        const userResp = await fetch(
          `https://maonamassa-api.onrender.com/users?id=${profissionalId}`
        );
        if (!userResp.ok)
          throw new Error("Erro ao buscar profissional em /users");
        const userData = await userResp.json();

        const profResp = await fetch(
          `https://maonamassa-api.onrender.com/professional?id=${profissionalId}`
        );
        if (!profResp.ok)
          throw new Error("Erro ao buscar profissional em /professional");
        const profData = await profResp.json();

        const profissionalCompleto = {
          ...userData[0],
          ...profData[0],
        };

        let categorias = [];
        if (
          profissionalCompleto.categoria_ids &&
          Array.isArray(profissionalCompleto.categoria_ids) &&
          profissionalCompleto.categoria_ids.length > 0
        ) {
          const categoriaPromises = profissionalCompleto.categoria_ids.map(
            async (catId) => {
              const resp = await fetch(
                `https://maonamassa-api.onrender.com/servico?id=${catId}`
              );
              if (!resp.ok) return "Não encontrada";
              const data = await resp.json();
              return data[0]?.nome || "Não encontrada";
            }
          );
          categorias = await Promise.all(categoriaPromises);
        }

        profissionalCompleto.categorias = categorias;

        setProfissional(profissionalCompleto);
      } catch (error) {
        console.error("Erro ao buscar profissional completo:", error);
      }
    }

    fetchProfissionalCompleto();
  }, [profissionalId]);

  const [modalVisible, setModalVisible] = useState(false);
  const abrirModal = () => setModalVisible(true);
  const fecharModal = () => setModalVisible(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [hora, setHora] = useState(infoPedido.hora);
  const [data, setData] = useState(infoPedido.data);

  const [horariosDia, setHorariosDia] = useState([]);

  const getDiaSemana = (date) => {
    if (!date) return null;
    const dia = moment(date).format("ddd");
    return dia.charAt(0).toUpperCase() + dia.slice(1);
  };

  const onChangeDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const dataFormatada = moment(date).format("YYYY-MM-DD");
      setSelectedDate(dataFormatada);

      const disponibilidadeDia = profissional?.disponibilidade?.find(
        (d) => d.dia === getDiaSemana(date)
      );

      setHorariosDia(disponibilidadeDia?.horarios ?? []);
    } else {
      setSelectedDate(null);
      setHorariosDia([]);
    }
  };

  const confirmarDateTime = () => {
    if (selectedDate === null || hora === null) {
      Toast.error("Selecione data e horário.", "bottom");
    } else {
      const [year, month, date] = selectedDate.split("-");
      setData(`${date}/${month}/${year}`);
      fecharModal();
    }
  };

  return (
    <View>
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
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          titleStyle={{
            fontFamily: "InterBold",
            fontSize: 14,
            color: "#8F90A6",
          }}
          title="Editar pedido"
        />
        <Appbar.Action
          icon="bell-outline"
          iconColor="#8E5AE6"
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.pedidoContainer}>
          <Text style={styles.h1}>Editar pedido</Text>
          {!profissional ? (
            <Text>Carregando dados do profissional...</Text>
          ) : (
            <>
              <InfoProfissional profissional={profissional} />
              <BotaoSelecionarData onOpen={abrirModal} />
              <FormularioPedido
                data={data}
                hora={hora}
                listaCategorias={profissional.categorias}
                idCategorias={profissional.categoria_ids}
                profissional={profissional}
                navigation={navigation}
                infoPedido={infoPedido}
              />
            </>
          )}
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={fecharModal}
          contentContainerStyle={{ margin: 0, minHeight: "100%" }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity onPress={fecharModal}>
                  <MaterialCommunityIcons
                    name="window-close"
                    color="#6B7588"
                    size={32}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.h3}>Selecione uma data</Text>
              <CalendarPicker
                onDateChange={onChangeDate}
                selectedStartDate={
                  selectedDate ? moment(selectedDate, "YYYY-MM-DD") : null
                }
                selectedDayColor="#A371F8"
                selectedDayTextColor="#fff"
                todayBackgroundColor="#F04D23"
                weekdays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]}
                months={[
                  "Janeiro",
                  "Fevereiro",
                  "Março",
                  "Abril",
                  "Maio",
                  "Junho",
                  "Julho",
                  "Agosto",
                  "Setembro",
                  "Outubro",
                  "Novembro",
                  "Dezembro",
                ]}
                startFromMonday={false}
                width={330}
                previousTitle="<<"
                nextTitle=">>"
              />

              <View style={styles.listaHorarios}>
                <Text style={styles.h3}>Selecione um horário</Text>

                {horariosDia.length === 0 ? (
                  <Text
                    style={{
                      color: "#DB7500",
                      fontFamily: "KrubSemibold",
                      marginVertical: 16,
                      marginHorizontal: 32,
                      textAlign: "center",
                    }}
                  >
                    Nenhum horário disponível para este dia.
                  </Text>
                ) : (
                  <ListaDeHorarios
                    horarios={horariosDia}
                    hora={hora}
                    setHora={setHora}
                  />
                )}
              </View>

              <View>
                <TouchableOpacity
                  style={styles.btnContainer__large_btn}
                  onPress={confirmarDateTime}
                >
                  <Text style={styles.btnContainer__text}>
                    Confirmar seleção
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  textoHorario: {
    width: "48%",
    color: "#8F90A6",
    borderStyle: "dotted",
    borderBottomWidth: 1,
    borderColor: "#DADCEA",
    paddingTop: 8,
    paddingBottom: 4,
  },
  btnContainer__large_btn: {
    paddingVertical: 12,
    backgroundColor: "#A371F8",
    borderRadius: 6,
  },
  btnContainer__text: {
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "KrubSemibold",
    fontSize: 16,
  },
  mainContainer: {
    backgroundColor: "#ffffff",
    paddingTop: 32,
    marginBottom: 70,
  },
  pedidoContainer: {
    width: screenWidth,
    paddingHorizontal: 16,
    gap: 32,
  },
  h1: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 28,
  },
  h3: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 20,
    textAlign: "center",
  },
  listaHorarios: {
    paddingTop: 32,
  },
});

export default EditarPedidoCliente;
