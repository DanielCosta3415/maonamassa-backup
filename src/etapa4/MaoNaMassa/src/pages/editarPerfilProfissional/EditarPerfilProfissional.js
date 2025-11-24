import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Appbar } from 'react-native-paper';

import EditarPerfilHeader from './EditarPerfilHeader';
import FormularioDadosPessoais from './FormularioDadosPessoais';
import FormularioEspecialidades from './FormularioEspecialidades';
import FormularioDisponibilidade from './FormularioDisponibilidade';
import FormularioPrecos from './FormularioPrecos';
import FormularioLocalizacao from './FormularioLocalizacao';
import ModalConfirmarAlteracoes from './ModalConfirmarAlteracoes';
import BottomActionBar from './BottomActionBar';

export default function EditarPerfilProfissional({ navigation, route }) {
  // ============= ESTADOS =============
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  
  // Dados do formulário
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    email: '',
    telefone: '',
    bio: '',
  });

  const [especialidades, setEspecialidades] = useState([]);
  const [disponibilidade, setDisponibilidade] = useState([]);
  const [precos, setPrecos] = useState({ preco_hora: 0, preco_servico: 0 });
  const [localizacao, setLocalizacao] = useState({
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    cep: '',
    latitude: 0,
    longitude: 0,
  });
  const [fotoUrl, setFotoUrl] = useState('');
  const [novaFoto, setNovaFoto] = useState(null);

  // Estados de UI
  const [erros, setErros] = useState({});
  const [modalConfirmarVisivel, setModalConfirmarVisivel] = useState(false);
  const [categorias, setCategorias] = useState([]);

  // Refs
  const snapshotInicial = useRef(null);

  // ============= EFEITOS =============
  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Refresh dados ao focar
      if (usuario) {
        carregarDadosProfissional();
      }
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
        await carregarDadosProfissional();
        await carregarCategorias();
      } else {
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
        text2: 'Falha ao carregar perfil',
      });
    } finally {
      setCarregando(false);
    }
  };

  const carregarDadosProfissional = async () => {
    try {
      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);

      const response = await fetch(
        `https://sua-api.com/professionals/${usuarioObj.id}`,
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
        
        // Popula formulários com dados
        setDadosPessoais({
          nome: dados.nome || '',
          email: dados.email || '',
          telefone: dados.telefone || '',
          bio: dados.bio || '',
        });
        setEspecialidades(dados.especialidades || []);
        setDisponibilidade(dados.disponibilidade || []);
        setPrecos(dados.precos || { preco_hora: 0, preco_servico: 0 });
        setLocalizacao(dados.localizacao || {});
        setFotoUrl(dados.foto_url || '');
        
        // Snapshot para comparação
        snapshotInicial.current = {
          dadosPessoais: { ...dados.nome, ...dados.email, ...dados.telefone, ...dados.bio },
          especialidades: [...(dados.especialidades || [])],
          disponibilidade: [...(dados.disponibilidade || [])],
          precos: { ...dados.precos },
          localizacao: { ...dados.localizacao },
          fotoUrl: dados.foto_url || '',
        };
      } else {
        throw new Error('Falha ao carregar dados');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do profissional:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao carregar dados do perfil',
      });
    }
  };

  const carregarCategorias = async () => {
    try {
      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);

      const response = await fetch(`https://sua-api.com/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuarioObj.token}`,
        },
      });

      if (response.ok) {
        const dados = await response.json();
        setCategorias(dados || []);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  // ============= VALIDAÇÕES =============
  const validarDados = () => {
    const novoErros = {};

    // Validação de nome
    if (!dadosPessoais.nome || dadosPessoais.nome.length < 3) {
      novoErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validação de email
    if (!dadosPessoais.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosPessoais.email)) {
      novoErros.email = 'Email inválido';
    }

    // Validação de telefone
    if (!dadosPessoais.telefone || dadosPessoais.telefone.replace(/\D/g, '').length < 10) {
      novoErros.telefone = 'Telefone inválido';
    }

    // Validação de bio
    if (dadosPessoais.bio && dadosPessoais.bio.length > 500) {
      novoErros.bio = 'Bio não pode ter mais de 500 caracteres';
    }

    // Validação de especialidades
    if (!especialidades || especialidades.length === 0) {
      novoErros.especialidades = 'Selecione pelo menos 1 especialidade';
    }

    // Validação de disponibilidade
    const temDisponibilidade = disponibilidade.some(d => d.ativo);
    if (!temDisponibilidade) {
      novoErros.disponibilidade = 'Defina disponibilidade para pelo menos 1 dia';
    }

    // Validação de preços
    if (!precos.preco_hora || precos.preco_hora <= 0) {
      novoErros.preco_hora = 'Preço por hora deve ser maior que 0';
    }
    if (!precos.preco_servico || precos.preco_servico <= 0) {
      novoErros.preco_servico = 'Preço por serviço deve ser maior que 0';
    }

    // Validação de localização
    if (!localizacao.cep || !/^\d{5}-?\d{3}$/.test(localizacao.cep)) {
      novoErros.cep = 'CEP inválido';
    }

    setErros(novoErros);
    return Object.keys(novoErros).length === 0;
  };

  // ============= MUDANÇAS DETECTADAS =============
  const mudancasDetectadas = useMemo(() => {
    if (!snapshotInicial.current) return [];

    const mudancas = [];

    // Verifica cada campo
    if (JSON.stringify(dadosPessoais) !== JSON.stringify(snapshotInicial.current.dadosPessoais)) {
      mudancas.push({ campo: 'Dados Pessoais', tipo: 'mudado' });
    }

    if (JSON.stringify(especialidades) !== JSON.stringify(snapshotInicial.current.especialidades)) {
      mudancas.push({ campo: 'Especialidades', tipo: 'mudado' });
    }

    if (JSON.stringify(disponibilidade) !== JSON.stringify(snapshotInicial.current.disponibilidade)) {
      mudancas.push({ campo: 'Disponibilidade', tipo: 'mudado' });
    }

    if (JSON.stringify(precos) !== JSON.stringify(snapshotInicial.current.precos)) {
      mudancas.push({ campo: 'Preços', tipo: 'mudado' });
    }

    if (JSON.stringify(localizacao) !== JSON.stringify(snapshotInicial.current.localizacao)) {
      mudancas.push({ campo: 'Localização', tipo: 'mudado' });
    }

    if (novaFoto) {
      mudancas.push({ campo: 'Foto de Perfil', tipo: 'mudado' });
    }

    return mudancas;
  }, [dadosPessoais, especialidades, disponibilidade, precos, localizacao, novaFoto]);

  const temMudancas = mudancasDetectadas.length > 0;

  // ============= FUNÇÕES DE AÇÃO =============
  const handleSalvarMudancas = () => {
    if (!validarDados()) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Verifique os erros antes de salvar',
      });
      return;
    }

    if (!temMudancas) {
      Toast.show({
        type: 'info',
        text1: 'Info',
        text2: 'Nenhuma mudança detectada',
      });
      return;
    }

    setModalConfirmarVisivel(true);
  };

  const handleConfirmarSalvamento = async () => {
    try {
      setSalvando(true);
      setModalConfirmarVisivel(false);

      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);

      // Se houver nova foto, faz upload
      let fotoUrlFinal = fotoUrl;
      if (novaFoto) {
        fotoUrlFinal = await uploadFoto();
      }

      // Prepara payload
      const payload = {
        nome: dadosPessoais.nome,
        email: dadosPessoais.email,
        telefone: dadosPessoais.telefone,
        bio: dadosPessoais.bio,
        especialidades: especialidades.map(e => e.id),
        disponibilidade,
        precos,
        localizacao,
        foto_url: fotoUrlFinal,
      };

      // Envia para API
      const response = await fetch(
        `https://sua-api.com/professionals/${usuarioObj.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuarioObj.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Perfil atualizado com sucesso',
        });

        // Atualiza AsyncStorage
        const usuarioAtualizado = { ...usuarioObj, nome: dadosPessoais.nome };
        await AsyncStorage.setItem('usuario_logado', JSON.stringify(usuarioAtualizado));

        // Volta para perfil
        navigation.navigate('PerfilProfissional');
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      console.error('Erro ao salvar mudanças:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao salvar perfil',
      });
    } finally {
      setSalvando(false);
    }
  };

  const uploadFoto = async () => {
    try {
      const usuarioStorage = await AsyncStorage.getItem('usuario_logado');
      const usuarioObj = JSON.parse(usuarioStorage);

      const formData = new FormData();
      formData.append('foto', {
        uri: novaFoto.uri,
        type: novaFoto.type || 'image/jpeg',
        name: novaFoto.name || 'foto.jpg',
      });

      const response = await fetch(
        `https://sua-api.com/professionals/${usuarioObj.id}/upload-foto`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${usuarioObj.token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const dados = await response.json();
        return dados.foto_url;
      } else {
        throw new Error('Falha ao fazer upload');
      }
    } catch (error) {
      console.error('Erro ao fazer upload de foto:', error);
      throw error;
    }
  };

  const handleCancelar = () => {
    if (temMudancas) {
      Alert.alert(
        'Descartar mudanças?',
        'Você tem mudanças não salvas. Deseja descartar?',
        [
          { text: 'Não', style: 'cancel' },
          {
            text: 'Sim, descartar',
            onPress: () => navigation.goBack(),
            style: 'destructive',
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  // ============= RENDERIZAÇÃO =============
  if (carregando) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleCancelar} />
          <Appbar.Content title="Editar Perfil" />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="var(--color-primary)" />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={handleCancelar} />
        <Appbar.Content title="Editar Perfil" />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CABEÇALHO COM FOTO */}
        <EditarPerfilHeader
          fotoUrl={novaFoto?.uri || fotoUrl}
          nome={dadosPessoais.nome}
          onSelecionarFoto={(foto) => setNovaFoto(foto)}
          carregando={salvando}
        />

        {/* SEÇÃO: DADOS PESSOAIS */}
        <FormularioDadosPessoais
          dados={dadosPessoais}
          erros={erros}
          onChange={(novosDados) => setDadosPessoais(novosDados)}
        />

        {/* SEÇÃO: ESPECIALIDADES */}
        <FormularioEspecialidades
          especialidades={especialidades}
          categorias={categorias}
          erros={erros}
          onChange={(novasEspecialidades) => setEspecialidades(novasEspecialidades)}
        />

        {/* SEÇÃO: DISPONIBILIDADE */}
        <FormularioDisponibilidade
          disponibilidade={disponibilidade}
          erros={erros}
          onChange={(novaDisponibilidade) => setDisponibilidade(novaDisponibilidade)}
        />

        {/* SEÇÃO: PREÇOS */}
        <FormularioPrecos
          precos={precos}
          erros={erros}
          onChange={(novosPrecos) => setPrecos(novosPrecos)}
        />

        {/* SEÇÃO: LOCALIZAÇÃO */}
        <FormularioLocalizacao
          localizacao={localizacao}
          erros={erros}
          onChange={(novaLocalizacao) => setLocalizacao(novaLocalizacao)}
        />

        {/* Espaço para bottom bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* MODAL DE CONFIRMAÇÃO */}
      <ModalConfirmarAlteracoes
        visivel={modalConfirmarVisivel}
        mudancas={mudancasDetectadas}
        carregando={salvando}
        onConfirmar={handleConfirmarSalvamento}
        onCancelar={() => setModalConfirmarVisivel(false)}
      />

      {/* BARRA DE AÇÕES */}
      <BottomActionBar
        salvando={salvando}
        temMudancas={temMudancas}
        onSalvar={handleSalvarMudancas}
        onCancelar={handleCancelar}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'var(--color-background)',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Espaço para bottom bar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 20,
  },
});
