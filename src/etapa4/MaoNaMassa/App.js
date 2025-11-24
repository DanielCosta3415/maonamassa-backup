import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Krub_400Regular, Krub_600SemiBold } from "@expo-google-fonts/krub";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import ToastManager from "toastify-react-native";
import Menu from "./components/Menu";
import Agenda from "./src/pages/agenda/Agenda";
import AtualizarPedido from "./src/pages/atualizarPedido/AtualizarPedido";
import AvaliarProfissional from "./src/pages/avaliarProfissional/AvaliarProfissional";
import Busca from "./src/pages/busca/Busca";
import Cadastro from "./src/pages/cadastro/Cadastro";
import CriarPedido from "./src/pages/criarPedido/CriarPedido";
import DetalhePedidoCliente from "./src/pages/detalhePedidoCliente/DetalhePedidoCliente";
import EditarPerfilCliente from "./src/pages/editarPerfilCliente/EditarPerfilCliente";
import EditarPerfilProfissional from "./src/pages/editarPerfilProfissional/EditarPerfilProfissional";
import EditarPedidoCliente from "./src/pages/editarPedidoCliente/EditarPedidoCliente";
import Favoritos from "./src/pages/favoritos/Favoritos";
import HomeCliente from "./src/pages/homeCliente/HomeCliente";
import HomeProfissional from "./src/pages/homeProfissional/HomeProfissional";
import MeusPedidosScreen from "./src/pages/listarPedidosCliente/Home";
import Login from "./src/pages/login/Login";
import TelaInicial from "./src/pages/onboarding/Onboarding";
import PerfilProfissional from "./src/pages/perfilProfissional/PerfilProfissional";
import PedidosRecebidos from "./src/pages/PedidosRecebidos/PedidosRecebidos";
import Notificacoes from "./src/pages/notificacoes/Notificacoes";

import BottomBar from "./components/BottomBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [rotaInicial, setRotaInicial] = useState("Onboarding");

  const [fontloaded, fonterror] = useFonts({
    Inter: Inter_400Regular,
    InterBold: Inter_700Bold,
    Krub: Krub_400Regular,
    KrubSemibold: Krub_600SemiBold,
  });

  useEffect(() => {
    checkUserInStorage(usuarioLogado, setUsuarioLogado, setRotaInicial);
  }, [usuarioLogado]);

  useEffect(() => {
    if (fontloaded || fonterror) {
      SplashScreen.hideAsync();
    }
  }, [fontloaded, fonterror]);

  if (usuarioLogado === null || (!fontloaded && !fonterror)) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={rotaInicial}>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} atualizarLogin={setUsuarioLogado} />}
          </Stack.Screen>
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Onboarding" component={TelaInicial} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Agenda" component={Agenda} />
          <Stack.Screen name="AtualizarPedido" component={AtualizarPedido} />
          <Stack.Screen
            name="AvaliarProfissional"
            component={AvaliarProfissional}
          />
          <Stack.Screen name="Busca" component={Busca} />
          <Stack.Screen
            name="CriarPedido"
            component={CriarPedido}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notificacoes"
            component={Notificacoes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalhePedidoCliente"
            component={DetalhePedidoCliente}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditarPerfilCliente"
            component={EditarPerfilCliente}
          />
          <Stack.Screen
            name="EditarPerfilProfissional"
            component={EditarPerfilProfissional}
          />
          <Stack.Screen
            name="EditarPedidoCliente"
            component={EditarPedidoCliente}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Favoritos" component={Favoritos} />
          <Stack.Screen
            name="HomeCliente"
            options={{
              title: "Home",
            }}
          >
            {(props) => (
              <HomeCliente {...props} atualizarLogin={setUsuarioLogado} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="HomeProfissional"
            options={{
              title: "Home",
            }}
          >
            {(props) => (
              <HomeProfissional {...props} atualizarLogin={setUsuarioLogado} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="MeusPedidosScreen"
            options={{
              title: "Meus pedidos",
            }}
            component={MeusPedidosScreen}
          />
          <Stack.Screen name="PedidosRecebidos" component={PedidosRecebidos} />
          <Stack.Screen
            name="PerfilProfissional"
            component={PerfilProfissional}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        {usuarioLogado && <BottomBar />}
      </NavigationContainer>
      <ToastManager />
    </PaperProvider>
  );
}

async function checkUserInStorage(
  estaLogado,
  setUsuarioLogado,
  setRotaInicial
) {
  // Se o usuário está logado, não precisa verificar novamente.
  if (estaLogado === true) return;

  estaLogado = false;
  let rotaInicial = "Onboarding";

  try {
    const user = await AsyncStorage.getItem("user");
    const parsed = user ? JSON.parse(user) : null;

    const role = await AsyncStorage.getItem("userRole");

    estaLogado = parsed !== null;

    if (role === "cliente") {
      rotaInicial = "HomeCliente";
    } else if (role === "profissional") {
      rotaInicial = "HomeProfissional";
    }
  } catch (e) {
    console.error("Erro ao buscar usuário no storage", e);
  }

  setUsuarioLogado(estaLogado);
  setRotaInicial(rotaInicial);
}
