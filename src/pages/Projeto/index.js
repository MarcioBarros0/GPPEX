import React, {Component} from "react";
import { View, StyleSheet, TouchableOpacity, Keyboard} from "react-native";
import {Picker} from "@react-native-picker/picker";
import { Background, ScrollView, ScrollViewContent, Container, AreaInput, Input, SubmitButton, SubmitText, Text } from "../Projeto/styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from "../../firebaseConnection";
import PushNotification from 'react-native-push-notification';
import { useNavigation } from "@react-navigation/native";

console.disableYellowBox=true;

class Project extends Component {
    constructor(props) {
      super(props);
      this.state = {
        project: 'Ensino',
        category: 'Posdoc',
        member: [],
        title: '',
        resume: '',
        goalsList: [],
        startDate: new Date(),
        deadlineDate: new Date(),
        showDatePicker: false,
        term: '',
        members: [],
        selectedMembers: [],
        showPlaceholder: true,
      };
    }
  
    getMembers = async () => {
      try {
        const membersSnapshot = await firebase.database().ref("membros").once("value");
        const membersData = membersSnapshot.val();
    
        if (membersData) {
          const membersArray = Object.values(membersData);
          this.setState({ members: membersArray, member: [] }); // inicializar member como array vazio
        }
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
        this.setState({ member: [] }); // tratar caso de erro inicializando member como array vazio
      }
    };

    handleDateChange = (event, selectedDate, type) => {
      const { showDatePicker } = this.state;
    
      if (selectedDate !== undefined && event.type === 'set' && showDatePicker) {
        if (type === 'start') {
          this.setState({
            startDate: selectedDate,
          });
        } else if (type === 'deadline') {
          this.setState({
            deadlineDate: selectedDate,
          });
        }
    
        this.setState({
          showDatePicker: false,
        });
      } else {
        this.setState({ showDatePicker: false });
      }
    };
    
   

    handleMemberChange = (itemValue, itemIndex) => {
      const selectedMembers = [...this.state.selectedMembers];
      
      // Verifica se o membro já foi selecionado
      if (!selectedMembers.includes(itemValue)) {
        selectedMembers.push(itemValue);
      } else {
        // Remove o membro se já estiver selecionado (para permitir desseleção)
        const index = selectedMembers.indexOf(itemValue);
        selectedMembers.splice(index, 1);
      }
    
      this.setState({ selectedMembers });
    };

    componentDidMount() {
      this.getMembers();
    }


    
      
            enviar = async () => {
              try {
                const value = await firebase.auth().currentUser;
                const formattedStartDate = this.state.startDate.toISOString();
                const formattedDeadlineDate = this.state.deadlineDate.toISOString();
            
                let membersData = {};
                if (Array.isArray(this.state.selectedMembers)) {
                  // Mapeie os membros selecionados para o formato desejado
                  this.state.selectedMembers.forEach((selectedMember, index) => {
                    membersData[`membro${index + 1}`] = selectedMember;
                  });
                }

            
            await firebase
                .database()
                .ref("projetos")
                .child(value.uid)
                .push()
                .set({
                    categoria: this.state.project,
                    funcao: this.state.category,
                    membro: membersData, 
                    titulo: this.state.title,
                    resumo: this.state.resume,
                    metas: this.state.goalsList,
                    // prazo: this.state.term,
                    dataInicio: formattedStartDate,
                    prazoFinal: formattedDeadlineDate,
                });
    

                // lógica de notificação aqui
                const currentDate = new Date();
                const deadlineDate = new Date(this.state.deadlineDate);

                

                // Notificação para falta de 2 meses
                const twoMonthsBeforeDeadline = new Date(deadlineDate);
                twoMonthsBeforeDeadline.setMonth(twoMonthsBeforeDeadline.getMonth() - 2);
                if (currentDate < twoMonthsBeforeDeadline) {
                  PushNotification.localNotification({
                    title: 'Alerta de Prazo',
                    message: 'Faltam dois meses para o prazo final do projeto!',
                  });
                }

                // Notificação para falta de 1 mês
                const oneMonthBeforeDeadline = new Date(deadlineDate);
                oneMonthBeforeDeadline.setMonth(oneMonthBeforeDeadline.getMonth() - 1);
                if (currentDate < oneMonthBeforeDeadline) {
                  PushNotification.localNotification({
                    title: 'Alerta de Prazo',
                    message: 'Falta um mês para o prazo final do projeto!',
                  });
                }

                // Notificação para falta de 15 dias
                const fifteenDaysBeforeDeadline = new Date(deadlineDate);
                fifteenDaysBeforeDeadline.setDate(fifteenDaysBeforeDeadline.getDate() - 15);
                if (currentDate < fifteenDaysBeforeDeadline) {
                  PushNotification.localNotification({
                    title: 'Alerta de Prazo',
                    message: 'Faltam 15 dias para o prazo final do projeto!',
                  });
                }


            alert('Projeto cadastrado!');
        } catch (error) {
            console.error(error); 
            alert("Ops, algo deu errado!");
            return;

            
        }
    
        Keyboard.dismiss();
        this.setState({
            title: "",
            resume: "",
            goalsList: [],
            term: "",
            startDate: new Date(),
            deadlineDate: new Date(),
            selectedMembers: [],
        });
    };

      handleSignUp() {
        console.log(user);
      }


      
      render() {
        const { project, category, member, title, resume, goalsList, term, startDate, deadlineDate } = this.state;

    return(
       
        <Background style={styles.background}>
          
          <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled >
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
              <ScrollViewContent>
              
              <Picker
                  selectedValue={this.state.project}
                  style={styles.picker}
                  onValueChange={ (itemValue, itemIndex) => this.setState({project: itemValue})
                  }
              >
                  <Picker.Item label="Ensino" value="Ensino"/>
                  <Picker.Item label="Pesquisa" value="Pesquisa"/>
                  <Picker.Item label="Extensão" value="Extensão"/>
              </Picker>
                        
              <Picker
                  selectedValue={this.state.category}
                  style={styles.picker}
                  onValueChange={ (itemValue, itemIndex) => this.setState({category: itemValue})
                  }
              >
                  <Picker.Item label="Posdoc" value="Posdoc"/>
                  <Picker.Item label="Doutorado" value="Doutorado"/>
                  <Picker.Item label="Mestrado" value="Mestrado"/>
                  <Picker.Item label="Graduação" value="Graduação"/>
                  <Picker.Item label="Iniciação Científica" value="Iniciação Científica"/>
                  <Picker.Item label="Iniciação Científica - EM" value="Iniciação Científica - EM"/>
              </Picker>

              <Picker
                selectedValue={this.state.selectedMembers}
                style={styles.picker}
                onValueChange={this.handleMemberChange}
                mode="multiple"
              >
                {/* Opção "Membros" desativada para evitar seleção acidental */}
                <Picker.Item label="Membros" value={[]} enabled={false} />

                {/* Mapeie membros para Picker.Item */}
                {this.state.members.map((member) => (
                  <Picker.Item key={member.uid} label={member.nome} value={member.nome} />
                ))}
              </Picker>
                  

      
              <AreaInput>
                  <Text>Título</Text>
                  <Input
                      underlineColorAndroid="transparent"
                      onChangeText={(title) => this.setState({ title })}
                      value={title}
                  />
              </AreaInput>

              <AreaInput >
                  <Text>Resumo</Text>
                  <Input
                      underlineColorAndroid="transparent"
                      onChangeText={(resume) => this.setState({ resume })}
                      value={resume}
                  />
              </AreaInput>

              <AreaInput>
                <Text>Metas</Text>
                
                <Input
                  multiline={true}
                  underlineColorAndroid="transparent"
                  placeholder="Clique enter para adicionar mais metas!"
                  onChangeText={(goals) => {
                    this.setState({ goalsList: goals.split('\n'), showPlaceholder: goals === '' });
                  }}
                  onFocus={() => this.setState({ showPlaceholder: false })}
                  onBlur={() => this.setState({ showPlaceholder: this.state.goalsList.length === 0 })}
                  value={this.state.goalsList.join('\n')}
                />
              </AreaInput>

              <AreaInput style={styles.dateContainer}>
                <View style={styles.dateRow}>
                  <Text style={[styles.placeholder, styles.dateLabel]}>Data Início:</Text>
                  <TouchableOpacity onPress={() => this.setState({ showDatePicker: true, dateType: 'start' })}>
                    <Text style={styles.dateValue}>
                      {startDate ? startDate.toLocaleDateString() : 'Selecione a data'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.state.showDatePicker && (
                  <DateTimePicker
                    value={this.state.dateType === 'start' ? this.state.startDate : this.state.deadlineDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      this.handleDateChange(event, selectedDate, this.state.dateType);
                      this.setState({ showDatePicker: false }); // Adiciona esta linha
                    }}
                    dateFormat="MM/DD/YYYY"
                  />
                )}
              </AreaInput>

              <AreaInput style={styles.dateContainer}>
                <View style={styles.dateRow}>
                  <Text style={[styles.placeholder, styles.dateLabel]}>Prazo final:</Text>
                  <TouchableOpacity onPress={() => this.setState({ showDatePicker: true, dateType: 'deadline' })}>
                    <Text style={styles.dateValue}>
                      {this.state.deadlineDate ? this.state.deadlineDate.toLocaleDateString() : 'Selecione a data'}
                    </Text>
                  </TouchableOpacity>

                </View>
                {this.state.showDatePicker && (
                  <DateTimePicker
                    value={this.state.dateType === 'start' ? this.state.startDate : this.state.deadlineDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => this.handleDateChange(event, selectedDate, this.state.dateType)}
                    dateFormat="MM/DD/YYYY"
                  />
                )}
              </AreaInput>

              {/* <AreaInput width={200}>
                  <Text>Prazo</Text>
                  <Input
                      underlineColorAndroid="transparent"
                      onChangeText={(term) => this.setState({ term })}
                      value={term}
                      keyboardType="numeric"
                  />
                  <Text>meses</Text>
              </AreaInput> */}

              <SubmitButton onPress={this.enviar}>
                <SubmitText>Enviar</SubmitText>
              </SubmitButton>
              </ScrollViewContent>
              </ScrollView>
          </Container>
        </Background>

    );
    }
}

export default Project;

const styles = StyleSheet.create({
    
    picker: {
      marginTop: 5,
      marginBottom: 10,
      width: 200,
      backgroundColor: '#F0FFF0',
    },
    dateContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: 300,
      backgroundColor: '#F0FFF0',
      padding: 10,
      marginBottom: 5,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dateLabel: {
        fontSize: 17,
        color: '#808080',
        marginBottom: 5,
      },
      dateValue: {
        fontSize: 17,
        color: '#000',  
        marginLeft: 5,   
      },
});



  