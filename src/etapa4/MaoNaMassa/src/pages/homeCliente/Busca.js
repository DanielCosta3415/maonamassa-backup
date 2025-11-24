import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Busca = () => {
  const navigation = useNavigation();

  const handleFocus = () => {
    navigation.navigate("Busca");
  };

  return (
    <View style={styles.headerContainer__busca}>
      <TouchableOpacity style={styles.inputContainer} onPress={handleFocus}>
        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar profissionais e serviços"
          editable={false}
          pointerEvents="none"
        />
        <FontAwesome6
          name="magnifying-glass"
          size={24}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
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
