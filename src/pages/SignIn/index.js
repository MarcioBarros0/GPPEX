import React, { useState, useEffect } from 'react';
import { Keyboard, Platform } from "react-native";
import firebase from '../../firebaseConnection';
import { useNavigation } from '@react-navigation/native';

import { 
    Background,
    Container, 
    Logo, 
    AreaInput,
    Text, 
    Input, 
    SubmitButton, 
    SubmitText,
    Link,
    LinkText
} from "./styles";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function SignIn(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function logar() {
      try {
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
  
        // Limpar os campos após o login
        Keyboard.dismiss();
        setEmail('');
        setPassword('');
  
        // Navegar para a página de Menu
        navigation.navigate('Menu');
      } catch (error) {
        // Se houver um erro, exibir mensagem de alerta
        alert('Ops, algo deu errado!');
        console.error(error);
      }
    }

        return(   
        <Background>
            
            <Container
               behavior={Platform.OS === 'ios' ? 'padding' : ''}  
               enabled>

               <Logo
                  source={require('../../assets/GPPEX.png')}
               />
                  
               <AreaInput>
                  <Text>Email</Text>
                  <Input
                     underlineColorAndroid="transparent"
                     onChangeText={(texto)=> setEmail(texto)}
                     value={email}
                  />
               </AreaInput>

               <AreaInput>
               <Text>Senha</Text>
                  <Input
                     underlineColorAndroid="transparent"
                     onChangeText={(texto)=> setPassword(texto)}
                     value={password}
                     secureTextEntry
                  />
               </AreaInput>
            
               <Link>
                  <LinkText>Lembrar Login</LinkText>
               </Link>

               <SubmitButton onPress={logar}>
                  <SubmitText>Login</SubmitText>
               </SubmitButton>

               <SubmitButton>
                  <SubmitText>Esqueci minha senha</SubmitText>
               </SubmitButton>
               
               <SubmitButton onPress={ () => navigation.navigate('SignUp')}>
                  <SubmitText>Novo Membro</SubmitText>
               </SubmitButton>

            </Container>
        </Background>
    )
}
