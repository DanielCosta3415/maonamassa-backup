import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';

export default function EmptySearchState({
  termo,
  tipo,
  filtrosAtivos,
  onFazerNovaBusca,
  onLimparFiltros,
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="magnify-close"
        size={64}
        color="var(--color-text-secondary)"
        style={styles.icon}
      />

      <Text style={styles.titulo}>Nenhum resultado encontrado</Text>

      <Text style={styles.mensagem}>
        Não encontramos resultados para "{termo}"
      </Text>

      {filtrosAtivos && (
        <View style={styles.filtrosAtivosContainer}>
          <Text style={styles.filtrosAtivosText}>
            Você tem filtros ativados
          </Text>
          <Button
            mode="text"
            onPress={onLimparFiltros}
            labelStyle={styles.buttonLabel}
          >
            Limpar Filtros
          </Button>
        </View>
      )}

      <View style={styles.suggestoesContainer}>
        <Text style={styles.sugestoesTitle}>Dicas:</Text>
        <View style={styles.sugestao}>
          <MaterialCommunityIcons
            name="check"
            size={16}
            color="var(--color-primary)"
          />
          <Text style={styles.sugestaoText}>
            Verifique a ortografia
          </Text>
        </View>
        <View style={styles.sugestao}>
          <MaterialCommunityIcons
            name="check"
            size={16}
            color="var(--color-primary)"
          />
          <Text style={styles.sugestaoText}>
            Tente termos diferentes
          </Text>
        </View>
        <View style={styles.sugestao}>
          <MaterialCommunityIcons
            name="check"
            size={16}
            color="var(--color-primary)"
          />
          <Text style={styles.sugestaoText}>
            Use categorias ou filtros
          </Text>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={onFazerNovaBusca}
        style={styles.button}
      >
        Fazer Nova Busca
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  icon: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--color-text)',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  mensagem: {
    fontSize: 14,
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  filtrosAtivosContainer: {
    backgroundColor: 'var(--color-bg-2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  filtrosAtivosText: {
    fontSize: 13,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
    marginBottom: 8,
  },
  buttonLabel: {
    fontSize: 12,
  },
  suggestoesContainer: {
    width: '100%',
    marginBottom: 24,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    padding: 16,
  },
  sugestoesTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  sugestao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sugestaoText: {
    fontSize: 12,
    color: 'var(--color-text)',
    marginLeft: 8,
    fontFamily: 'Inter',
  },
  button: {
    width: '100%',
  },
});