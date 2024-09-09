import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StatusBar } from "react-native";
import firebase from './src/firebaseConnection';



import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';

export default function App(){
  

  return(
    <NavigationContainer>
      <AuthProvider>
      <StatusBar backgroundColor="#008000" barStyle="dark-content" />
        <View>

        </View>
      <Routes/>
      </AuthProvider>
    </NavigationContainer>
  )
}
