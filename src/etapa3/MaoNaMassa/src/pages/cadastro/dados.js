import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, Text, View, Alert } from 'react-native';
import { HelperText, RadioButton } from 'react-native-paper';

const Dados = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('Profissional');
  const [senha, setSenha] = useState('');
  const [isHungry, setIsHungry] = useState(true);

  const [tipo, setTipo] = useState('pro');
  const hasErrors = () => {
    return email.length > 0 && !email.includes('@');
  };

  const validarCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar!', [
        { text: 'OK' },
      ]);
      return;
    }

    console.log('Cadastro efetuado com sucesso!');

    setNome('');
    setEmail('');
    setSenha('');
    setPerfil('Profissional');

    setIsHungry(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNome}
        value={nome}
        placeholder="Digite seu nome"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholder="Digite seu e-mail"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
        placeholder="Digite sua senha"
      />
      <HelperText type="error" visible={hasErrors()}>
        Email invalido!
      </HelperText>

      <View style={styles.containerRadio}>
        <View style={styles.containerRadioItem}>
          <RadioButton
            value="first"
            status={tipo === 'profissional' ? 'checked' : 'unchecked'}
            color={'#f6b93b'}
            uncheckedColor="#fff"
            onPress={() => setTipo('profissional')}
          />
          <Text style={styles.radioLabel}>Profissional</Text>
        </View>
        <View style={styles.containerRadioItem}>
          <RadioButton
            value="first"
            status={tipo === 'cliente' ? 'checked' : 'unchecked'}
            color={'#f6b93b'}
            uncheckedColor="#fff"
            onPress={() => setTipo('cliente')}
            text={'#fff'}
          />
          <Text style={styles.radioLabel}>Cliente</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          color="#f6b93b"
          onPress={validarCadastro}
          disabled={!isHungry}
          title={isHungry ? 'Cadastrar' : 'Cadastro efetuado'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17,
  },
  containerRadio: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: -10,
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: -10,
  },
  buttonContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  radioLabel: {
    color: '#fff', // 👉 cor que você quiser
    fontSize: 16,
    marginLeft: 4,
  },
});

export default Dados;
