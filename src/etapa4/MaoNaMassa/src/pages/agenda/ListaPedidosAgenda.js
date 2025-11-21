import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import CardPedidoAgenda from './CardPedidoAgenda';

export default function ListaPedidosAgenda({
  pedidos,
  dataSelecionada,
  carregando,
  onSelectPedido,
  onAdiar,
  onCancelar,
  onConfirmar,
}) {
  // Ordena pedidos por hora
  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    return a.hora.localeCompare(b.hora);
  });

  const dataFormatada = moment(dataSelecionada, 'YYYY-MM-DD')
    .locale('pt-br')
    .format('dddd, DD [de] MMMM');

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="var(--color-primary)" />
      </View>
    );
  }

  if (pedidosOrdenados.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Nenhum pedido agendado</Text>
        <Text style={styles.emptyText}>
          Você não tem pedidos para {dataFormatada}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Pedidos de {dataFormatada}
      </Text>

      <FlatList
        data={pedidosOrdenados}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardPedidoAgenda
            pedido={item}
            onPress={() => onSelectPedido(item)}
            onAdiar={() => onAdiar(item)}
            onCancelar={() => onCancelar(item)}
            onConfirmar={() => onConfirmar(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: 16,
    fontFamily: 'Inter',
    textTransform: 'capitalize',
  },
  loadingContainer: {
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  emptyText: {
    fontSize: 14,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  separator: {
    height: 12,
  },
});