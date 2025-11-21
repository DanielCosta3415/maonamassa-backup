import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const BotaoRealizarPedido = ({ onRealizarPedido }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={styles.btnContainer__large_btn}
        onPress={onRealizarPedido}
      >
        <Text style={styles.btnContainer__text}>Realizar pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: screenWidth,
    paddingHorizontal: 16,
    marginTop: 48,
    gap: 32,
  },
  btnContainer__large_btn: {
    paddingVertical: 12,
    backgroundColor: "#A371F8",
    borderRadius: 6,
  },
  btnContainer__text: {
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "KrubSemibold",
    fontSize: 16,
  },
});

export default BotaoRealizarPedido;
