import { View, Image, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LogoImg from "../../../assets/logo-white-lg.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Logo = ({ atualizarLogin }) => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      atualizarLogin(false);

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e) {
      console.error("Erro ao deslogar:", e);
    }
  };

  return (
    <View style={styles.headerContainer__logo}>
      <View style={styles.logoContainer}>
        <Image source={LogoImg} style={styles.logoImage} resizeMode="contain" />
      </View>

      <Pressable onPress={logout}>
        <MaterialCommunityIcons
          name="logout"
          size={24}
          style={styles.logoIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer__logo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    color: "#ffffff",
  },
  logoContainer: {
    width: 161,
    height: 46,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  logoIcon: {
    color: "#ffffff",
  },
});

export default Logo;
