import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CardProfissional({
  profissional,
  onPress,
}) {
  const renderEstrelas = (nota) => {
    return '★'.repeat(Math.floor(nota)) + '☆'.repeat(5 - Math.floor(nota));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* AVATAR */}
      <View style={styles.avatarContainer}>
        {profissional.foto ? (
          <Avatar.Image size={56} source={{ uri: profissional.foto }} />
        ) : (
          <Avatar.Text
            size={56}
            label={profissional.nome?.substring(0, 1).toUpperCase() || 'P'}
          />
        )}
      </View>

      {/* INFO PRINCIPAL */}
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{profissional.nome}</Text>
        
        {profissional.especialidades && (
          <View style={styles.especialidadesContainer}>
            {profissional.especialidades.slice(0, 2).map((esp, idx) => (
              <Text key={idx} style={styles.especialidade}>
                {esp}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.bottomInfo}>
          <View style={styles.precoContainer}>
            <Text style={styles.preco}>
              R$ {profissional.preco}/h
            </Text>
          </View>

          <View style={styles.avaliacaoContainer}>
            <Text style={styles.avaliacao}>
              {renderEstrelas(profissional.avaliacao_media || 0)}
            </Text>
            <Text style={styles.avaliacaoNumero}>
              {profissional.avaliacao_media?.toFixed(1)}
            </Text>
          </View>
        </View>

        {profissional.localizacao && (
          <View style={styles.localizacaoContainer}>
            <MaterialCommunityIcons
              name="map-marker"
              size={12}
              color="var(--color-text-secondary)"
            />
            <Text style={styles.localizacao}>
              {profissional.localizacao}
            </Text>
            {profissional.distancia && (
              <Text style={styles.distancia}>
                {profissional.distancia.toFixed(1)} km
              </Text>
            )}
          </View>
        )}
      </View>

      {/* SETA */}
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color="var(--color-text-secondary)"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'var(--color-card-border)',
  },
  avatarContainer: {
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    color: 'var(--color-text)',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  especialidadesContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 6,
  },
  especialidade: {
    fontSize: 11,
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-text-secondary)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'Inter',
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  precoContainer: {},
  preco: {
    fontSize: 13,
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontFamily: 'Inter',
  },
  avaliacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  avaliacao: {
    fontSize: 11,
    color: 'var(--color-warning)',
    fontFamily: 'Inter',
  },
  avaliacaoNumero: {
    fontSize: 11,
    color: 'var(--color-text)',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  localizacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  localizacao: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
  distancia: {
    fontSize: 10,
    color: 'var(--color-primary)',
    fontWeight: '600',
    fontFamily: 'Inter',
    marginLeft: 'auto',
  },
});