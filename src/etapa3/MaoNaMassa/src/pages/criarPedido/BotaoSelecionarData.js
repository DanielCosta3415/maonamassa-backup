import { Text, TouchableOpacity, StyleSheet } from "react-native";

const BotaoSelecionarData = ({ onOpen }) => {
  return (
    <TouchableOpacity style={styles.btnContainer__large_btn} onPress={onOpen}>
      <Text style={styles.btnContainer__text}>Selecionar data e horário</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer__large_btn: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#8E5AE6",
    borderRadius: 6,
  },
  btnContainer__text: {
    textAlign: "center",
    color: "#8E5AE6",
    fontFamily: "Krub",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
});

export default BotaoSelecionarData;
