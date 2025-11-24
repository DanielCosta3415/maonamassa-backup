import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import Categoria from "./Categoria";

const { width: screenWidth } = Dimensions.get("window");
const ITEM_HEIGHT = 80; // altura aproximada de cada categoria
const NUM_ROWS = 2;

const PaginaDeCategorias = (props) => {
  const itemListaDeCategorias = ({ item }) => (
    <Categoria nome={item.nome} icon={item.icon} />
  );

  return (
    <View style={styles.categoryListContainer}>
      <FlatList
        data={props.pagina}
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
