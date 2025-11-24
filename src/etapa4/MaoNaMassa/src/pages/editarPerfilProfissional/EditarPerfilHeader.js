import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageResizer from 'expo-image-manipulator';

export default function EditarPerfilHeader({
  fotoUrl,
  nome,
  onSelecionarFoto,
  carregando,
}) {
  const [processando, setProcessando] = useState(false);

  const handleSelecionarFoto = async () => {
    try {
      setProcessando(true);

      // Solicita permissão
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permissão negada',
          text2: 'Permita acesso à sua galeria',
        });
        setProcessando(false);
        return;
      }

      // Abre seletor de imagem
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.cancelled) {
        // Redimensiona e comprime imagem
        const resizedImage = await ImageResizer.manipulateAsync(
          resultado.uri,
          [{ resize: { width: 800, height: 800 } }],
          { compress: 0.8, format: 'jpeg' }
        );

        // Valida tamanho (máx 5MB)
        const tamanhoMB = resizedImage.uri.length / (1024 * 1024);
        if (tamanhoMB > 5) {
          Toast.show({
            type: 'error',
            text1: 'Arquivo muito grande',
            text2: 'Máximo 5MB',
          });
          setProcessando(false);
          return;
        }

        // Prepara arquivo
        const novaFoto = {
          uri: resizedImage.uri,
          type: 'image/jpeg',
          name: `foto_perfil_${Date.now()}.jpg`,
          size: tamanhoMB,
        };

        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Foto selecionada. Não esqueça de salvar!',
        });

        onSelecionarFoto(novaFoto);
      }
    } catch (error) {
      console.error('Erro ao selecionar foto:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao selecionar foto',
      });
    } finally {
      setProcessando(false);
    }
  };

  const handleTirarFoto = async () => {
    try {
      setProcessando(true);

      // Solicita permissão de câmera
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permissão negada',
          text2: 'Permita acesso à câmera',
        });
        setProcessando(false);
        return;
      }

      // Abre câmera
      const resultado = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.cancelled) {
        // Redimensiona e comprime imagem
        const resizedImage = await ImageResizer.manipulateAsync(
          resultado.uri,
          [{ resize: { width: 800, height: 800 } }],
          { compress: 0.8, format: 'jpeg' }
        );

        // Valida tamanho
        const tamanhoMB = resizedImage.uri.length / (1024 * 1024);
        if (tamanhoMB > 5) {
          Toast.show({
            type: 'error',
            text1: 'Arquivo muito grande',
            text2: 'Máximo 5MB',
          });
          setProcessando(false);
          return;
        }

        const novaFoto = {
          uri: resizedImage.uri,
          type: 'image/jpeg',
          name: `foto_camera_${Date.now()}.jpg`,
          size: tamanhoMB,
        };

        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Foto capturada. Não esqueça de salvar!',
        });

        onSelecionarFoto(novaFoto);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao tirar foto',
      });
    } finally {
      setProcessando(false);
    }
  };

  const isLoading = carregando || processando;

  return (
    <View style={styles.container}>
      {/* AVATAR EDITÁVEL */}
      <View style={styles.avatarWrapper}>
        <TouchableOpacity
          style={styles.avatarTouchable}
          onPress={handleSelecionarFoto}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          {fotoUrl ? (
            <Avatar.Image size={120} source={{ uri: fotoUrl }} />
          ) : (
            <Avatar.Text
              size={120}
              label={nome?.substring(0, 1).toUpperCase() || 'U'}
            />
          )}

          {isLoading ? (
            <View style={styles.overlay}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <View style={styles.overlay}>
              <MaterialCommunityIcons
                name="camera"
                size={28}
                color="white"
              />
            </View>
          )}
        </TouchableOpacity>

        {/* BOTÃO CÂMERA */}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleTirarFoto}
          disabled={isLoading}
        >
          <MaterialCommunityIcons
            name="camera-plus"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* TEXTOS */}
      <Text style={styles.nome}>{nome || 'Seu Nome'}</Text>
      <Text style={styles.instrucao}>Toque para mudar foto</Text>

      {/* INFO TAMANHO */}
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="information"
          size={14}
          color="var(--color-text-secondary)"
        />
        <Text style={styles.infoText}>
          Formato: JPG, PNG | Tamanho máx: 5MB
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'var(--color-surface)',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarTouchable: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'var(--color-surface)',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'var(--color-primary)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'var(--color-surface)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: 'var(--color-text)',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  instrucao: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--color-secondary)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  infoText: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    fontFamily: 'Inter',
  },
});
