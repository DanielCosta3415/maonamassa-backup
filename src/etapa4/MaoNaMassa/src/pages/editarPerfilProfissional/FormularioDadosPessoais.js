import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

export default function FormularioDadosPessoais({
  dados,
  erros,
  onChange,
}) {
  const handleChange = (campo, valor) => {
    onChange({
      ...dados,
      [campo]: valor,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dados Pessoais</Text>

      {/* NOME */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome Completo *</Text>
        <TextInput
          style={[styles.input, erros.nome && styles.inputError]}
          placeholder="Digite seu nome"
          value={dados.nome}
          onChangeText={(val) => handleChange('nome', val)}
          maxLength={100}
        />
        {erros.nome && <Text style={styles.errorText}>{erros.nome}</Text>}
      </View>

      {/* EMAIL */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={[styles.input, erros.email && styles.inputError]}
          placeholder="seu@email.com"
          value={dados.email}
          onChangeText={(val) => handleChange('email', val)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {erros.email && <Text style={styles.errorText}>{erros.email}</Text>}
      </View>

      {/* TELEFONE */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Telefone *</Text>
        <TextInput
          style={[styles.input, erros.telefone && styles.inputError]}
          placeholder="(11) 99999-9999"
          value={dados.telefone}
          onChangeText={(val) => handleChange('telefone', val)}
          keyboardType="phone-pad"
        />
        {erros.telefone && <Text style={styles.errorText}>{erros.telefone}</Text>}
      </View>

      {/* BIO */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Bio/Descrição</Text>
          <Text style={styles.charCounter}>
            {dados.bio?.length || 0}/500
          </Text>
        </View>
        <TextInput
          style={[styles.input, styles.inputMultiline, erros.bio && styles.inputError]}
          placeholder="Descreva um pouco sobre você e sua experiência"
          value={dados.bio}
          onChangeText={(val) => handleChange('bio', val.substring(0, 500))}
          multiline
          numberOfLines={4}
        />
        {erros.bio && <Text style={styles.errorText}>{erros.bio}</Text>}
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
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
  charCounter: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
  input: {
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface)',
    fontFamily: 'Inter',
  },
  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 100,
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
});