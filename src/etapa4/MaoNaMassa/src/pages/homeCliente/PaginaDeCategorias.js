import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import Categoria from "./Categoria";

const { width: screenWidth } = Dimensions.get("window");
const ITEM_HEIGHT = 80;
const NUM_ROWS = 2;

const PaginaDeCategorias = ({ pagina, navigation }) => {
  const itemListaDeCategorias = ({ item }) => (
    <Categoria
      nome={item.nome}
      icon={item.icon}
      id={item.id}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.categoryListContainer}>
      <FlatList
        data={pagina}
        renderItem={itemListaDeCategorias}
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={false}
        style={styles.flatList}
        columnWrapperStyle={{ marginBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryListContainer: {
    width: screenWidth,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    width: screenWidth,
  },
});

export default PaginaDeCategorias;
