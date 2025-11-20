import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";

const Titulo = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/logo-white-md.png")}
        style={styles.imageBackground}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 40,
    height: 80, // Defina altura para a imagem aparecer
    justifyContent: "center",
  },
  imageBackground: {
    width: 200, // Ajuste largura conforme proporção da imagem
    height: "100%",
  },
});

export default Titulo;
