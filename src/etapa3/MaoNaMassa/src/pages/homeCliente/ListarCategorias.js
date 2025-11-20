import React, { useRef, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Animated } from "react-native";

import ListaDeCategorias from "../../Dados/Categorias.json";
import PaginaDeCategorias from "./PaginaDeCategorias";

const { width: screenWidth } = Dimensions.get("window");

const divideCategoriasPorPagina = (categoriaArray, tamanho) => {
  const novoArray = [];
  for (let i = 0; i < categoriaArray.length; i += tamanho) {
    novoArray.push(categoriaArray.slice(i, i + tamanho));
  }

  return novoArray;
};

const ListarCategorias = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollPageX = useRef(new Animated.Value(0)).current;

  const categoriasPaginadas = divideCategoriasPorPagina(ListaDeCategorias, 8);
  const totalPaginas = categoriasPaginadas.length;

  const renderizaPagina = ({ item: paginaCat }) => (
    <PaginaDeCategorias pagina={paginaCat} />
  );

  const handleOnViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50, // Considera o item visível se mais de 50% dele estiver na tela
  };

  return (
    <View style={styles.categoryListContainer}>
      <FlatList
        style={styles.categoryFlatList}
        data={categoriasPaginadas}
        renderItem={renderizaPagina}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollPageX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      <View style={styles.dotsContainer}>
        {categoriasPaginadas.map((_, index) => {
          const isCurrent = index === activeIndex;

          return (
            <View
              key={index}
              style={[
                styles.dot,
                isCurrent ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryListContainer: {
    width: "100%",
    marginVertical: 48,
  },
  categoryFlatList: {
    flexGrow: 0,
    marginBottom: 16,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  inactiveDot: {
    backgroundColor: "#C7C9D9", // Cor cinza (inativo)
  },
  activeDot: {
    backgroundColor: "#8E5AE6", // Cor roxa (ativo)
    width: 16, // Deixar o dot ativo um pouco maior
  },
});

export default ListarCategorias;
