import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

const ListaDeHorarios = ({ horarios }) => {
  if (!horarios || horarios.length === 0) {
    return (
      <View style={styles.noHorariosContainer}>
        <Text style={styles.noHorariosText}>
          Sem horários disponíveis neste dia
        </Text>
      </View>
    );
  }

  const renderHorarios = ({ item }) => (
    <Text style={styles.textoHorario}>{item}</Text>
  );
  return (
    <View style={styles.professionalListContainer__list}>
      <FlatList
        style={styles.profFlatList}
        data={horarios}
        renderItem={renderHorarios}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noHorariosContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  noHorariosText: {
    fontSize: 14,
    color: "#8F90A6",
    fontStyle: "italic",
    fontFamily: "Krub",
  },
  professionalListContainer__list: {
    flex: 1,
    paddingVertical: 32,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textoHorario: {
    width: "48%",
    color: "#8F90A6",
    borderStyle: "dotted",
    borderBottomWidth: 1,
    borderColor: "#DADCEA",
    paddingTop: 8,
    paddingBottom: 4,
  },
});

export default ListaDeHorarios;
