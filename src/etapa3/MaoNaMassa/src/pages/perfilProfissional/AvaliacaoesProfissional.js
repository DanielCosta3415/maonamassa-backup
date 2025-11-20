import { View, StyleSheet, Text, FlatList } from "react-native";
import CardAvaliacao from "./CardAvaliacao";

const AvaliacoesProfissional = ({ pedidos, nome }) => {
  const renderAvaliacoes = ({ item }) => <CardAvaliacao pedido={item} />;
  return (
    <View style={{ gap: 32, marginTop: -16 }}>
      <Text style={styles.h2}>Avaliações de {nome}</Text>
      <FlatList
        style={styles.profFlatList}
        data={pedidos}
        renderItem={renderAvaliacoes}
        keyExtractor={(_, index) => index.toString()}
        numColumns={1}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  h2: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 24,
  },
});

export default AvaliacoesProfissional;
