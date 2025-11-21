import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  AsyncStorage,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Appbar } from 'react-native-paper';

import BarraBusca from './BarraBusca';
import FiltrosBusca from './FiltrosBusca';
import ResultadosBusca from './ResultadosBusca';
import HistoricoBuscas from './HistoricoBuscas';
import SugestoesBusca from './SugestoesBusca';
import EmptySearchState from './EmptySearchState';
import ResultadosBuscaHeader from './ResultadosBuscaHeader';

export default function Busca({ navigation, route }) {
  // ============= ESTADOS =============
  const [usuario, setUsuario] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: null,
    precoMin: 0,
    precoMax: 999,
    avaliacaoMin: 0,
  });
  const [carregando, setCarregando] = useState(false);
  const [recarregando, setRecarregando] = useState(false);
  const [paginacao, setPaginacao] = useState({ pagina: 1, total: 0 });
  const [filtrosAtivos, setFiltrosAtivos] = useState(false);
  
  // Estados de Modal/UI
  const [modalFiltrosVisivel, setModalFiltrosVisivel] = useState(false);
  const [tipoResultado, setTipoResultado] = useState('todos');
  
  // Refs para debounce
  const debounceTimer = useRef(null);
  const inputRef = useRef(null);

  // ============= EFEITOS =============
  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 100);
      }
    }, [])
  );

  // Debounce para busca
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (termoBusca.length >= 3) {
      debounceTimer.current = setTimeout(() => {
        buscar(termoBusca);
        carregarSugestoes(termoBusca);
      }, 300);
    } else if (termoBusca.length === 0) {
      setSugestoes([]);
      setResultados([]);
      setPaginacao({ pagina: 1, total: 0 });
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [termoBusca]);

  // ============= FUNÇÕES DE CARREGAMENTO =============
  const carregarDadosIniciais = async () => {
    try {
      // Carrega usuário do AsyncStorage
      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      if (usuarioStorage) {
        const usuarioObj = JSON.parse(usuarioStorage);
        setUsuario(usuarioObj);
      }

      // Carrega histórico
      const historicoStorage = await AsyncStorage.getItem('historico_buscas');
      if (historicoStorage) {
        setHistorico(JSON.parse(historicoStorage));
      }
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
    }
  };

  const buscar = async (termo, pagina = 1) => {
    try {
      if (!usuario) return;

      setCarregando(true);
      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);

      // Constrói query params
      const params = new URLSearchParams({
        q: termo,
        tipo: tipoResultado,
        page: pagina,
        limit: 10,
        ...(filtros.categoria && { categoria: filtros.categoria }),
        ...(filtros.precoMin > 0 && { precoMin: filtros.precoMin }),
        ...(filtros.precoMax < 999 && { precoMax: filtros.precoMax }),
        ...(filtros.avaliacaoMin > 0 && { avaliacaoMin: filtros.avaliacaoMin }),
      });

      const response = await fetch(
        `https://sua-api.com/search?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuarioObj.token}`,
          },
        }
      );

      if (response.ok) {
        const dados = await response.json();
        
        if (pagina === 1) {
          setResultados(dados.results || []);
        } else {
          setResultados(prev => [...prev, ...(dados.results || [])]);
        }
        
        setPaginacao({
          pagina: dados.page || pagina,
          total: dados.total || 0,
        });

        // Adiciona ao histórico
        if (pagina === 1) {
          adicionarAoHistorico(termo, dados.total || 0);
        }
      } else {
        throw new Error('Falha ao buscar');
      }
    } catch (error) {
      console.error('Erro ao buscar:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao realizar busca',
      });
    } finally {
      setCarregando(false);
    }
  };

  const carregarSugestoes = async (termo) => {
    try {
      if (termo.length < 3) {
        setSugestoes([]);
        return;
      }

      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);

      const response = await fetch(
        `https://sua-api.com/search/suggestions?q=${termo}&limit=5`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuarioObj.token}`,
          },
        }
      );

      if (response.ok) {
        const dados = await response.json();
        setSugestoes(dados.suggestions || []);
      }
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error);
    }
  };

  const adicionarAoHistorico = async (termo, resultados_encontrados) => {
    try {
      const novoItem = {
        id: Date.now().toString(),
        termo,
        data: new Date().toISOString(),
        resultados_encontrados,
      };

      const novoHistorico = [novoItem, ...historico].slice(0, 10);
      setHistorico(novoHistorico);
      await AsyncStorage.setItem(
        'historico_buscas',
        JSON.stringify(novoHistorico)
      );
    } catch (error) {
      console.error('Erro ao adicionar ao histórico:', error);
    }
  };

  const limparHistorico = async () => {
    Alert.alert(
      'Confirmar',
      'Deseja limpar todo o histórico de buscas?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, limpar',
          onPress: async () => {
            try {
              setHistorico([]);
              await AsyncStorage.removeItem('historico_buscas');
              Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Histórico limpo',
              });
            } catch (error) {
              console.error('Erro ao limpar histórico:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const aplicarFiltros = (novosFiltros) => {
    setFiltros(novosFiltros);
    setFiltrosAtivos(
      novosFiltros.categoria !== null ||
      novosFiltros.precoMin > 0 ||
      novosFiltros.precoMax < 999 ||
      novosFiltros.avaliacaoMin > 0
    );
    setModalFiltrosVisivel(false);
    setPaginacao({ pagina: 1, total: 0 });
    buscar(termoBusca, 1);
  };

  const limparFiltros = () => {
    const filtrosPadrao = {
      categoria: null,
      precoMin: 0,
      precoMax: 999,
      avaliacaoMin: 0,
    };
    setFiltros(filtrosPadrao);
    setFiltrosAtivos(false);
    setPaginacao({ pagina: 1, total: 0 });
    buscar(termoBusca, 1);
  };

  // ============= RENDERIZAÇÃO =============
  const mostraHistorico = termoBusca.length < 3 && resultados.length === 0;
  const mostraResultados = termoBusca.length >= 3 && resultados.length > 0;
  const mostraEmpty = termoBusca.length >= 3 && resultados.length === 0 && !carregando;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Buscar" />
      </Appbar.Header>

      {mostraHistorico ? (
        // TELA INICIAL: HISTÓRICO + SUGESTÕES
        <ScrollView style={styles.content}>
          <BarraBusca
            inputRef={inputRef}
            termo={termoBusca}
            onTermoChange={setTermoBusca}
            onLimpar={() => setTermoBusca('')}
          />

          {sugestoes.length > 0 && (
            <SugestoesBusca
              termo={termoBusca}
              sugestoes={sugestoes}
              onSelectSugestao={(sugestao) => {
                setTermoBusca(sugestao.nome);
              }}
            />
          )}

          {historico.length > 0 && (
            <HistoricoBuscas
              historico={historico}
              onSelectBusca={(termo) => setTermoBusca(termo)}
              onRemoverBusca={(id) => {
                setHistorico(
                  historico.filter((h) => h.id !== id)
                );
              }}
              onLimpar={limparHistorico}
            />
          )}
        </ScrollView>
      ) : mostraResultados ? (
        // TELA DE RESULTADOS
        <View style={styles.container}>
          <ResultadosBuscaHeader
            termoBusca={termoBusca}
            quantidadeResultados={paginacao.total}
            tipoResultado={tipoResultado}
            onTipoChange={(tipo) => {
              setTipoResultado(tipo);
              setPaginacao({ pagina: 1, total: 0 });
              buscar(termoBusca, 1);
            }}
            filtrosAtivos={filtrosAtivos}
            onAbrirFiltros={() => setModalFiltrosVisivel(true)}
          />

          <BarraBusca
            inputRef={inputRef}
            termo={termoBusca}
            onTermoChange={setTermoBusca}
            onLimpar={() => setTermoBusca('')}
          />

          <ResultadosBusca
            resultados={resultados}
            tipo={tipoResultado}
            carregando={carregando}
            onSelectItem={(item) => {
              if (item.tipo === 'profissional') {
                navigation.navigate('PerfilProfissional', { profissional: item });
              } else {
                navigation.navigate('DetalhesServico', { servico: item });
              }
            }}
            onCarregarMais={() => {
              buscar(termoBusca, paginacao.pagina + 1);
            }}
            temMais={resultados.length < paginacao.total}
          />
        </View>
      ) : mostraEmpty ? (
        // TELA VAZIA
        <EmptySearchState
          termo={termoBusca}
          tipo={tipoResultado}
          filtrosAtivos={filtrosAtivos}
          onFazerNovaBusca={() => setTermoBusca('')}
          onLimparFiltros={limparFiltros}
        />
      ) : (
        // TELA DE LOADING
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="var(--color-primary)"
          />
        </View>
      )}

      {/* MODAL DE FILTROS */}
      <FiltrosBusca
        visivel={modalFiltrosVisivel}
        filtrosAtivos={filtros}
        onClose={() => setModalFiltrosVisivel(false)}
        onAplicar={aplicarFiltros}
        onLimpar={limparFiltros}
      />
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
