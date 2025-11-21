import { StyleSheet, Text, View } from 'react-native';
import HomeCliente from './src/pages/HomeCliente';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeCliente></HomeCliente>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
