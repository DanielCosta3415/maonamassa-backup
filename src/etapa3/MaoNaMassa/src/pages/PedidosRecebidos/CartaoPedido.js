import { StyleSheet, View, Text  } from "react-native";
import { Icon, Button } from "react-native-paper";

const styles = StyleSheet.create({
  cartao: {
    padding: 20,
    borderRadius: 10,
    gap: 15,
    backgroundColor: "#F2F2F5"
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center"
  },
  estado: {
    width: "40%",
    padding: 10,
    borderRadius: 10,
    color: "white",
    textAlign: "center"
  },
  detalhes: {
    flexDirection: "row",
    gap: 10
  },
  progresso: {},
  botao: {
    padding: 10,
    borderRadius: 10,
    borderColor: "#8E5AE6",
  }
});

function corDoEstado(nome) {
  let cor = "gray";

  switch (nome) {
    case "Novo":
      cor = "blue";
    break;

    case "Aceito":
      cor = "green";
    break;

    case "Em andamento":
      cor = "orange";
    break;

    case "Concluído":
      cor = "#8E5AE6";
    break;

    case "Cancelado":
      cor = "red";
    break;
  }

  return cor;
}

export default function CartaoPedido({ numero, cliente, data, estado }) {
  const cor = corDoEstado(estado);

  return (
    <View style={styles.cartao}>
      <View style={styles.cabecalho}>
        <Text style={{ width: "60%" }}>Pedido #{numero}</Text>
        <Text style={[styles.estado, { backgroundColor: cor }]}>{estado}</Text>
      </View>

      <View style={styles.detalhes}>
        <Icon size={25} color="#00ADDD" source="account" />
        <Text>{cliente}</Text>
      </View>

      <View style={styles.detalhes}>
        <Icon size={25} color="#00ADDD" source="calendar" />
        <Text>{data}</Text>
      </View>

      <Button
        style={styles.botao}
        textColor={styles.botao.borderColor}
        mode="outlined"
      >
        Ver Detalhes
      </Button>
    </View>
  );
}
