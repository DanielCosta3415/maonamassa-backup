import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

export default function FormularioPrecos({
  precos,
  erros,
  onChange,
}) {
  const handleChange = (campo, valor) => {
    // Remove caracteres não numéricos
    const numerico = valor.replace(/[^\d.]/g, '');
    onChange({
      ...precos,
      [campo]: parseFloat(numerico) || 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Preços *</Text>

      {/* PREÇO POR HORA */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Preço por Hora (R$) *</Text>
        <View style={styles.inputPrefixContainer}>
          <Text style={styles.prefix}>R$</Text>
          <TextInput
            style={[styles.input, erros.preco_hora && styles.inputError]}
            placeholder="0.00"
            value={precos.preco_hora?.toString() || ''}
            onChangeText={(val) => handleChange('preco_hora', val)}
            keyboardType="decimal-pad"
          />
        </View>
        {erros.preco_hora && (
          <Text style={styles.errorText}>{erros.preco_hora}</Text>
        )}
      </View>

      {/* PREÇO POR SERVIÇO */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Preço por Serviço (R$) *</Text>
        <View style={styles.inputPrefixContainer}>
          <Text style={styles.prefix}>R$</Text>
          <TextInput
            style={[styles.input, erros.preco_servico && styles.inputError]}
            placeholder="0.00"
            value={precos.preco_servico?.toString() || ''}
            onChangeText={(val) => handleChange('preco_servico', val)}
            keyboardType="decimal-pad"
          />
        </View>
        {erros.preco_servico && (
          <Text style={styles.errorText}>{erros.preco_servico}</Text>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Defina preços competitivos baseado em sua experiência e localização
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  inputPrefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    borderRadius: 8,
    paddingLeft: 12,
    backgroundColor: 'var(--color-surface)',
  },
  prefix: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  inputError: {
    borderColor: 'var(--color-error)',
  },
  errorText: {
    fontSize: 11,
    color: 'var(--color-error)',
    marginTop: 4,
    fontFamily: 'Inter',
  },
  infoBox: {
    backgroundColor: 'var(--color-bg-1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
});