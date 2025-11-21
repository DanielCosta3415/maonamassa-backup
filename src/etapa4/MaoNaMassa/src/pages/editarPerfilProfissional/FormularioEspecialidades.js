import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormularioEspecialidades({
  especialidades,
  categorias,
  erros,
  onChange,
}) {
  const handleToggleEspecialidade = (categoria) => {
    const jaEspecialidade = especialidades.some(e => e.id === categoria.id);
    
    if (jaEspecialidade) {
      onChange(especialidades.filter(e => e.id !== categoria.id));
    } else {
      if (especialidades.length < 5) {
        onChange([...especialidades, categoria]);
      }
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = especialidades.some(e => e.id === item.id);

    return (
      <TouchableOpacity
        style={[
          styles.categoriaButton,
          isSelected && styles.categoriaButtonSelecionada,
        ]}
        onPress={() => handleToggleEspecialidade(item)}
      >
        <View style={styles.checkboxContainer}>
          {isSelected ? (
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="var(--color-primary)"
            />
          ) : (
            <MaterialCommunityIcons
              name="circle-outline"
              size={20}
              color="var(--color-border)"
            />
          )}
        </View>
        <View style={styles.categoriaInfo}>
          <Text style={styles.categoriaNome}>{item.nome}</Text>
          {item.descricao && (
            <Text style={styles.categoriaDescricao}>{item.descricao}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Especialidades *</Text>
        <Text style={styles.contador}>
          {especialidades.length}/5 selecionadas
        </Text>
      </View>

      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {erros.especialidades && (
        <Text style={styles.errorText}>{erros.especialidades}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  contador: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
  categoriaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoriaButtonSelecionada: {},
  checkboxContainer: {
    marginRight: 12,
  },
  categoriaInfo: {
    flex: 1,
  },
  categoriaNome: {
    fontSize: 14,
    fontWeight: '500',
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  categoriaDescricao: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    marginTop: 2,
    fontFamily: 'Inter',
  },
  separator: {
    height: 1,
    backgroundColor: 'var(--color-border)',
  },
  errorText: {
    fontSize: 11,
    color: 'var(--color-error)',
    marginTop: 8,
    fontFamily: 'Inter',
  },
});