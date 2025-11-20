import { View, Image, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LogoImg from "../../../assets/logo-white-lg.png";

const Logo = () => {
  return (
    <View style={styles.headerContainer__logo}>
      <View style={styles.logoContainer}>
        <Image source={LogoImg} style={styles.logoImage} resizeMode="contain" />
      </View>

      <FontAwesome5 name="bell" size={24} style={styles.logoIcon} />
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
