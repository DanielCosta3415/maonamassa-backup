import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const BottomBar = ({ state, descriptors, role }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem("userRole");
        if (role !== null) {
          setUserRole(role);
        }

        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          setUser(userData);
        }
      } catch (e) {
        console.error("Erro ao carregar userRole no BottomBar", e);
      }
    };

    loadUserRole();
  }, []);

  const telaPerfil =
    userRole === "cliente" ? "EditarPerfilCliente" : "EditarPerfilProfissional";
  const telaListaPedidos =
    userRole === "cliente" ? "MeusPedidosScreen" : "PedidosRecebidos";
  const telaHome = userRole === "cliente" ? "HomeCliente" : "HomeProfissional";

  return (
    <View
      style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 10) }]}
    >
      <Pressable
        style={styles.bottomItem}
        onPress={() => navigation.navigate(telaPerfil)}
      >
        <Ionicons name="person-outline" size={22} />
      </Pressable>
      <Pressable
        style={styles.bottomItem}
        onPress={() => navigation.navigate(telaListaPedidos)}
      >
        <Ionicons name="list-outline" size={22} />
      </Pressable>
      <View style={styles.homeFab}>
        <Pressable onPress={() => navigation.navigate(telaHome)}>
          <Ionicons name="home-outline" size={22} />
        </Pressable>
      </View>
      <Pressable
        style={styles.bottomItem}
        onPress={() => navigation.navigate("Favoritos", { user })}
      >
        <Ionicons name="heart-outline" size={22} />
      </Pressable>
      <Pressable
        style={styles.bottomItem}
        onPress={() => navigation.navigate("Notificacoes")}
      >
        <Ionicons name="notifications-outline" size={22} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 74,
    backgroundColor: "#FFFFFFEE",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -2 },
      },
      android: { elevation: 8 },
    }),
  },
  bottomItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  homeFab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: -28,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
  },
});

export default BottomBar;
