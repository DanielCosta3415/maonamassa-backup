import { useState } from "react";
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

import { Toast } from "toastify-react-native";

import InfoProfissional from "./InfoProfissional";
import BotaoSelecionarData from "./BotaoSelecionarData";
import FormularioPedido from "./FormularioPedido";
import ListaDeHorarios from "./ListaDeHorarios";

const { width: screenWidth } = Dimensions.get("window");

const CriarPedido = ({ navigation, route }) => {
  const profissional = route.params?.profissional;
  const [modalVisible, setModalVisible] = useState(false);
  const abrirModal = () => setModalVisible(true);
  const fecharModal = () => setModalVisible(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [hora, setHora] = useState(null);
  const [data, setData] = useState(null);

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
    <>
      <Appbar.Header
        mode="center-aligned"
        style={{ borderBottomWidth: 1, borderColor: "#DADCEA", backgroundColor: "#F5F6FF" }}
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
          title="Realizar pedidos"
        />
        <Appbar.Action
          icon="bell-outline"
          iconColor="#8E5AE6"
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.pedidoContainer}>
          <Text style={styles.h1}>Realizar pedido</Text>
          <InfoProfissional profissional={profissional} />
          <BotaoSelecionarData onOpen={abrirModal} />
          <FormularioPedido data={data} hora={hora} />
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
                  <MaterialCommunityIcons name="window-close" color="#6B7588" size={32} />
                </TouchableOpacity>
              </View>
              <Text style={styles.h3}>Selecione uma data</Text>
              <CalendarPicker
                onDateChange={(date) => {
                  if (date instanceof Date && !isNaN(date)) {
                    setSelectedDate(moment(date).format("YYYY-MM-DD"));
                  } else {
                    setSelectedDate(null);
                  }
                }}
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
                <ListaDeHorarios
                  horarios={profissional.disponibilidade[0].horarios}
                  hora={hora}
                  setHora={setHora}
                />
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
    </>
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

export default CriarPedido;
