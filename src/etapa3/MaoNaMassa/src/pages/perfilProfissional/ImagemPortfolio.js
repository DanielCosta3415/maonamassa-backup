import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
const { width: screenWidth } = Dimensions.get("window");

const ImagemPortfolio = ({ imagem }) => {
  return (
    <View style={styles.imgContainer}>
      <Image source={{ uri: imagem }} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagemPortfolio;
