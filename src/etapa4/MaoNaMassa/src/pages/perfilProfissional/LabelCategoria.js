import { View, Text, StyleSheet } from "react-native";

const LabelCategoria = (props) => {
  const categoriasExibidas = props.categorias.slice(0, 2);
  return (
    <View style={styles.profContainer__label}>
      {categoriasExibidas.map((cat, i) => (
        <Text key={i} style={styles.profContainer__text}>
          {cat}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  profContainer__label: {
    flexDirection: "row",
    gap: 8,
  },
  profContainer__text: {
    fontFamily: "Krub",
    fontSize: 12,
    color: "#6B7588",
    backgroundColor: "#F5F6FF",
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default LabelCategoria;
