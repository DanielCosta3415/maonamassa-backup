import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  AsyncStorage,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Appbar } from 'react-native-paper';

import AgendaHeader from './AgendaHeader';
import CalendarioAgenda from './CalendarioAgenda';
import ListaPedidosAgenda from './ListaPedidosAgenda';
import ModalAdiarPedido from './ModalAdiarPedido';
import ModalCancelarPedido from './ModalCancelarPedido';

export default function Agenda({ navigation, route }) {
  // ============= ESTADOS =============
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split('T')
  );
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [carregando, setCarregando] = useState(true);
  const [recarregando, setRecarregando] = useState(false);
  
  // Estados de Modal
  const [modalAdiarVisivel, setModalAdiarVisivel] = useState(false);
  const [modalCancelarVisivel, setModalCancelarVisivel] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // ============= EFEITOS =============
  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      carregarPedidos();
    }, [usuario])
  );

  // ============= FUNÇÕES DE CARREGAMENTO =============
  const carregarDadosIniciais = async () => {
    try {
      setCarregando(true);
      
      // Carrega usuário do AsyncStorage
      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      if (usuarioStorage) {
        const usuarioObj = JSON.parse(usuarioStorage);
        setUsuario(usuarioObj);
        await carregarPedidos();
      } else {
        // Se não encontrar usuário, redireciona para login
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Usuário não autenticado',
        });
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao carregar dados',
      });
    } finally {
      setCarregando(false);
    }
  };

  const carregarPedidos = async () => {
    try {
      if (!usuario) return;

      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);
      const tipo_usuario = usuarioObj.tipo; // 'profissional' ou 'cliente'
      const id_usuario = usuarioObj.id;

      // Endpoint diferente baseado no tipo de usuário
      const endpoint =
        tipo_usuario === 'profissional'
          ? `https://sua-api.com/professionals/${id_usuario}/requests`
          : `https://sua-api.com/clients/${id_usuario}/requests`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuarioObj.token}`,
        },
      });

      if (response.ok) {
        const dados = await response.json();
        // Filtra apenas pedidos não concluídos/não cancelados
        const pedidosFiltrados = dados.filter(
          (p) => p.status !== 'concluído' && p.status !== 'cancelado'
        );
        setPedidos(pedidosFiltrados);
      } else {
        throw new Error('Falha ao buscar pedidos');
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao carregar agenda',
      });
    }
  };

  // ============= FUNÇÕES DE AÇÃO =============
  const handleAdiarPedido = async (novaData, novoHorario) => {
    try {
      if (!pedidoSelecionado) return;

      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);

      const response = await fetch(
        `https://sua-api.com/requests/${pedidoSelecionado.id}/reschedule`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuarioObj.token}`,
          },
          body: JSON.stringify({
            nova_data: novaData,
            novo_horario: novoHorario,
          }),
        }
      );

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Pedido adiado com sucesso',
        });
        setModalAdiarVisivel(false);
        setPedidoSelecionado(null);
        carregarPedidos();
      } else {
        throw new Error('Falha ao adiar pedido');
      }
    } catch (error) {
      console.error('Erro ao adiar pedido:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao adiar pedido',
      });
    }
  };

  const handleCancelarPedido = async (motivo) => {
    try {
      if (!pedidoSelecionado) return;

      Alert.alert(
        'Confirmar cancelamento',
        `Deseja cancelar este pedido? Motivo: ${motivo || 'Não especificado'}`,
        [
          { text: 'Não', onPress: () => {}, style: 'cancel' },
          {
            text: 'Sim, cancelar',
            onPress: async () => {
              const usuarioStorage = await AsyncStorage.getItem(
                'usuario_logado'
              );
              const usuarioObj = JSON.parse(usuarioStorage);

              const response = await fetch(
                `https://sua-api.com/requests/${pedidoSelecionado.id}/cancel`,
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuarioObj.token}`,
                  },
                  body: JSON.stringify({ motivo_cancelamento: motivo }),
                }
              );

              if (response.ok) {
                Toast.show({
                  type: 'success',
                  text1: 'Sucesso',
                  text2: 'Pedido cancelado',
                });
                setModalCancelarVisivel(false);
                setPedidoSelecionado(null);
                carregarPedidos();
              } else {
                throw new Error('Falha ao cancelar');
              }
            },
            style: 'destructive',
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao cancelar pedido',
      });
    }
  };

  const handleConfirmarPedido = async (pedidoId) => {
    try {
      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);

      const response = await fetch(
        `https://sua-api.com/requests/${pedidoId}/confirm`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuarioObj.token}`,
          },
        }
      );

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Pedido confirmado',
        });
        carregarPedidos();
      } else {
        throw new Error('Falha ao confirmar');
      }
    } catch (error) {
      console.error('Erro ao confirmar pedido:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao confirmar pedido',
      });
    }
  };

  // ============= RENDERIZAÇÃO =============
  if (carregando) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Agenda" />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="var(--color-primary)"
          />
        </View>
      </View>
    );
  }

  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtroStatus === 'todos') return true;
    return p.status === filtroStatus;
  });

  const pedidosDoDia = pedidosFiltrados.filter((p) => p.data === dataSelecionada);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Agenda" />
      </Appbar.Header>

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={recarregando}
            onRefresh={async () => {
              setRecarregando(true);
              await carregarPedidos();
              setRecarregando(false);
            }}
          />
        }
      >
        {/* HEADER COM FILTROS */}
        <AgendaHeader
          usuario={usuario}
          filtroAtivo={filtroStatus}
          onFiltroChange={setFiltroStatus}
          onVoltar={() => navigation.goBack()}
        />

        {/* CALENDÁRIO */}
        <CalendarioAgenda
          pedidos={pedidosFiltrados}
          dataSelecionada={dataSelecionada}
          onSelectData={setDataSelecionada}
        />

        {/* LISTA DE PEDIDOS */}
        <ListaPedidosAgenda
          pedidos={pedidosDoDia}
          dataSelecionada={dataSelecionada}
          carregando={carregando}
          onSelectPedido={(pedido) => {
            navigation.navigate('DetalhePedido', { pedido });
          }}
          onAdiar={(pedido) => {
            setPedidoSelecionado(pedido);
            setModalAdiarVisivel(true);
          }}
          onCancelar={(pedido) => {
            setPedidoSelecionado(pedido);
            setModalCancelarVisivel(true);
          }}
          onConfirmar={handleConfirmarPedido}
        />
      </ScrollView>

      {/* MODAIS */}
      {pedidoSelecionado && (
        <>
          <ModalAdiarPedido
            visivel={modalAdiarVisivel}
            pedido={pedidoSelecionado}
            onClose={() => {
              setModalAdiarVisivel(false);
              setPedidoSelecionado(null);
            }}
            onConfirm={handleAdiarPedido}
          />

          <ModalCancelarPedido
            visivel={modalCancelarVisivel}
            pedido={pedidoSelecionado}
            onClose={() => {
              setModalCancelarVisivel(false);
              setPedidoSelecionado(null);
            }}
            onConfirm={handleCancelarPedido}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'var(--color-background)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
