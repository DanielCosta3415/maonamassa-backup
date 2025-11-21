import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import Servicos from "../../Dados/Servicos.json";
import CardServico from "./CardServico";
const { width: screenWidth } = Dimensions.get("window");

const ListaDeServicos = () => {
  const renderServicos = ({ item }) => (
    <CardServico
      servico={item.nome}
      profissionais={item.quantidade_de_profissionais}
      icon={item.icon}
    />
  );
  return (
    <View style={styles.professionalListContainer__list}>
      <FlatList
        style={styles.profFlatList}
        data={Servicos}
        renderItem={renderServicos}
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
  profFlatList: {
    flexGrow: 0,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default ListaDeServicos;
