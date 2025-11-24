import React from 'react';
import {
  View,
  StyleSheet,
  useSafeAreaInsets,
} from 'react-native';
import { Button } from 'react-native-paper';

export default function BottomActionBar({
  salvando,
  temMudancas,
  onSalvar,
  onCancelar,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Button
        mode="outlined"
        onPress={onCancelar}
        disabled={salvando}
        style={styles.buttonCancelar}
      >
        Cancelar
      </Button>
      <Button
        mode="contained"
        onPress={onSalvar}
        loading={salvando}
        disabled={salvando || !temMudancas}
        style={styles.buttonSalvar}
      >
        Salvar Mudanças
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'var(--color-surface)',
    borderTopWidth: 1,
    borderTopColor: 'var(--color-border)',
  },
  buttonCancelar: {
    flex: 1,
  },
  buttonSalvar: {
    flex: 1,
  },
});