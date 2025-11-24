import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import LabelCategoria from "./LabelCategoria";

const Profissional = (props) => {
  const { infoProfissional } = props;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.profContainer}>
        <Avatar.Image
          size={50}
          source={{ uri: infoProfissional.userInfo?.foto_blob }}
        />
        <View style={styles.profContainer__texto}>
          <Text style={styles.h6}>{infoProfissional.userInfo?.nome}</Text>
          <LabelCategoria categorias={infoProfissional?.categorias} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 16,
    paddingEnd: 24,
  },
  profContainer__texto: {
    flex: 1,
    gap: 8,
  },
  h6: {
    fontFamily: "KrubSemibold",
    fontSize: 16,
    color: "#3A3A3C",
  },
});

export default Profissional;
