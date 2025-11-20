import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const HomeCliente = () => {
  return (
    <View style={styles.container}>
      <h1>Mão na Massa</h1>
      <h2>Home do cliente</h2>
      <Text style={styles.bodyText}>Home page do cliente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    textAlign: 'center',
    padding: 8,
  },
});

export default HomeCliente;