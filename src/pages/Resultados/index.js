import React, { Component } from "react";
import { Platform, Keyboard, Alert, StyleSheet } from "react-native";
import firebase from "../../firebaseConnection";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Picker } from "@react-native-picker/picker";



import {
  Background,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Text,
} from "../SignIn/styles";




const generatePDF = async (htmlContent) => {
  const options = {
    html: htmlContent,
    fileName: 'Relatorio_Resultados',
    directory: 'Documents',
  };

  const file = await RNHTMLtoPDF.convert(options);
  return file.filePath;
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      id: "",
      measures: "",
      results: "",
      projetoSelecionado: null,
      projetosDoUsuario: [],
    };
  }

  componentDidMount() {
    this.carregarProjetosDoUsuario();
  }


  carregarProjetosDoUsuario = async () => {
    try {
      const user = await firebase.auth().currentUser;
      const snapshot = await firebase
        .database()
        .ref("projetos")
        .child(user.uid)
        .once("value");
  
      const projetos = snapshot.val();
      const projetosArray = projetos
        ? Object.keys(projetos).map((key) => ({ id: key, ...projetos[key] }))
        : [];
  
      this.setState({
        projetosDoUsuario: projetosArray,
      });
    } catch (error) {
      console.error("Erro ao carregar projetos do usuário:", error);
    }
  };

 
  enviar = async () => {
    try {
      const { test, id, measures, results, projetoSelecionado } = this.state;
      const user = await firebase.auth().currentUser;
  
      if (!projetoSelecionado) {
        // Verifique se um projeto foi selecionado
        alert("Selecione um projeto antes de enviar os resultados!");
        return;
      }
  
      await firebase
        .database()
        .ref(`projetos/${user.uid}/${projetoSelecionado}/resultados`)
        .push()
        .set({
          testes: test,
          id: id,
          unidadedemedida: measures,
          resultados: results,
        });
  
      alert("Resultados cadastrados!");
    } catch (error) {
      alert(`Ops, algo deu errado! Erro: ${error.message}`);
      console.error(error);
    }
  
    Keyboard.dismiss();
    this.setState({
      test: "",
      id: "",
      measures: "",
      results: "",
    });
  };

    gerarRelatorio = async () => {
      try {
        const value = await firebase.auth().currentUser;
    
        // Recupere os resultados do Realtime Database
        const snapshot = await firebase
          .database()
          .ref("resultados")
          .child(value.uid)
          .once("value");
    
        const resultados = snapshot.val();
        const htmlContent = this.createHtmlFromResults(resultados);
        const filePath = await generatePDF(htmlContent);

        try {
          const fileExists = await RNFS.exists(filePath);
    
          if (fileExists) {
            try {
              await Share.open({ url: `file://${filePath}` });
              console.log('Arquivo compartilhado com sucesso!');
            } catch (shareError) {
              console.error('Erro ao compartilhar arquivo:', shareError);
              Alert.alert('Erro ao compartilhar arquivo', shareError.message);
            }
          } else {
            Alert.alert('Erro', 'O arquivo PDF não foi encontrado.');
          }
        } catch (error) {
          console.error('Erro ao verificar a existência do arquivo:', error);
        }
    
        Alert.alert('Relatório gerado com sucesso!');
      } catch (error) {
        Alert.alert(`Ops, algo deu errado! Erro: ${error.message}`);
        console.error(error);
      }
    };
  
    createHtmlFromResults = (results) => {
      let dynamicHtml = `
        <table>
          <thead>
            <tr>
              <th>Teste</th>
              <th>ID Amostra</th>
              <th>Unidade de Medida</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
      `;
    
      if (results) {
        Object.values(results).forEach((result) => {
          dynamicHtml += `
            <tr>
              <td>${result.testes || ''}</td>
              <td>${result.id || ''}</td>
              <td>${result.unidadedemedida || ''}</td>
              <td>${result.resultados || ''}</td>
            </tr>
          `;
        });
      }
    
      dynamicHtml += `
          </tbody>
        </table>
      `;
    
      return dynamicHtml;
    };

  render() {
    const { test, id, measures, results } = this.state;

    return (
      <Background>
        <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
          
        <Picker
          selectedValue={this.state.projetoSelecionado}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ projetoSelecionado: itemValue })
          }
        >
          <Picker.Item label="Selecionar Projeto" value={null} />
          {this.state.projetosDoUsuario.map((projeto, index) => (
            <Picker.Item
              key={index}
              label={projeto.titulo} // Certifique-se de que "titulo" é a propriedade correta do seu objeto de projeto
              value={projeto.id}
            />
          ))}
        </Picker>
        
          <AreaInput>
            <Text>Cadastrar teste</Text>
            <Input
              underlineColorAndroid="transparent"
              onChangeText={(test) => this.setState({ test })}
              value={test}
            />
          </AreaInput>
                
          <AreaInput>
            <Text>Id Amostra</Text>
            <Input
              underlineColorAndroid="transparent"
              onChangeText={(id) => this.setState({id})}
              value={id}
              keyboardType="numeric"
            />
          </AreaInput>

          <AreaInput>
            <Text>Informar Unidade de Medida</Text>
            <Input
              underlineColorAndroid="transparent"
              onChangeText={(measures) => this.setState({measures})}
              value={measures}
            />
          </AreaInput>

          <AreaInput>
            <Text>Resultado do teste</Text>
            <Input
              underlineColorAndroid="transparent"
              onChangeText={(results) => this.setState({results})}
              value={results}
            />
          </AreaInput>
           
          <SubmitButton onPress={this.enviar}>
            <SubmitText>Enviar</SubmitText>
          </SubmitButton>
       
          <SubmitButton onPress={this.gerarRelatorio}>
            <SubmitText>Gerar Relatório de Resultados</SubmitText>
          </SubmitButton>

        </Container>
      </Background>
    );
  }
}

export default Results;


const styles = StyleSheet.create({
  picker: {
      marginTop: 10,
      marginBottom: 5,
      width: 300,
      backgroundColor: '#F0FFF0',

  text:{
      flex:1,
      alignItems: 'center'
  }
  }
})