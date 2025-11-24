import { View, Text, StyleSheet, FlatList } from "react-native";
import Profissionais from "../../Dados/Profissionais.json";
import Profissional from "./Profissional";

const ListaDeProfissionais = ({ onSelectProfissional }) => {
  const renderProfissionais = ({ item }) => (
    <Profissional
      infoProfissional={item}
      onPress={() => onSelectProfissional(item)}
    />
  );
  return (
    <View style={styles.professionalListContainer__list}>
      <FlatList
        style={styles.profFlatList}
        data={Profissionais}
        renderItem={renderProfissionais}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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
    marginBottom: 16,
  },
});

export default ListaDeProfissionais;
