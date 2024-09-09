import React from "react";
import { View, ActivityIndicator} from 'react-native';

import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthRoutes from "./auth.routes";

import StackRoutes from './stackRoutes';
import Menu from "../pages/Menu";
import SignUp from "../pages/SignUp";
import Projeto from "../pages/Projeto";
import Metas from "../pages/Metas";
import Resultados from "../pages/Resultados";

import Feather from 'react-native-vector-icons/Feather';
const Tab = createBottomTabNavigator();

function Routes(){
  const loading = false;
  const signed = false;


return(
    signed ? <View></View> : <AuthRoutes/>
)
}

export default Routes;