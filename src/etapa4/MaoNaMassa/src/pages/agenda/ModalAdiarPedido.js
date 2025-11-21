import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/pt-br';

import BotaoSelecionarData from '../criarPedido/BotaoSelecionarData';
import ListaDeHorarios from '../criarPedido/ListaDeHorarios';

export default function ModalAdiarPedido({
  visivel,
  pedido,
  onClose,
  onConfirm,
}) {
  const [novaData, setNovaData] = useState(pedido?.data || '');
  const [novoHorario, setNovoHorario] = useState(pedido?.hora || '');
  const [enviando, setEnviando] = useState(false);
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    if (visivel && novaData) {
      // Carrega horários disponíveis para a data selecionada
      carregarHorarios(novaData);
    }
  }, [novaData, visivel]);

  const carregarHorarios = async () => {
    // Simula carregamento - substituir com chamada real à API
    const horariosSimulados = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
    ];
    setHorarios(horariosSimulados);
    setNovoHorario('');
  };

  const handleConfirm = async () => {
    // Validações
    if (!novaData) {
      Alert.alert('Erro', 'Selecione uma data');
      return;
    }

    if (!novoHorario) {
      Alert.alert('Erro', 'Selecione um horário');
      return;
    }

    if (
      novaData === pedido?.data &&
      novoHorario === pedido?.hora
    ) {
      Alert.alert('Erro', 'Selecione uma data/hora diferente');
      return;
    }

    const dataAtual = moment();
    const dataSelecionada = moment(novaData, 'YYYY-MM-DD');

    if (dataSelecionada.isBefore(dataAtual, 'day')) {
      Alert.alert('Erro', 'Não pode adiar para data no passado');
      return;
    }

    setEnviando(true);
    try {
      await onConfirm(novaData, novoHorario);
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
            {/* HEADER */}
            <Text style={styles.titulo}>Adiar Pedido</Text>

            {/* INFO ATUAL */}
            <View style={styles.infoAtual}>
              <Text style={styles.label}>Agendamento atual:</Text>
              <Text style={styles.valor}>
                {moment(pedido?.data, 'YYYY-MM-DD')
                  .locale('pt-br')
                  .format('DD/MM/YYYY')} às {pedido?.hora}
              </Text>
            </View>

            {/* SELEÇÃO DE DATA */}
            <View style={styles.section}>
              <Text style={styles.label}>Nova data:</Text>
              <BotaoSelecionarData
                dataSelecionada={novaData}
                onDateSelect={setNovaData}
              />
            </View>

            {/* SELEÇÃO DE HORÁRIO */}
            {novaData && (
              <View style={styles.section}>
                <Text style={styles.label}>Novo horário:</Text>
                <ListaDeHorarios
                  horarios={horarios}
                  horarioSelecionado={novoHorario}
                  onSelectHorario={setNovoHorario}
                  dataSelecionada={novaData}
                />
              </View>
            )}

            {/* BOTÕES */}
            <View style={styles.buttonsContainer}>
              <Button
                mode="outlined"
                onPress={onClose}
                disabled={enviando}
                style={styles.buttonCancel}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={handleConfirm}
                loading={enviando}
                disabled={enviando || !novaData || !novoHorario}
                style={styles.buttonConfirm}
              >
                Confirmar
              </Button>
            </View>
          </ScrollView>
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
  content: {
    flexGrow: 0,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--color-text)',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  infoAtual: {
    backgroundColor: 'var(--color-bg-1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  valor: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontFamily: 'Inter',
  },
  section: {
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  buttonCancel: {
    flex: 1,
  },
  buttonConfirm: {
    flex: 1,
  },
});