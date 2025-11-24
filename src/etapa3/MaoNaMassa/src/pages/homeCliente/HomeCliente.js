import { ScrollView, StyleSheet } from "react-native";
import HomeHeader from "./HomeHeader";
import ListarCategorias from "./ListarCategorias";
import UltimosProfissionais from "./UltimosProfissionais";
import ServicosPopulares from "./ServicosPopulares";

const HomeCliente = ({ onSelectProfissional, onBack }) => {
  return (
    <ScrollView style={styles.homeContainer}>
      <HomeHeader />
      <ListarCategorias />
      <UltimosProfissionais onSelectProfissional={onSelectProfissional} />
      <ServicosPopulares />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#ffffff",
  },
});

export default HomeCliente;