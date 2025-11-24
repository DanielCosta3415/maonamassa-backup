import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';

const ESTADOS = [
  { label: 'Acre', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espírito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
];

export default function FormularioLocalizacao({
  localizacao,
  erros,
  onChange,
}) {
  const [buscandoCEP, setBuscandoCEP] = useState(false);
  const [validandoCEP, setValidandoCEP] = useState(false);

  const handleChange = (campo, valor) => {
    onChange({
      ...localizacao,
      [campo]: valor,
    });
  };

  const validarCEP = (cep) => {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Valida formato (deve ter 8 dígitos)
    if (cepLimpo.length !== 8) {
      return false;
    }
    
    return true;
  };

  const buscarCEP = async (cep) => {
    try {
      if (!validarCEP(cep)) {
        return;
      }

      setBuscandoCEP(true);
      setValidandoCEP(true);
      const cepLimpo = cep.replace(/\D/g, '');

      // Chama API ViaCEP
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const dados = await response.json();

      if (dados.erro) {
        Toast.show({
          type: 'error',
          text1: 'CEP não encontrado',
          text2: 'Verifique o CEP e tente novamente',
        });
        setValidandoCEP(false);
        return;
      }

      // Atualiza formulário com dados do ViaCEP
      onChange({
        ...localizacao,
        cep: `${cepLimpo.substring(0, 5)}-${cepLimpo.substring(5)}`,
        endereco: dados.logradouro,
        cidade: dados.localidade,
        estado: dados.uf,
        complemento: dados.complemento || localizacao.complemento,
      });

      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Endereço preenchido automaticamente',
      });

      setValidandoCEP(false);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao buscar CEP',
      });
      setValidandoCEP(false);
    } finally {
      setBuscandoCEP(false);
    }
  };

  const formatarCEP = (cep) => {
    // Remove tudo que não é número
    const cepLimpo = cep.replace(/\D/g, '').substring(0, 8);
    
    // Formata como XXXXX-XXX
    if (cepLimpo.length > 5) {
      return `${cepLimpo.substring(0, 5)}-${cepLimpo.substring(5)}`;
    }
    return cepLimpo;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Localização *</Text>

      {/* CEP */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>CEP *</Text>
        <View style={styles.cepInputContainer}>
          <TextInput
            style={[
              styles.input,
              styles.cepInput,
              erros.cep && styles.inputError,
              validandoCEP && styles.inputDisabled,
            ]}
            placeholder="00000-000"
            value={localizacao.cep}
            onChangeText={(val) => {
              const formatted = formatarCEP(val);
              handleChange('cep', formatted);
            }}
            onBlur={() => {
              if (localizacao.cep && validarCEP(localizacao.cep)) {
                buscarCEP(localizacao.cep);
              }
            }}
            editable={!validandoCEP && !buscandoCEP}
            maxLength={9}
            keyboardType="decimal-pad"
          />
          {validandoCEP && (
            <ActivityIndicator
              size="small"
              color="var(--color-primary)"
              style={styles.loadingIcon}
            />
          )}
        </View>
        {erros.cep && <Text style={styles.errorText}>{erros.cep}</Text>}
        <Text style={styles.helperText}>
          Ex: 01310-100
        </Text>
      </View>

      {/* ENDEREÇO */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Endereço *</Text>
        <TextInput
          style={[
            styles.input,
            erros.endereco && styles.inputError,
            !localizacao.cep && styles.inputDisabled,
          ]}
          placeholder="Rua, avenida, etc"
          value={localizacao.endereco}
          onChangeText={(val) => handleChange('endereco', val)}
          editable={!!localizacao.cep}
        />
        {erros.endereco && (
          <Text style={styles.errorText}>{erros.endereco}</Text>
        )}
      </View>

      {/* NÚMERO E COMPLEMENTO */}
      <View style={styles.rowContainer}>
        <View style={[styles.fieldContainer, styles.flex1]}>
          <Text style={styles.label}>Número *</Text>
          <TextInput
            style={[styles.input, erros.numero && styles.inputError]}
            placeholder="123"
            value={localizacao.numero}
            onChangeText={(val) => handleChange('numero', val)}
            keyboardType="number-pad"
          />
          {erros.numero && (
            <Text style={styles.errorText}>{erros.numero}</Text>
          )}
        </View>

        <View style={[styles.fieldContainer, styles.flex1]}>
          <Text style={styles.label}>Complemento</Text>
          <TextInput
            style={styles.input}
            placeholder="Apto, sala..."
            value={localizacao.complemento}
            onChangeText={(val) => handleChange('complemento', val)}
          />
        </View>
      </View>

      {/* CIDADE */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Cidade *</Text>
        <TextInput
          style={[
            styles.input,
            erros.cidade && styles.inputError,
            !localizacao.cep && styles.inputDisabled,
          ]}
          placeholder="São Paulo"
          value={localizacao.cidade}
          onChangeText={(val) => handleChange('cidade', val)}
          editable={!!localizacao.cep}
        />
        {erros.cidade && (
          <Text style={styles.errorText}>{erros.cidade}</Text>
        )}
      </View>

      {/* ESTADO */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Estado *</Text>
        <View style={[
          styles.pickerContainer,
          erros.estado && styles.pickerContainerError,
          !localizacao.cep && styles.pickerContainerDisabled,
        ]}>
          <RNPickerSelect
            onValueChange={(value) => handleChange('estado', value)}
            items={ESTADOS}
            value={localizacao.estado}
            placeholder={{ label: 'Selecionar estado...', value: null }}
            style={{
              inputIOS: styles.pickerInputIOS,
              inputAndroid: styles.pickerInputAndroid,
              iconContainer: styles.iconContainer,
            }}
            Icon={() => (
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color="var(--color-text-secondary)"
                style={styles.pickerIcon}
              />
            )}
            disabled={!localizacao.cep}
          />
        </View>
        {erros.estado && (
          <Text style={styles.errorText}>{erros.estado}</Text>
        )}
      </View>

      {/* INFO BOX */}
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="map-marker-radius"
          size={16}
          color="var(--color-primary)"
        />
        <Text style={styles.infoText}>
          Insira o CEP para preencher endereço automaticamente
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
  input: {
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-background)',
    fontFamily: 'Inter',
  },
  inputError: {
    borderColor: 'var(--color-error)',
  },
  inputDisabled: {
    backgroundColor: 'var(--color-secondary)',
    opacity: 0.6,
  },
  cepInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cepInput: {
    flex: 1,
  },
  loadingIcon: {
    marginRight: 8,
    marginTop: 8,
  },
  helperText: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    marginTop: 4,
    fontFamily: 'Inter',
    fontStyle: 'italic',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    borderRadius: 8,
    backgroundColor: 'var(--color-background)',
    overflow: 'hidden',
  },
  pickerContainerError: {
    borderColor: 'var(--color-error)',
  },
  pickerContainerDisabled: {
    backgroundColor: 'var(--color-secondary)',
    opacity: 0.6,
  },
  pickerInputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: 'var(--color-text)',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  pickerInputAndroid: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: 'var(--color-text)',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
  pickerIcon: {
    marginRight: 8,
  },
  errorText: {
    fontSize: 11,
    color: 'var(--color-error)',
    marginTop: 4,
    fontFamily: 'Inter',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--color-bg-1)',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: 'var(--color-text)',
    flex: 1,
    fontFamily: 'Inter',
  },
});
