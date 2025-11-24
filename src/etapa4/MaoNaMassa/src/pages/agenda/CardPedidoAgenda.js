import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StatusBadge from './StatusBadge';

export default function CardPedidoAgenda({
  pedido,
  onPress,
  onAdiar,
  onCancelar,
  onConfirmar,
}) {
  const pessoa = pedido.cliente_nome || pedido.profissional_nome;
  const foto = pedido.cliente_foto || pedido.profissional_foto;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* CONTEÚDO PRINCIPAL */}
      <View style={styles.content}>
        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          {foto ? (
            <Avatar.Image size={56} source={{ uri: foto }} />
          ) : (
            <Avatar.Text
              size={56}
              label={pessoa?.substring(0, 1).toUpperCase() || 'U'}
            />
          )}
        </View>

        {/* INFO CENTRAL */}
        <View style={styles.infoContainer}>
          <Text style={styles.nomePessoa}>{pessoa}</Text>
          <View style={styles.servicoContainer}>
            <MaterialCommunityIcons
              name="briefcase"
              size={14}
              color="var(--color-text-secondary)"
            />
            <Text style={styles.servico}>{pedido.servico}</Text>
          </View>
          <View style={styles.horaContainer}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
              color="var(--color-primary)"
            />
            <Text style={styles.hora}>{pedido.hora}</Text>
            <Text style={styles.valor}>R$ {pedido.valor}</Text>
          </View>
        </View>

        {/* STATUS */}
        <View style={styles.statusContainer}>
          <StatusBadge status={pedido.status} tamanho="small" />
        </View>
      </View>

      {/* BOTÕES DE AÇÃO */}
      <View style={styles.actionsContainer}>
        {pedido.status === 'pendente' && (
          <>
            <Button
              mode="contained"
              size="small"
              onPress={onConfirmar}
              style={styles.buttonConfirm}
            >
              Confirmar
            </Button>
            <Button
              mode="outlined"
              size="small"
              onPress={onAdiar}
              style={styles.buttonAdiar}
            >
              Adiar
            </Button>
          </>
        )}

        {pedido.status === 'confirmado' && (
          <Button
            mode="outlined"
            size="small"
            onPress={onAdiar}
            style={styles.buttonAdiar}
          >
            Adiar
          </Button>
        )}

        {(pedido.status === 'pendente' ||
          pedido.status === 'confirmado') && (
          <Button
            mode="outlined"
            size="small"
            onPress={onCancelar}
            textColor="var(--color-error)"
            style={styles.buttonCancelar}
          >
            Cancelar
          </Button>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'var(--color-card-border)',
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nomePessoa: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  servicoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  servico: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  horaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hora: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontFamily: 'Inter',
  },
  valor: {
    fontSize: 12,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
    marginLeft: 'auto',
  },
  statusContainer: {
    marginLeft: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  buttonConfirm: {
    flex: 1,
    minWidth: 100,
  },
  buttonAdiar: {
    flex: 1,
    minWidth: 80,
  },
  buttonCancelar: {
    flex: 1,
    minWidth: 80,
    borderColor: 'var(--color-error)',
  },
});