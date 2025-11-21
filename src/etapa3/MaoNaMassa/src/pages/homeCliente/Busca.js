import { View, StyleSheet, TextInput } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Busca = (props) => {
  return (
    <View style={styles.headerContainer__busca}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar profissionais e serviços"
          keyboardType="text"
          returnKeyType="search"
        />
        <FontAwesome6
          name="magnifying-glass"
          size={24}
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 10,
    color: "#C7C9D9",
  },
  inputBusca: {
    flex: 1,
    paddingVertical: 16,
    fontFamily: "Krub",
    color: "#6B7588",
  },
});

export default Busca;
