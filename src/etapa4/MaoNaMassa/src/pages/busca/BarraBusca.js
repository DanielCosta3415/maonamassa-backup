import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BarraBusca({
  inputRef,
  termo,
  onTermoChange,
  onLimpar,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color="var(--color-text-secondary)"
          style={styles.iconLupa}
        />

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Buscar profissionais, serviços..."
          placeholderTextColor="var(--color-text-secondary)"
          value={termo}
          onChangeText={onTermoChange}
          returnKeyType="search"
          maxLength={50}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {termo.length > 0 && (
          <TouchableOpacity onPress={onLimpar} style={styles.buttonLimpar}>
            <MaterialCommunityIcons
              name="close"
              size={20}
              color="var(--color-text-secondary)"
            />
          </TouchableOpacity>
        )}
      </View>

      {termo.length > 0 && termo.length < 3 && (
        <View style={styles.contadorContainer}>
          <Text style={styles.contadorText}>
            {50 - termo.length} caracteres restantes
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    paddingHorizontal: 12,
    height: 48,
  },
  iconLupa: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  buttonLimpar: {
    padding: 4,
    marginLeft: 8,
  },
  contadorContainer: {
    marginTop: 4,
  },
  contadorText: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
});