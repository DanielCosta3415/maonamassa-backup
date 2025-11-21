import { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import ImagemPortfolio from "./ImagemPortfolio";
import DisponibilidadeProfissional from "./DisponibilidadeProfissional";
import AvaliacoesProfissional from "./AvaliacaoesProfissional";

const { width: screenWidth } = Dimensions.get("window");

const SobreProfissional = ({ dadosProfissional, pedidos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollPageX = useRef(new Animated.Value(0)).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleOnViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const renderImg = useCallback(
    ({ item }) => (
      <View style={{ width: screenWidth - 32 }}>
        <ImagemPortfolio imagem={item} />
      </View>
    ),
    []
  );
  return (
    <View style={styles.sobreProfessionalContainer}>
      <Text style={styles.h2}>Sobre este profissional</Text>
      <View style={styles.sobreProfessionalContainer__detalhes}>
        <View style={styles.sobreProfessionalContainer__biografia}>
          <Text style={styles.sobreProfessionalContainer__label}>
            Biografia
          </Text>
          <Text style={styles.sobreProfessionalContainer__text}>
            {dadosProfissional.biografia}
          </Text>
        </View>

        <View style={styles.sobreProfessionalContainer__pedidos_local}>
          <View>
            <Text style={styles.sobreProfessionalContainer__label}>
              Pedidos concluídos
            </Text>

            <Text style={styles.sobreProfessionalContainer__text}>
              {dadosProfissional.pedidosConcluidos} pedidos
            </Text>
          </View>

          <View>
            <Text style={styles.sobreProfessionalContainer__label}>
              Localização
            </Text>

            <Text style={styles.sobreProfessionalContainer__text}>
              {dadosProfissional.endereco[0].cidade}/
              {dadosProfissional.endereco[0].estado}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.sobreProfessionalContainer__label}>
            Projetos anteriores
          </Text>
          <FlatList
            style={styles.sobreProfessionalContainer__flatList}
            data={dadosProfissional.portfolio}
            initialNumToRender={dadosProfissional.portfolio.length}
            maxToRenderPerBatch={dadosProfissional.portfolio.length}
            renderItem={renderImg}
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
        </View>

        <DisponibilidadeProfissional
          disponibilidade={dadosProfissional.disponibilidade}
        />

        <AvaliacoesProfissional
          pedidos={pedidos}
          nome={dadosProfissional.nome}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sobreProfessionalContainer: {
    width: screenWidth,
    paddingHorizontal: 16,
    marginTop: 48,
    gap: 32,
  },
  h2: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 24,
  },
  sobreProfessionalContainer__detalhes: {
    gap: 32,
  },
  sobreProfessionalContainer__pedidos_local: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sobreProfessionalContainer__label: {
    fontFamily: "Krub",
    fontSize: 12,
    color: "#8F90A6",
  },
  sobreProfessionalContainer__text: {
    fontFamily: "Krub",
    color: "#3A3A3C",
  },
  sobreProfessionalContainer__flatList: {
    paddingTop: 16,
  },
});

export default SobreProfissional;
