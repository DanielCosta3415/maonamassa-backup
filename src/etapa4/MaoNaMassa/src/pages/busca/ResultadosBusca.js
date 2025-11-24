import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';

import CardProfissional from './CardProfissional';
import CardServico from './CardServico';

export default function ResultadosBusca({
  resultados,
  tipo,
  carregando,
  onSelectItem,
  onCarregarMais,
  temMais,
}) {
  const renderItem = ({ item }) => {
    if (item.tipo === 'profissional' || tipo === 'profissional') {
      return (
        <CardProfissional
          profissional={item}
          onPress={() => onSelectItem(item)}
        />
      );
    } else {
      return (
        <CardServico
          servico={item}
          onPress={() => onSelectItem(item)}
        />
      );
    }
  };

  const renderFooter = () => {
    if (!temMais) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.fimListaText}>
            Fim da lista
          </Text>
        </View>
      );
    }

    if (carregando) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator
            size="small"
            color="var(--color-primary)"
          />
        </View>
      );
    }

    return null;
  };

  return (
    <FlatList
      style={styles.container}
      data={resultados}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={onCarregarMais}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      scrollEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  separator: {
    height: 12,
  },
  loadingFooter: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fimListaText: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
});