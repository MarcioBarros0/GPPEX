import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function TaskList ({data, deleteItem, editItem}){
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{marginRight:10}} onPress={ () => deleteItem(data.key) }>
                <Feather name="trash" color="#2F4F4F" size={20}/>
            </TouchableOpacity>
            

            <View style={{ padding: 10 }}>
                <TouchableWithoutFeedback onPress={() => editItem(data) }>
                    <Text style={{color: '#121212', paddingRight: 10}}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 10,
            padding: 10,
            borderRadius: 8,
            borderWidth:1,
            borderColor: '#141414',
            backgroundColor: '#F0FFF0',
            marginTop: 10,
            alignItems: 'center',
          },
    })