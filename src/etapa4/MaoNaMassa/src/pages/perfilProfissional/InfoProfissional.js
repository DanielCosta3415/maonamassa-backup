import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LabelCategoria from "./LabelCategoria";
import { Toast } from "toastify-react-native";

const API_BASE_URL = "https://maonamassa-api.onrender.com";

const { width: screenWidth } = Dimensions.get("window");

const InfoProfissional = ({ dadosProfissional }) => {
  const [isFavorito, setIsFavorito] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [user, setUser] = useState(null);

  const getUserFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue !== null) {
        const jsonValue = await AsyncStorage.getItem("user");
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;
        return user;
      }
    } catch (e) {
      console.error("Erro ao ler usuário do AsyncStorage", e);
    }
    return null;
  };

  useEffect(() => {
    async function loadUser() {
      const storedUser = await getUserFromStorage();
      setUser(storedUser);
    }
    loadUser();
  }, []);

  useEffect(() => {
    const loadUserAndStatusFavorito = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        const storedUser = jsonValue ? JSON.parse(jsonValue) : null;
        setUser(storedUser);

        if (storedUser) {
          const res = await fetch(
            `${API_BASE_URL}/favorito?id_cliente=${storedUser.id}&id_profissional=${dadosProfissional.userInfo.id}`
          );
          if (res.ok) {
            const favoritos = await res.json();

            if (Array.isArray(favoritos) && favoritos.length > 0) {
              setIsFavorito(true);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar usuário ou status favorito", error);
      }
    };

    loadUserAndStatusFavorito();
  }, [dadosProfissional]);

  const handleToggleFavorito = async () => {
    if (loadingFav || isFavorito) return;

    try {
      setLoadingFav(true);

      const nowIso = new Date().toISOString();

      const body = {
        nome: dadosProfissional.userInfo.nome,
        id_profissional: dadosProfissional.userInfo.id,
        id_cliente: user.id,
        tags: dadosProfissional.categorias,
        avatar_url: dadosProfissional.userInfo.foto_blob,
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      const response = await fetch(`${API_BASE_URL}/favorito`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar favorito");
      }

      setIsFavorito(true);

      Toast.success(
        `${dadosProfissional.userInfo.nome} foi adicionado aos seus favoritos.`
      );
    } catch (error) {
      Toast.error("Não foi possível adicionar aos favoritos.");
    } finally {
      setLoadingFav(false);
    }
  };

  return (
    <View style={styles.infoProfessionalContainer}>
      <Avatar.Image
        size={56}
        source={{ uri: dadosProfissional.userInfo.foto_blob }}
      />
      <Text style={styles.h1}>{dadosProfissional.userInfo.nome}</Text>
      <View style={styles.infoProfessionalContainer__info}>
        <View style={styles.infoProfessionalContainer__avaliacao}>
          <MaterialCommunityIcons
            name="star"
            size={24}
            style={styles.infoProfessionalContainer__star}
          />
          <Text style={styles.infoProfessionalContainer__text}>
            {dadosProfissional.avaliacao_media}
          </Text>
        </View>
        <View style={styles.infoProfessionalContainer__divider}></View>
        <View style={styles.infoProfessionalContainer__valorCobrado}>
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={24}
            style={styles.infoProfessionalContainer__clock}
          />
          <Text style={styles.infoProfessionalContainer__text}>
            R$ {dadosProfissional.faixa_preco},00
          </Text>
        </View>
        <View style={styles.infoProfessionalContainer__divider}></View>
        <View style={styles.infoProfessionalContainer__valorCobrado}>
          <TouchableOpacity
            onPress={handleToggleFavorito}
            disabled={loadingFav || isFavorito}
          >
            <MaterialCommunityIcons
              name={isFavorito ? "cards-heart" : "cards-heart-outline"}
              size={24}
              style={styles.infoProfessionalContainer__heart}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LabelCategoria categorias={dadosProfissional.categorias} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoProfessionalContainer: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 32,
  },
  h1: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 28,
    textAlign: "center",
  },
  infoProfessionalContainer__info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  infoProfessionalContainer__avaliacao: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    color: "#6B7588",
  },
  infoProfessionalContainer__star: {
    color: "#F9CA24",
  },
  infoProfessionalContainer__divider: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: "#D6BEFF",
  },
  infoProfessionalContainer__valorCobrado: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  infoProfessionalContainer__clock: {
    color: "#00B4D8",
  },
  infoProfessionalContainer__heart: {
    color: "#EE5253",
  },
  infoProfessionalContainer__text: {
    fontFamily: "Krub",
    color: "#6B7588",
  },
});

export default InfoProfissional;
