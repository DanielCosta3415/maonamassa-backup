import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { Avatar } from 'react-native-paper';

export default function AgendaHeader({
  usuario,
  filtroAtivo,
  onFiltroChange,
  onVoltar,
}) {
  const filtros = [
    { id: 'todos', label: 'Todos' },
    { id: 'pendente', label: 'Pendente' },
    { id: 'confirmado', label: 'Confirmado' },
    { id: 'concluído', label: 'Concluído' },
    { id: 'cancelado', label: 'Cancelado' },
  ];

  return (
    <View style={styles.container}>
      {/* INFO DO USUÁRIO */}
      <View style={styles.userInfo}>
        {usuario?.foto ? (
          <Avatar.Image
            size={56}
            source={{ uri: usuario.foto }}
          />
        ) : (
          <Avatar.Text
            size={56}
            label={usuario?.nome?.substring(0, 1).toUpperCase() || 'U'}
          />
        )}

        <View style={styles.userDetails}>
          <Text style={styles.userName}>{usuario?.nome}</Text>
          <Text style={styles.userType}>
            {usuario?.tipo === 'profissional'
              ? 'Profissional'
              : 'Cliente'}
          </Text>
        </View>
      </View>

      {/* FILTROS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosContainer}
      >
        {filtros.map((filtro) => (
          <TouchableOpacity
            key={filtro.id}
            style={[
              styles.filtroButton,
              filtroAtivo === filtro.id && styles.filtroButtonAtivo,
            ]}
            onPress={() => onFiltroChange(filtro.id)}
          >
            <Text
              style={[
                styles.filtroText,
                filtroAtivo === filtro.id && styles.filtroTextAtivo,
              ]}
            >
              {filtro.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--color-text)',
    fontFamily: 'Inter',
  },
  userType: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
  filtrosContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  filtroButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'var(--color-secondary)',
    borderWidth: 1,
    borderColor: 'var(--color-border)',
  },
  filtroButtonAtivo: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
  },
  filtroText: {
    fontSize: 12,
    color: 'var(--color-text)',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  filtroTextAtivo: {
    color: 'var(--color-btn-primary-text)',
    fontWeight: '600',
  },
});