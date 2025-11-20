import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  rodape: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-around",
    backgroundColor: "#F2F2F5"
  },
  pagina: {
    color: "#8F90A6"
  },
  central: {
    width: 80,
    padding: 10,
    borderRadius: "50%",
    aspectRatio: "1 / 1",
    boxSizing: "border-box",

    justifyContent: "center",
    alignItems: "center",

    position: "fixed",
    top: -20,

    color: "#8E5AE6",
    backgroundColor: "#FFFFFF",
  }
});

export default function Rodape() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Appbar style={[styles.rodape, { bottom }]}>
      <Appbar.Action size={30} color={styles.pagina.color} icon="account" />
      <Appbar.Action size={30} color={styles.pagina.color} icon="format-list-text" />

      <View style={styles.central}>
        <Appbar.Action
          size={styles.central.width / 2}
          color={styles.central.color}
          style={{ backgroundColor: "#F2F2F5" }}
          icon="home"
        />
      </View>

      <Appbar.Action size={30} color={styles.pagina.color} icon="heart" />
      <Appbar.Action size={30} color={styles.pagina.color} icon="cog" />
    </Appbar>
  );
};
