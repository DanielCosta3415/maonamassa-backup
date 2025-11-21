import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const BotaoPedido = ({ textBtn, disabled, onPress }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={[styles.btnContainer__large_btn, disabled && styles.btnDisabled]}
        onPress={disabled ? null : onPress}
        disabled={disabled}
      >
        <Text style={styles.btnContainer__text}>{textBtn}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 16,
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

export default BotaoPedido;
