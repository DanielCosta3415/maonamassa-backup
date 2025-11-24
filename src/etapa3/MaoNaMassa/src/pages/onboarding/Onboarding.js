import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import Logo from "./assets/Logo";

const { width } = Dimensions.get("window");

// Frases do onboarding
const slides = [
  {
    id: "1",
    texto: "Transforme suas habilidades em lucro com Mão na Massa – o serviço que te coloca em ação!",
  },
  {
    id: "2",
    texto: "Conecte-se com clientes e aumente sua renda oferecendo serviços práticos e rápidos.",
  },
  {
    id: "3",
    texto: "Gerencie seus serviços de forma simples e eficiente, tudo pelo app!",
  },
];

const TelaInicial = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setIndex(newIndex);
  };

  return (
    <ImageBackground
      source={require("./assets/medium_bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Logo />

      <FlatList
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.subtitle}>{item.texto}</Text>
          </View>
        )}
      />

      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>
          {index === slides.length - 1 ? "Começar" : "Próximo"}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  slide: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
  },
  button: {
    backgroundColor: "#f8f6fc",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 50,
    alignItems: "center",
    elevation: 2,
    alignSelf: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#A085FF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TelaInicial;
