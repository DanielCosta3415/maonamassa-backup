import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalConfirmarAlteracoes({
  visivel,
  mudancas,
  carregando,
  onConfirmar,
  onCancelar,
}) {
  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={onCancelar}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* HEADER */}
            <View style={styles.header}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={32}
                color="var(--color-primary)"
              />
              <Text style={styles.titulo}>Revisar Mudanças</Text>
            </View>

            {/* MUDANÇAS */}
            <View style={styles.mudancasContainer}>
              <Text style={styles.mudancasTitle}>
                {mudancas.length} mudança{mudancas.length !== 1 ? 's' : ''} detectada{mudancas.length !== 1 ? 's' : ''}
              </Text>

              {mudancas.map((mudanca, idx) => (
                <View key={idx} style={styles.mudancaItem}>
                  <View style={styles.mudancaIcon}>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={16}
                      color="var(--color-primary)"
                    />
                  </View>
                  <Text style={styles.mudancaCampo}>{mudanca.campo}</Text>
                </View>
              ))}
            </View>

            {/* AVISO */}
            <View style={styles.avisoBox}>
              <MaterialCommunityIcons
                name="information"
                size={16}
                color="var(--color-warning)"
              />
              <Text style={styles.avisoText}>
                Certifique-se de que todas as informações estão corretas antes de salvar
              </Text>
            </View>
          </ScrollView>

          {/* BOTÕES */}
          <View style={styles.buttonsContainer}>
            <Button
              mode="outlined"
              onPress={onCancelar}
              disabled={carregando}
              style={styles.buttonCancelar}
            >
              Revisar
            </Button>
            <Button
              mode="contained"
              onPress={onConfirmar}
              loading={carregando}
              disabled={carregando}
              style={styles.buttonConfirmar}
            >
              Salvar Mudanças
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'var(--color-surface)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--color-text)',
    marginTop: 12,
    fontFamily: 'Inter',
  },
  mudancasContainer: {
    marginBottom: 20,
  },
  mudancasTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  mudancaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'var(--color-border)',
  },
  mudancaIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'var(--color-bg-1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mudancaCampo: {
    fontSize: 14,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  avisoBox: {
    flexDirection: 'row',
    backgroundColor: 'var(--color-bg-2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  avisoText: {
    fontSize: 12,
    color: 'var(--color-text)',
    marginLeft: 8,
    flex: 1,
    fontFamily: 'Inter',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonCancelar: {
    flex: 1,
  },
  buttonConfirmar: {
    flex: 1,
  },
});