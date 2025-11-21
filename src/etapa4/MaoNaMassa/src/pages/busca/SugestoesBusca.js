import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SugestoesBusca({
  termo,
  sugestoes,
  onSelectSugestao,
}) {
  if (sugestoes.length === 0) return null;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onSelectSugestao(item)}
    >
      <MaterialCommunityIcons
        name="magnify"
        size={16}
        color="var(--color-text-secondary)"
        style={styles.icon}
      />
      
      <View style={styles.textContainer}>
        <Text style={styles.texto} numberOfLines={1}>
          {item.nome}
        </Text>
        {item.tipo && (
          <Text style={styles.tipo}>
            {item.tipo === 'profissional' ? 'Profissional' : 'Serviço'}
          </Text>
        )}
      </View>

      <MaterialCommunityIcons
        name="arrow-top-left"
        size={14}
        color="var(--color-text-secondary)"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sugestoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  texto: {
    fontSize: 14,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  tipo: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: 'var(--color-border)',
  },
});