import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ResultadosBuscaHeader({
  termoBusca,
  quantidadeResultados,
  tipoResultado,
  onTipoChange,
  filtrosAtivos,
  onAbrirFiltros,
}) {
  const tipos = [
    { id: 'todos', label: 'Todos' },
    { id: 'profissional', label: 'Profissionais' },
    { id: 'servico', label: 'Serviços' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.resultadoInfo}>
        <Text style={styles.quantidadeText}>
          {quantidadeResultados} resultado{quantidadeResultados !== 1 ? 's' : ''} para "{termoBusca}"
        </Text>
      </View>

      <View style={styles.toolsContainer}>
        {/* BOTÃO FILTROS */}
        <TouchableOpacity
          style={[
            styles.botaoFiltros,
            filtrosAtivos && styles.botaoFiltrosAtivo,
          ]}
          onPress={onAbrirFiltros}
        >
          <MaterialCommunityIcons
            name="tune"
            size={16}
            color={filtrosAtivos ? 'var(--color-primary)' : 'var(--color-text-secondary)'}
          />
          {filtrosAtivos && <View style={styles.badge} />}
        </TouchableOpacity>

        {/* TOGGLE TIPOS */}
        <View style={styles.tiposContainer}>
          {tipos.map((tipo) => (
            <TouchableOpacity
              key={tipo.id}
              style={[
                styles.tipoBotao,
                tipoResultado === tipo.id && styles.tipoBotaoAtivo,
              ]}
              onPress={() => onTipoChange(tipo.id)}
            >
              <Text
                style={[
                  styles.tipoText,
                  tipoResultado === tipo.id && styles.tipoTextAtivo,
                ]}
              >
                {tipo.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'var(--color-surface)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'var(--color-border)',
  },
  resultadoInfo: {
    marginBottom: 12,
  },
  quantidadeText: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
  toolsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  botaoFiltros: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'var(--color-secondary)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  botaoFiltrosAtivo: {
    backgroundColor: 'var(--color-bg-1)',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'var(--color-primary)',
  },
  tiposContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  tipoBotao: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'var(--color-secondary)',
  },
  tipoBotaoAtivo: {
    backgroundColor: 'var(--color-primary)',
  },
  tipoText: {
    fontSize: 11,
    color: 'var(--color-text)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  tipoTextAtivo: {
    color: 'var(--color-btn-primary-text)',
    fontWeight: '600',
  },
});