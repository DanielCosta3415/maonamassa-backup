import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalCancelarPedido({
  visivel,
  pedido,
  onClose,
  onConfirm,
}) {
  const [motivo, setMotivo] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleConfirm = () => {
    Alert.alert(
      'Confirmar Cancelamento',
      'Tem certeza que deseja cancelar este pedido? Esta ação é irreversível.',
      [
        { text: 'Não', onPress: () => {}, style: 'cancel' },
        {
          text: 'Sim, cancelar',
          onPress: async () => {
            await cancelarPedido();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const cancelarPedido = async () => {
    try {
      setEnviando(true);

      // Validação de motivo (mínimo 10 caracteres recomendado)
      if (motivo.trim().length < 5) {
        Toast.show({
          type: 'info',
          text1: 'Atenção',
          text2: 'Informe um motivo mais descritivo',
        });
        setEnviando(false);
        return;
      }

      // Carrega usuário e token
      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      if (!usuarioStorage) {
        throw new Error('Usuário não autenticado');
      }

      const usuarioObj = JSON.parse(usuarioStorage);

      // Faz chamada à API para cancelar pedido
      const response = await fetch(
        `https://sua-api.com/api/requests/${pedido.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuarioObj.token}`,
          },
          body: JSON.stringify({
            status: 'cancelado',
            motivo_cancelamento: motivo.trim(),
            cancelado_em: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        const dados = await response.json();

        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Pedido cancelado com sucesso',
        });

        // Limpa modal
        setMotivo('');
        
        // Chama callback de confirmação
        if (onConfirm) {
          onConfirm(dados);
        }

        // Fecha modal
        onClose();
      } else if (response.status === 400) {
        const erro = await response.json();
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: erro.erro || 'Não é possível cancelar este pedido',
        });
      } else if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Pedido não encontrado',
        });
      } else {
        throw new Error('Erro ao cancelar pedido');
      }
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message || 'Falha ao cancelar pedido',
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}
          >
            {/* HEADER COM AVISO */}
            <View style={styles.warningBox}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={32}
                color="var(--color-warning)"
              />
              <Text style={styles.warningTitle}>
                Cancelar Pedido
              </Text>
              <Text style={styles.warningText}>
                Você está prestes a cancelar um pedido. Esta ação é irreversível.
              </Text>
            </View>

            {/* INFO DO PEDIDO */}
            <View style={styles.pedidoInfo}>
              <Text style={styles.sectionLabel}>Pedido a cancelar:</Text>
              <View style={styles.pedidoDetails}>
                <View style={styles.pedidoRow}>
                  <Text style={styles.pedidoLabel}>ID:</Text>
                  <Text style={styles.pedidoValue}>
                    {pedido?.id?.substring(0, 8)}...
                  </Text>
                </View>
                <View style={styles.pedidoRow}>
                  <Text style={styles.pedidoLabel}>Status:</Text>
                  <Text style={styles.pedidoValue}>
                    {pedido?.status?.toUpperCase()}
                  </Text>
                </View>
                {pedido?.data_agendada && (
                  <View style={styles.pedidoRow}>
                    <Text style={styles.pedidoLabel}>Data/Hora:</Text>
                    <Text style={styles.pedidoValue}>
                      {new Date(pedido.data_agendada).toLocaleDateString('pt-BR')} 
                      {' às '} 
                      {pedido?.horario_inicio}
                    </Text>
                  </View>
                )}
                {pedido?.preco_total && (
                  <View style={styles.pedidoRow}>
                    <Text style={styles.pedidoLabel}>Valor:</Text>
                    <Text style={styles.pedidoValue}>
                      R$ {pedido?.preco_total?.toFixed(2)}
                    </Text>
                  </View>
                )}
                {pedido?.descricao && (
                  <View style={styles.pedidoRow}>
                    <Text style={styles.pedidoLabel}>Descrição:</Text>
                    <Text style={[styles.pedidoValue, styles.descricaoText]}>
                      {pedido?.descricao}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* MOTIVO */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>
                Motivo do cancelamento *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  enviando && styles.inputDisabled,
                ]}
                placeholder="Descreva o motivo do cancelamento..."
                placeholderTextColor="var(--color-text-secondary)"
                value={motivo}
                onChangeText={setMotivo}
                multiline
                numberOfLines={4}
                editable={!enviando}
                maxLength={500}
              />
              <Text style={styles.charCounter}>
                {motivo.length}/500
              </Text>
            </View>

            {/* AVISO IMPORTANTE */}
            <View style={styles.avisoBox}>
              <MaterialCommunityIcons
                name="information"
                size={16}
                color="var(--color-warning)"
              />
              <Text style={styles.avisoText}>
                O profissional receberá notificação sobre o cancelamento
              </Text>
            </View>
          </ScrollView>

          {/* BOTÕES */}
          <View style={styles.buttonsContainer}>
            <Button
              mode="outlined"
              onPress={onClose}
              disabled={enviando}
              style={styles.buttonVoltar}
            >
              Voltar
            </Button>
            <Button
              mode="contained"
              onPress={handleConfirm}
              loading={enviando}
              disabled={enviando || motivo.trim().length < 5}
              style={styles.buttonCancelar}
              buttonColor="var(--color-error)"
              textColor="white"
            >
              Cancelar Pedido
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
    maxHeight: '85%',
  },
  content: {
    flexGrow: 0,
  },
  warningBox: {
    backgroundColor: 'var(--color-bg-2)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'var(--color-text)',
    marginTop: 12,
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  warningText: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  pedidoInfo: {
    marginBottom: 16,
  },
  pedidoDetails: {
    backgroundColor: 'var(--color-secondary)',
    borderRadius: 8,
    padding: 12,
  },
  pedidoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pedidoLabel: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  pedidoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--color-text)',
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'right',
  },
  descricaoText: {
    textAlign: 'left',
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
    backgroundColor: 'var(--color-background)',
    textAlignVertical: 'top',
  },
  inputDisabled: {
    opacity: 0.6,
  },
  charCounter: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    marginTop: 4,
    textAlign: 'right',
    fontFamily: 'Inter',
  },
  avisoBox: {
    flexDirection: 'row',
    backgroundColor: 'var(--color-bg-2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  avisoText: {
    fontSize: 12,
    color: 'var(--color-text)',
    flex: 1,
    fontFamily: 'Inter',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  buttonVoltar: {
    flex: 1,
  },
  buttonCancelar: {
    flex: 1,
  },
});
