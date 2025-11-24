import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function HistoricoBuscas({
  historico,
  onSelectBusca,
  onRemoverBusca,
  onLimpar,
}) {
  if (historico.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Histórico de Buscas</Text>
        <TouchableOpacity onPress={onLimpar}>
          <Text style={styles.limpar}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {historico.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => onSelectBusca(item.termo)}
          >
            <View style={styles.item}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={14}
                color="var(--color-primary)"
                style={styles.icon}
              />
              <Text style={styles.termo} numberOfLines={1}>
                {item.termo}
              </Text>
              <TouchableOpacity
                onPress={() => onRemoverBusca(item.id)}
                style={styles.removeButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={14}
                  color="var(--color-text-secondary)"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.data}>
              {moment(item.data).locale('pt-br').fromNow()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  limpar: {
    fontSize: 12,
    color: 'var(--color-primary)',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  scrollContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  itemContainer: {
    marginRight: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    minWidth: 140,
  },
  icon: {
    marginRight: 6,
  },
  termo: {
    flex: 1,
    fontSize: 12,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  removeButton: {
    padding: 4,
    marginLeft: 6,
  },
  data: {
    fontSize: 10,
    color: 'var(--color-text-secondary)',
    marginTop: 4,
    fontFamily: 'Inter',
  },
});