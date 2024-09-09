
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/SignIn";
import Menu from "../pages/Menu";
import SignUp from "../pages/SignUp";
import Projeto from "../pages/Projeto";
import Metas from "../pages/Metas";
import Resultados from "../pages/Resultados";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator>
          <Stack.Screen
          name="Home"
            component={Home}
            options={{
              title: 'Tela início',
              headerStyle:{
                backgroundColor: '#008000'
              },
              headerTintColor: '#FFF',
              headerShown: false,
            }}
            />
          
          <Stack.Screen
          name="Menu"
            component={Menu}
            options={{
              title: 'Menu',
              headerStyle:{
                backgroundColor: '#008000'
              },
              headerTintColor: '#FFF'
            }}
            />
          
          <Stack.Screen
          name="SignUp"
            component={SignUp}
            options={{
              title: 'Cadastro',
              headerStyle:{
                backgroundColor: '#008000'
              },
              headerTintColor: '#FFF'
            }}
            />
          
          <Stack.Screen
          name="Projeto"
            component={Projeto}
            options={{
              title: 'Projeto',
              headerStyle:{
                backgroundColor: '#008000'
              },
              headerTintColor: '#FFF'
            }}
            />
          
          <Stack.Screen
          name="Metas"
            component={Metas}
            options={{
              title: 'Metas',
              headerStyle:{
                backgroundColor: '#008000'
              },
              headerTintColor: '#FFF'
            }}
            />
          
          <Stack.Screen
          name="Resultados"
            component={Resultados}
            options={{
              title: 'Resultados',
              headerStyle:{
                backgroundColor: '#008000'
              },
              headerTintColor: '#FFF'
            }}
            />
          </Stack.Navigator>
        )
}