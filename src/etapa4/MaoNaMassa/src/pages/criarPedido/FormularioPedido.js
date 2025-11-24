import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Toast } from "toastify-react-native";
import Dropdown from "react-native-input-select";

const FormularioPedido = ({
  data,
  hora,
  listaCategorias,
  idCategorias,
  profissional,
  navigation,
}) => {
  const [categorias, setCategorias] = useState([]);

  const dropdownOptions = listaCategorias.map((nomeCategoria, index) => ({
    label: nomeCategoria,
    value: idCategorias[index],
  }));

  const [descricao, setDescricao] = useState("");
  const [cep, setCEP] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const handleEnviarPedido = async () => {
    if (
      categorias.length === 0 ||
      data === null ||
      hora === null ||
      !descricao ||
      !cep ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado
    ) {
      Toast.error("Preencha todos os campos.", "bottom");
      return;
    }

    try {
      const jsonValue = await AsyncStorage.getItem("user");
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;
      const clienteId = user.id;

      if (!clienteId) {
        Toast.error("Usuário não autenticado.", "bottom");
        return;
      }

      const pedido = {
        servico_id: categorias,
        cliente_id: clienteId,
        professional_id: profissional.userInfo.id,
        preco: profissional.faixa_preco,
        status: "criado",
        descricao,
        arquivo_blob: null,
        avaliador_id: clienteId,
        nota: null,
        comentario: null,
        data,
        hora,
        localizacao: {
          cep,
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
        },
      };

      const response = await fetch(
        "https://maonamassa-api.onrender.com/contratacao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedido),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar pedido");
      }

      const notificacao = {
        remetente_id: clienteId,
        destinatario_id: profissional.userInfo.id,
        mensagem: `${profissional.userInfo.nome} você possui um novo pedido criado por ${user.nome}. Visite a seção "Meus pedidos" para saber mais!`,
        msg_img: user.foto_blob,
        read_status: false,
      };

      await fetch("https://maonamassa-api.onrender.com/notificacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificacao),
      });

      Toast.success("Pedido realizado com sucesso!");

      if (navigation) {
        navigation.navigate("MeusPedidosScreen");
      }
    } catch (error) {
      Toast.error("Erro ao enviar pedido: " + error.message, "bottom");
    }
  };

  const consultaCEP = async (cepInput) => {
    setCEP(cepInput);
    if (cepInput.length !== 8) {
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepInput}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        Toast.error("CEP não encontrado.", "bottom");
        setRua("");
        setBairro("");
        setCidade("");
        setEstado("");
        return;
      }

      setRua(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
    } catch (error) {
      Toast.error("Erro ao buscar o CEP.", "bottom");
    }
  };

  return (
    <View style={styles.formPedido}>
      <View style={styles.formPedido__md}>
        <TextInput
          mode="outlined"
          label="Data"
          value={data}
          editable={false}
          showSoftInputOnFocus={false}
          outlineColor="#DADCEA"
          outlineStyle={{ borderRadius: 6 }}
          textColor="#8F90A6"
          style={{ backgroundColor: "#ffffff", width: "48%" }}
          theme={{
            colors: {
              primary: "#8E5AE6",
              text: "#DADCEA",
              placeholder: "#DADCEA",
            },
            fonts: {
              regular: {
                fontFamily: "KrubSemibold",
              },
              medium: {
                fontFamily: "KrubSemibold",
              },
              light: {
                fontFamily: "KrubSemibold",
              },
              thin: {
                fontFamily: "KrubSemibold",
              },
            },
          }}
        />
        <TextInput
          mode="outlined"
          label="Horário"
          value={hora}
          editable={false}
          showSoftInputOnFocus={false}
          outlineColor="#DADCEA"
          outlineStyle={{ borderRadius: 6 }}
          textColor="#8F90A6"
          style={{ backgroundColor: "#ffffff", width: "48%" }}
          theme={{
            colors: {
              primary: "#8E5AE6",
              text: "#DADCEA",
              placeholder: "#DADCEA",
            },
          }}
        />
      </View>
      <View style={styles.formPedido__dropdown}>
        <Dropdown
          placeholder="Selecione pelo menos uma categoria"
          dropdownIconStyle={{
            top: 30,
          }}
          dropdownStyle={{
            borderColor: "#DADCEA",
            borderWidth: 1,
            borderRadius: 6,
            fontFamily: "Krub",
            color: "#3A3A3C",
            fontSize: 16,
            backgroundColor: "#fff",
            marginBottom: -25,
          }}
          placeholderStyle={{
            fontFamily: "Krub",
            color: "#3A3A3C",
          }}
          options={dropdownOptions}
          selectedValue={categorias}
          onValueChange={(value) => setCategorias(value)}
          primaryColor={"#DADCEA"}
          isMultiple
          isSearchable
        />
      </View>
      <View style={styles.formPedido__lg}>
        <TextInput
          mode="outlined"
          label="Descrição"
          value={descricao}
          multiline={true}
          onChangeText={setDescricao}
          outlineColor="#DADCEA"
          outlineStyle={{ borderRadius: 6 }}
          textColor="#8F90A6"
          style={{ backgroundColor: "#ffffff", minHeight: 96 }}
          theme={{
            fonts: {
              regular: {
                fontFamily: "Krub",
              },
            },
            colors: {
              primary: "#8E5AE6",
              text: "#DADCEA",
              placeholder: "#DADCEA",
            },
          }}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Text style={styles.h4}>Endereço</Text>
        <View style={styles.formPedido__md}>
          <TextInput
            keyboardType="numeric"
            mode="outlined"
            label="CEP"
            value={cep}
            onChangeText={consultaCEP}
            outlineColor="#DADCEA"
            outlineStyle={{ borderRadius: 6 }}
            textColor="#8F90A6"
            style={{ backgroundColor: "#ffffff", width: "48%" }}
            theme={{
              colors: {
                primary: "#8E5AE6",
                text: "#DADCEA",
                placeholder: "#DADCEA",
              },
            }}
          />
          <TextInput
            mode="outlined"
            label="Rua"
            value={rua}
            onChangeText={setRua}
            outlineColor="#DADCEA"
            outlineStyle={{ borderRadius: 6 }}
            textColor="#8F90A6"
            style={{ backgroundColor: "#ffffff", width: "48%" }}
            theme={{
              colors: {
                primary: "#8E5AE6",
                text: "#DADCEA",
                placeholder: "#DADCEA",
              },
            }}
          />
        </View>

        <View style={styles.formPedido__md}>
          <TextInput
            keyboardType="numeric"
            mode="outlined"
            label="Número"
            value={numero}
            onChangeText={setNumero}
            outlineColor="#DADCEA"
            outlineStyle={{ borderRadius: 6 }}
            textColor="#8F90A6"
            style={{ backgroundColor: "#ffffff", width: "48%" }}
            theme={{
              colors: {
                primary: "#8E5AE6",
                text: "#DADCEA",
                placeholder: "#DADCEA",
              },
            }}
          />
          <TextInput
            mode="outlined"
            label="Complemento"
            value={complemento}
            onChangeText={setComplemento}
            outlineColor="#DADCEA"
            outlineStyle={{ borderRadius: 6 }}
            textColor="#8F90A6"
            style={{ backgroundColor: "#ffffff", width: "48%" }}
            theme={{
              colors: {
                primary: "#8E5AE6",
                text: "#DADCEA",
                placeholder: "#DADCEA",
              },
            }}
          />
        </View>

        <View style={styles.formPedido__md}>
          <TextInput
            mode="outlined"
            label="Bairro"
            value={bairro}
            onChangeText={setBairro}
            outlineColor="#DADCEA"
            outlineStyle={{ borderRadius: 6 }}
            textColor="#8F90A6"
            style={{ backgroundColor: "#ffffff", width: "48%" }}
            theme={{
              colors: {
                primary: "#8E5AE6",
                text: "#DADCEA",
                placeholder: "#DADCEA",
              },
            }}
          />
          <TextInput
            mode="outlined"
            label="Cidade"
            value={cidade}
            onChangeText={setCidade}
            outlineColor="#DADCEA"
            outlineStyle={{ borderRadius: 6 }}
            textColor="#8F90A6"
            style={{ backgroundColor: "#ffffff", width: "48%" }}
            theme={{
              colors: {
                primary: "#8E5AE6",
                text: "#DADCEA",
                placeholder: "#DADCEA",
              },
            }}
          />
        </View>
        <View style={styles.formPedido__lg}>
          <TextInput
            mode="outlined"
            label="Estado"
            value={estado}
            onChangeText={setEstado}
            outlineColor="#DADCEA"
            outlineStyle={{ borderRadius: 6 }}
            textColor="#8F90A6"
            style={{ backgroundColor: "#ffffff" }}
            theme={{
              colors: {
                primary: "#8E5AE6",
                text: "#DADCEA",
                placeholder: "#DADCEA",
              },
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnContainer__large_btn}
        onPress={handleEnviarPedido}
      >
        <Text style={styles.btnContainer__text}>Enviar pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formPedido: {
    gap: 8,
    marginBottom: 50,
  },
  formPedido__md: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formPedido__lg: {
    gap: 8,
  },
  formPedido__dropdown: {
    marginTop: 4,
  },
  btnContainer__large_btn: {
    paddingVertical: 12,
    backgroundColor: "#A371F8",
    borderRadius: 6,
    marginVertical: 16,
  },
  btnContainer__text: {
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "KrubSemibold",
    fontSize: 16,
  },
  h4: {
    fontFamily: "InterBold",
    color: "#6B7588",
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default FormularioPedido;
