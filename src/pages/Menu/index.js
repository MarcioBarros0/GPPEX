import React from "react";
import { Platform } from "react-native";
import firebase from '../../firebaseConnection';

import { useNavigation } from '@react-navigation/native';
import { 
    Background,
    Container, 
    TouchableOpacity,
    SubmitButton, 
    SubmitText,
    
} from  "./styles";

async function logout() {
    console.log('Função de logout chamada');
    try {
        await firebase.auth().signOut();
        console.log('Logout bem-sucedido');
        // Limpar qualquer estado ou redirecionar para a tela de login, se necessário
        navigation.navigate('SignIn');
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}

export default function Menu(){
    const navigation = useNavigation();


    async function logout() {
        console.log('Função de logout chamada');
        try {
            await firebase.auth().signOut();
            console.log('Logout bem-sucedido');
            // Limpar qualquer estado ou redirecionar para a tela de login, se necessário
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    
    return(
        <Background>
            
            <Container
               behavior={Platform.OS === 'ios' ? 'padding' : ''}  
               enabled>
        <TouchableOpacity> 
             <SubmitButton onPress={ () => navigation.navigate('SignUp')}>
               <SubmitText>Cadastro Membro</SubmitText>
            </SubmitButton>
            
            <SubmitButton onPress={ () => navigation.navigate('Projeto')}>
               <SubmitText>Cadastro Projeto</SubmitText>
            </SubmitButton>
       
            <SubmitButton onPress={ () => navigation.navigate('Metas')}>
               <SubmitText>Metas</SubmitText>
            </SubmitButton>
            <SubmitButton onPress={ () => navigation.navigate('Resultados')}>
               <SubmitText>Resultados Laboratoriais</SubmitText>
            </SubmitButton>

            <SubmitButton onPress={logout}>
            <SubmitText>Logout</SubmitText>
            </SubmitButton>
        </TouchableOpacity>
        </Container>
        </Background>
    );
}
