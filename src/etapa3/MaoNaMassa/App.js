import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Krub_400Regular, Krub_600SemiBold } from "@expo-google-fonts/krub";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
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
import ProfessionalProfile from "./src/pages/editarPerfilProfissional/SelecionarProfissional";
import Favoritos from "./src/pages/favoritos/Favoritos";
import HomeCliente from "./src/pages/homeCliente/HomeCliente";
import HomeProfissional from "./src/pages/homeProfissional/HomeProfissional";
import ListarPedidosCliente from "./src/pages/listarPedidosCliente/ListarPedidosCliente";
import Login from "./src/pages/login/Login";
import TelaInicial from "./src/pages/onboarding/Onboarding";
import PerfilProfissional from "./src/pages/perfilProfissional/PerfilProfissional";
import PedidosRecebidos from "./src/pages/PedidosRecebidos/PedidosRecebidos";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [fontloaded, fonterror] = useFonts({
    Inter: Inter_400Regular,
    InterBold: Inter_700Bold,
    Krub: Krub_400Regular,
    KrubSemibold: Krub_600SemiBold,
  });

  useEffect(() => {
    if (fontloaded || fonterror) {
      SplashScreen.hideAsync();
    }
  }, [fontloaded, fonterror]);

  if (!fontloaded && !fonterror) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Agenda" component={Agenda} />
          <Stack.Screen name="Atualizar Pedido" component={AtualizarPedido} />
          <Stack.Screen
            name="Avaliar Profissional"
            component={AvaliarProfissional}
          />
          <Stack.Screen name="Busca" component={Busca} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen
            name="Criar Pedido"
            component={CriarPedido}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detalhe de Pedido (cliente)"
            component={DetalhePedidoCliente}
          />
          <Stack.Screen
            name="Editar Perfil (cliente)"
            component={EditarPerfilCliente}
          />
          <Stack.Screen
            name="Editar Perfil (profissional)"
            component={ProfessionalProfile}
          />
          <Stack.Screen name="Favoritos" component={Favoritos} />
          <Stack.Screen name="Home (cliente)" component={HomeCliente} />
          <Stack.Screen
            name="Home (profissional)"
            component={HomeProfissional}
          />
          <Stack.Screen
            name="Listar Pedidos (cliente)"
            component={ListarPedidosCliente}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Pedidos Recebidos" component={PedidosRecebidos} />
          <Stack.Screen name="Onboarding" component={TelaInicial} />
          <Stack.Screen
            name="Perfil (profissional)"
            component={PerfilProfissional}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <ToastManager />
    </PaperProvider>
  );
}
