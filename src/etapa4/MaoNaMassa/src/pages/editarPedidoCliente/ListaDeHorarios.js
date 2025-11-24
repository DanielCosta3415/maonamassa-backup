import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const ListaDeHorarios = ({ horarios, hora, setHora }) => {
  const renderHorarios = ({ item }) => (
    <TouchableOpacity
      onPress={() => setHora(item)}
      style={[
        styles.textoHorario,
        item === hora && { backgroundColor: "#F5F6FF", borderRadius: 50 },
      ]}
    >
      <Text
        style={{
          color: "#8F90A6",
          fontFamily: "KrubSemibold",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.professionalListContainer__list}>
      <FlatList
        style={styles.profFlatList}
        data={horarios}
        renderItem={renderHorarios}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  professionalListContainer__list: {
    paddingVertical: 16,
  },
  profFlatList: {
    flexGrow: 0,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textoHorario: {
    fontFamily: "KrubSemibold",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    margin: 2,
    color: "#8F90A6",
    minWidth: "28%",
    textAlign: "center",
  },
});

export default ListaDeHorarios;
