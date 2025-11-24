import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CardServico({
  servico,
  onPress,
}) {
  const getIconPorCategoria = (categoria) => {
    const icons = {
      'encanador': 'pipe',
      'eletricista': 'lightning-bolt',
      'pedreiro': 'hammer',
      'pintor': 'palette',
      'marceneiro': 'hammer-wrench',
    };
    return icons[categoria?.toLowerCase()] || 'briefcase';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* ÍCONE CATEGORIA */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={getIconPorCategoria(servico.categoria)}
          size={28}
          color="var(--color-primary)"
        />
      </View>

      {/* INFO */}
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{servico.nome}</Text>
        
        {servico.descricao && (
          <Text style={styles.descricao} numberOfLines={2}>
            {servico.descricao}
          </Text>
        )}

        <View style={styles.footer}>
          <Text style={styles.categoria}>{servico.categoria}</Text>
          <Text style={styles.profissionais}>
            {servico.profissionais_disponiveis} profissionais
          </Text>
        </View>
      </View>

      {/* PREÇO */}
      <View style={styles.precoContainer}>
        <Text style={styles.preco}>
          R$ {servico.preco_medio}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="var(--color-text-secondary)"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'var(--color-card-border)',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'var(--color-bg-1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  descricao: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    marginBottom: 6,
    fontFamily: 'Inter',
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoria: {
    fontSize: 11,
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-text-secondary)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'Inter',
  },
  profissionais: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
  precoContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  preco: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontFamily: 'Inter',
  },
});