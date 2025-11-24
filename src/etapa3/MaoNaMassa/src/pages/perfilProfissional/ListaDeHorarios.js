import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

const ListaDeHorarios = ({ horarios }) => {
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
