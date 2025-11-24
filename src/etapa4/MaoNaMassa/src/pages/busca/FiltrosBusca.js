import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Slider,
} from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FiltrosBusca({
  visivel,
  filtrosAtivos,
  onClose,
  onAplicar,
  onLimpar,
}) {
  const [categoria, setCategoria] = useState(filtrosAtivos.categoria);
  const [precoMin, setPrecoMin] = useState(filtrosAtivos.precoMin);
  const [precoMax, setPrecoMax] = useState(filtrosAtivos.precoMax);
  const [avaliacaoMin, setAvaliacaoMin] = useState(filtrosAtivos.avaliacaoMin);

  const categorias = [
    'Encanador',
    'Eletricista',
    'Pedreiro',
    'Pintor',
    'Marceneiro',
  ];

  const handleAplicar = () => {
    onAplicar({
      categoria,
      precoMin,
      precoMax,
      avaliacaoMin,
    });
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.titulo}>Filtros</Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="var(--color-text)"
                />
              </TouchableOpacity>
            </View>

            {/* CATEGORIA */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categoria</Text>
              <View style={styles.categoriaGrid}>
                {categorias.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoriaPill,
                      categoria === cat && styles.categoriaPillAtiva,
                    ]}
                    onPress={() => setCategoria(categoria === cat ? null : cat)}
                  >
                    <Text
                      style={[
                        styles.categoriaPillText,
                        categoria === cat && styles.categoriaPillTextAtiva,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* PREÇO */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Faixa de Preço</Text>
              <View style={styles.priceRange}>
                <Text style={styles.priceLabel}>
                  R$ {precoMin} - R$ {precoMax}
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={999}
                value={precoMin}
                onValueChange={setPrecoMin}
                minimumTrackTintColor="var(--color-primary)"
                maximumTrackTintColor="var(--color-border)"
              />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={999}
                value={precoMax}
                onValueChange={setPrecoMax}
                minimumTrackTintColor="var(--color-primary)"
                maximumTrackTintColor="var(--color-border)"
              />
            </View>

            {/* AVALIAÇÃO */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Avaliação Mínima</Text>
              <View style={styles.ratingContainer}>
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                      styles.ratingButton,
                      avaliacaoMin === rating && styles.ratingButtonAtivo,
                    ]}
                    onPress={() => setAvaliacaoMin(avaliacaoMin === rating ? 0 : rating)}
                  >
                    <Text style={styles.ratingText}>{rating === 0 ? 'Todas' : `${rating}★`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* BOTÕES */}
          <View style={styles.footer}>
            <Button
              mode="outlined"
              onPress={onLimpar}
              style={styles.buttonLimpar}
            >
              Limpar Filtros
            </Button>
            <Button
              mode="contained"
              onPress={handleAplicar}
              style={styles.buttonAplicar}
            >
              Aplicar
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
    paddingVertical: 16,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  categoriaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoriaPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    backgroundColor: 'transparent',
  },
  categoriaPillAtiva: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
  },
  categoriaPillText: {
    fontSize: 12,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  categoriaPillTextAtiva: {
    color: 'var(--color-btn-primary-text)',
    fontWeight: '600',
  },
  priceRange: {
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontFamily: 'Inter',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  ratingButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'var(--color-border)',
    backgroundColor: 'transparent',
  },
  ratingButtonAtivo: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
  },
  ratingText: {
    fontSize: 12,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  buttonLimpar: {
    flex: 1,
  },
  buttonAplicar: {
    flex: 1,
  },
});