import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

const iconSource = require("../../../assets/logo-purple-lg.png");
// const iconSource = require("../../assets/images/logo-purple-lg.png");

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    justifyContent: "space-between"
  }
});

export default function Cabecalho() {
  return (
    <Appbar.Header statusBarHeight={0} style={styles.header}>
      <Appbar.Action isLeading size={150} color="#8E5AE6" icon={iconSource} />
      <Appbar.Action size={25} color="#8E5AE6" icon="bell-outline" />
    </Appbar.Header>
  );
}
