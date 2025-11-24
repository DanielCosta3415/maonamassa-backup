import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function StatusBadge({ status, tamanho = 'medium' }) {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pendente':
        return {
          label: 'Pendente',
          color: 'var(--color-warning)',
          icon: 'clock-outline',
          bgColor: 'var(--color-bg-2)',
        };
      case 'confirmado':
        return {
          label: 'Confirmado',
          color: 'var(--color-primary)',
          icon: 'check-circle',
          bgColor: 'var(--color-bg-1)',
        };
      case 'concluído':
        return {
          label: 'Concluído',
          color: 'var(--color-success)',
          icon: 'check-all',
          bgColor: 'var(--color-bg-3)',
        };
      case 'cancelado':
        return {
          label: 'Cancelado',
          color: 'var(--color-error)',
          icon: 'close-circle',
          bgColor: 'var(--color-bg-4)',
        };
      default:
        return {
          label: 'Desconhecido',
          color: 'var(--color-info)',
          icon: 'help-circle',
          bgColor: 'var(--color-bg-5)',
        };
    }
  };

  const getTamanho = (tamanho) => {
    switch (tamanho) {
      case 'small':
        return { padding: 6, fontSize: 11, iconSize: 12 };
      case 'medium':
        return { padding: 8, fontSize: 13, iconSize: 14 };
      case 'large':
        return { padding: 12, fontSize: 14, iconSize: 16 };
      default:
        return { padding: 8, fontSize: 13, iconSize: 14 };
    }
  };

  const statusInfo = getStatusInfo(status);
  const sizeInfo = getTamanho(tamanho);

  return (
    <View
      style={[
        styles.badge,
        { paddingVertical: sizeInfo.padding, paddingHorizontal: sizeInfo.padding + 4 },
        { backgroundColor: statusInfo.bgColor },
      ]}
    >
      <MaterialCommunityIcons
        name={statusInfo.icon}
        size={sizeInfo.iconSize}
        color={statusInfo.color}
        style={{ marginRight: 4 }}
      />
      <Text
        style={[
          styles.label,
          { fontSize: sizeInfo.fontSize, color: statusInfo.color },
        ]}
      >
        {statusInfo.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  label: {
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});