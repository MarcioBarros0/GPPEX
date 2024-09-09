import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import 'firebase/database';
import firebase from "../../firebaseConnection";
import { Background, Container, Text, SubmitButton, SubmitText, SubmitButtonContainer } from "../Metas/styles";
import TaskList from "./taskList";

const Metas = () => {
  const [projetos, setProjetos] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [novaMeta, setNovaMeta] = useState("");
  const [tasks, setTasks] = useState([]);

  const enviarMetas = async () => {
    try {
      const user = await firebase.auth().currentUser;
  
      if (projetoSelecionado && selectedMeta) {
        // Atualizar o status da meta no banco de dados para 'Final'
        await firebase
          .database()
          .ref(`metas/${user.uid}/${projetoSelecionado.titulo}/${selectedMeta.key}`)
          .update({
            status: 'Final',
          });
  
        // Recarregar as metas após a atualização
        getMetasDoProjeto(projetoSelecionado);
        setSelectedMeta(null);
      }
    } catch (error) {
      console.error('Erro ao enviar metas:', error);
    }
  };



  const onProjetoChange = (itemValue, itemIndex) => {
    if (itemValue) {
      const projetoSelecionado = projetos[itemIndex - 1];
      console.log("Projeto Selecionado no onProjetoChange:", projetoSelecionado);
      setProjetoSelecionado(projetoSelecionado); // Atualiza o projeto selecionado

      if (projetoSelecionado) {
        getMetasDoProjeto(projetoSelecionado);
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser;
  
    return () => {
      if (projetoSelecionado) {
        const path = `metas/${user.uid}/${projetoSelecionado.titulo}`;
        const metasRef = firebase.database().ref(path);
        metasRef.off('value', handleMetasSnapshot);
      }
    };
  }, [projetoSelecionado]);

  const getProjects = async () => {
    try {
      const user = await firebase.auth().currentUser;
      const projectSnapshot = await firebase.database().ref(`projetos/${user.uid}`).once('value');
      const projectData = projectSnapshot.val();
  
      if (projectData) {
        const projectArray = Object.values(projectData);
        setProjetos(projectArray);
  
        if (projectArray.length > 0) {
          const primeiroProjeto = projectArray[0];
          setProjetoSelecionado(primeiroProjeto);
  
          if (primeiroProjeto) {
            getMetasDoProjeto(primeiroProjeto);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  const getMetasDoProjeto = async (projeto) => {
    try {
      if (!projeto) {
        console.error("Projeto Selecionado não definido.");
        return;
      }
  
      const user = await firebase.auth().currentUser;
      const path = `metas/${user.uid}/${projeto.titulo}`;
      const metasRef = firebase.database().ref(path);
  
      console.log("Caminho do banco de dados:", path);
  
      metasRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const metasData = snapshot.val();
          console.log("Metas do Projeto:", metasData);
  
          if (metasData) {
            const metasArray = Object.values(metasData);
            console.log("Metas Array:", metasArray);
            setTasks(metasArray); // Atualiza as metas do projeto no estado
          } else {
            setTasks([]);
          }
        } else {
          console.log("Não há dados na localização do banco de dados.");
          setTasks([]); // Pode ser apropriado definir como vazio caso não haja dados
        }
      });
    } catch (error) {
      console.error("Erro ao buscar metas do projeto:", error);
    }
  };

  const handleMetasSnapshot = (snapshot) => {
    try {
      const metasData = snapshot.val();
      console.log('Metas do Projeto:', metasData);

      if (metasData) {
        const metasArray = Object.values(metasData);
        console.log('Metas Array:', metasArray);
        setTasks(metasArray);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Erro ao processar snapshot de metas:', error);
    }
  };

  const handleProjetoChange = (itemValue, itemIndex) => {
    if (itemValue) {
      const projetoSelecionado = projetos[itemIndex - 1];
      console.log('Projeto Selecionado no handleProjetoChange:', projetoSelecionado);
      setProjetoSelecionado(projetoSelecionado);
  
      if (projetoSelecionado) {
        getMetasDoProjeto(projetoSelecionado);
      }
    }
  };

  const handleAdd = async () => {
    try {
      const user = await firebase.auth().currentUser;

      if (novaMeta && projetoSelecionado) {
        await firebase.database().ref(`metas/${user.uid}/${projetoSelecionado.key}`).push({
          descricao: novaMeta,
          status: 'Pendente', 
        });

        getMetasDoProjeto(projetoSelecionado);
        setNovaMeta('');
      }
    } catch (error) {
      console.error('Erro ao adicionar meta:', error);
    }
  };

  const handleDelete = async (metaKey) => {
    try {
      if (projetoSelecionado) {
        const user = await firebase.auth().currentUser;
        await firebase.database().ref(`metas/${user.uid}/${projetoSelecionado.key}/${metaKey}`).remove();

        getMetasDoProjeto(projetoSelecionado);
      }
    } catch (error) {
      console.error('Erro ao excluir meta:', error);
    }
  };

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <View>
        <Picker
            selectedValue={projetoSelecionado}
            style={styles.picker}
            onValueChange={onProjetoChange}
          >
            <Picker.Item label="Selecionar Projeto" value={null} />
            {projetos.map((projeto, index) => (
              <Picker.Item key={index} label={projeto.titulo} value={projeto} />
            ))}
          </Picker>

          <View style={styles.containerTask}>
            <TextInput
              style={styles.input}
              placeholder="Adicionar Meta"
              value={novaMeta}
              onChangeText={(text) => setNovaMeta(text)}
            />
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <FlatList
  style={styles.FlatList}
  data={tasks}
  keyExtractor={(meta) => meta.key}
  renderItem={({ item }) => (
    <TaskList
      data={item}
      deleteItem={handleDelete}
      editItem={(metaKey, novaDescricao) => handleEdit(metaKey, novaDescricao)}
    />
  )}
  extraData={tasks}
/>

<SubmitButtonContainer>
  <SubmitButton onPress={enviarMetas}>
    <SubmitText>Enviar Metas</SubmitText>
  </SubmitButton>
</SubmitButtonContainer>

          <SubmitButtonContainer>
            <SubmitButton>
              <SubmitText>Gerar Relatório de Metas</SubmitText>
            </SubmitButton>
          </SubmitButtonContainer>
        </View>
      </Container>
    </Background>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginTop: 10,
    marginBottom: 5,
    width: 300,
    backgroundColor: '#F0FFF0',
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth:1,
    borderColor: '#141414',
    height: 50,
    backgroundColor: '#F0FFF0',
    marginTop: 10,
  },
  buttonAdd: {
    backgroundColor:'#2F4F4F',
    height: 50,
    alignItems: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  },
});

export default Metas;
