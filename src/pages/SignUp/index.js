import React, { useContext, useState } from "react";
import { Platform, StyleSheet, Keyboard } from "react-native";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import Login from "../../components/Login";
import { Picker } from "@react-native-picker/picker";

console.disableYellowBox=true;

import {
  Background,
  Container,
  TouchableOpacity,
  ImageBackground,
  AreaInput,
  Text,
  Input,
  SubmitButton, 
  SubmitText,
  Link,
  LinkText,
  View,
} from "../SignIn/styles";


const styles = StyleSheet.create({
  picker: {
    marginTop: 5,
    marginBottom: 10,
    width: 200,
    backgroundColor: "#F0FFF0",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 300,
    backgroundColor: "#F0FFF0",
    padding: 10,
    marginBottom: 5,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 17,
    color: "#808080",
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 17,
    color: "#000",
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});



export default function SignUp() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [passwoord, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Posdoc");
  

  async function cadastrar() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, passwoord)
      .then((value) => {
        firebase
          .database()
          .ref("membros")
          .child(value.user.uid)
          .set({
            nome: nome,
            cpf: cpf,
            funcao: selectedCategory, 
          });

        alert('Membro cadastrado: ' + value.user.email);

      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Sua senha deve ter pelo menos 6 caracteres");
          return;
        }
        if (error.code === "auth/invalid-email") {
          alert("Email inválido");
          return;
        } else {
          alert("Ops, algo deu errado!");
          return;
        }
      });
    Keyboard.dismiss();
    setEmail("");
    setPassword("");
    setNome("");
    setCPF("");
    setConfirmPassword("");
  }

  function handleSignUp() {
    console.log(user);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <Link>
        <Link >
          <TouchableOpacity>
            <ImageBackground source={require("../../assets/person.png")} />
          </TouchableOpacity>
          <LinkText>Insira sua foto</LinkText>
        </Link>
        </Link>

        <AreaInput>
          <Text>Nome</Text>
          <Input
            underlineColorAndroid="transparent"
            onChangeText={(nome) => setNome(nome)}
            value={nome}
          />
        </AreaInput>

        <AreaInput>
          <Text>CPF</Text>
          <Input
            underlineColorAndroid="transparent"
            onChangeText={(cpf) => setCPF(cpf)}
            value={cpf}
            keyboardType="numeric"
          />
        </AreaInput>

        <AreaInput>
          <Text>Email</Text>
          <Input
            underlineColorAndroid="transparent"
            onChangeText={(texto) => setEmail(texto)}
            value={email}
          />
        </AreaInput>

        <AreaInput>
          <Text>Senha</Text>
          <Input
            underlineColorAndroid="transparent"
            onChangeText={(texto) => setPassword(texto)}
            value={passwoord}
            secureTextEntry
          />
        </AreaInput>

        <AreaInput>
          <Text>Confirmar Senha</Text>
          <Input
            underlineColorAndroid="transparent"
            onChangeText={(texto) => setConfirmPassword(texto)}
            value={confirmPassword}
            secureTextEntry
          />
        </AreaInput>

        <View style={styles.rowContainer}>
          <Text>Função: </Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }
          >

          <Picker.Item label="Posdoc" value="Posdoc" />
          <Picker.Item label="Doutorado" value="Doutorado" />
          <Picker.Item label="Mestrado" value="Mestrado" />
          <Picker.Item label="Graduação" value="Graduação" />
          <Picker.Item
            label="Iniciação Científica"
            value="Iniciação Científica"
          />
          <Picker.Item
            label="Iniciação Científica - EM"
            value="Iniciação Científica - EM"
          />
        </Picker>
        </View>

        <SubmitButton onPress={cadastrar}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
}
