import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const EditarPerfilProfissional = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.h1}>Mão na Massa</Text>
      <Text style={styles.h2}>Editar Perfil (profissional)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100vw',
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  h1: {
    fontFamily: 'InterBold',
    fontSize: 30,
    fontWeight: 'bold',
  },
  h2: {
    fontFamily: 'InterBold',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default EditarPerfilProfissional;