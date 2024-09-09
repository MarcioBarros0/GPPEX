
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Menu from '../pages/Menu';
import Projeto from '../pages/Projeto';
import Metas from '../pages/Metas';
import Resultados from '../pages/Resultados';

const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: false,
                }}
            />

            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  headerStyle:{
                    backgroundColor: '#2F4F4F',
                    borderBottomWidth: 1,
                  },
                  headerTintColor: '#FFF',
                  headerTitle: 'Voltar',
                headerBackTitleVisible: false,
                }}
            />

            <AuthStack.Screen
                name="Menu"
                component={Menu}
                options={{
                    headerStyle:{
                        backgroundColor: '#2F4F4F',
                        borderBottomWidth: 1,
                      },
                      headerTintColor: '#FFF',
                      headerTitle: 'Voltar',
                    headerBackTitleVisible: false,
                }}
            />

            <AuthStack.Screen
                name="Projeto"
                component={Projeto}
                options={{
                    title: 'Projeto',
                    headerStyle:{
                     backgroundColor: '#2F4F4F',
                     },
                    headerTintColor: '#FFF',
                    justifyContent: 'center'
            }}
            />

            <AuthStack.Screen
                name="Metas"
                component={Metas}
                options={{
                    title: 'Metas',
                    headerStyle:{
                     backgroundColor: '#2F4F4F',
                     },
                    headerTintColor: '#FFF',
                    justifyContent: 'center'
            }}
            />

            <AuthStack.Screen
                name="Resultados"
                component={Resultados}
                options={{
                    title: 'Resultados Laboratoriais',
                    headerStyle:{
                     backgroundColor: '#2F4F4F',
                     },
                    headerTintColor: '#FFF',
                    justifyContent: 'center'
            }}
            />

        </AuthStack.Navigator>
        
    )
}

export default AuthRoutes;