import { View, Text, StyleSheet } from "react-native";

const InformacaoUsuario = (props) => {
  return (
    <View style={styles.headerContainer__userInfo}>
      <Text style={styles.greetingText}>{props.horario}</Text>
      <Text style={styles.h2}>{props.nome}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer__userInfo: {
    flex: 1,
    gap: 8,
  },
  greetingText: {
    fontFamily: "KrubSemibold",
    color: "#ffffff",
    fontSize: 16,
  },
  h2: {
    fontFamily: "InterBold",
    color: "#ffffff",
    fontSize: 24,
  },
});

export default InformacaoUsuario;
