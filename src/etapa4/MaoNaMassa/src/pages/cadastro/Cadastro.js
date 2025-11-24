import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Titulo from './titulo';
import Dados from './dados';
import { useNavigation } from "@react-navigation/native";
const App = () => {

   const navigation = useNavigation();
   
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('Profissional');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState('pro');
  const handleCadastrar =  async () => {
    

  setLoading(true);
  try {
    const response = await fetch("https://maonamassa-api.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        email,
        password: senha,
        foto_blob: null,
        telefone: null,
      }),
    });

    if (!response.ok) throw new Error("Erro ao cadastrar usuário");
    const user = await response.json();
    const usuario_id = user.id || user.usuario_id;
    console.log(user)
    if (tipo.toLowerCase() === "cliente") {
      await fetch("https://maonamassa-api.onrender.com/cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuario_id,
          mensagem: null,
        }),
      });
    } else if (tipo.toLowerCase() === "profissional") {
      await fetch("https://maonamassa-api.onrender.com/professional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuario_id,
          biografia: null,
          categorias: null,
          faixa_preco: null,
          avaliacao_media: null,
        }),
      });
    }

    alert("Cadastro concluído!");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  } catch (e) {
    alert("Erro ao cadastrar: " + e.message);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('../../../assets/medium_bg.png')} // Altere o caminho conforme o nome/posição da imagem de fundo
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <Titulo />
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          ) : (
            <Dados
              nome={nome}
              setNome={setNome}
              email={email}
              setEmail={setEmail}
              tipo={tipo}
              setTipo={setTipo}
              
              senha={senha}
              setSenha={setSenha}
              onCadastrar={handleCadastrar}
            />
          )}
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
