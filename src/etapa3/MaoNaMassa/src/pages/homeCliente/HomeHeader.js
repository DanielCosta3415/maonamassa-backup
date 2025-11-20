import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Logo from "./Logo";
import InformacaoUsuario from "./InformacaoUsuario";
import Busca from "./Busca";

const HomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../../../assets/medium_bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.headerContainer__contentLayer}>
        <Logo />
        <InformacaoUsuario nome={"Ana Lúcia Sampaio"} horario={"Boa noite,"} />
        <Busca />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100vw",
    overflow: "hidden",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContainer__contentLayer: {
    flex: 1,
    gap: 32,
    padding: 16,
    marginBottom: 16,
  },
});

export default HomeHeader;
