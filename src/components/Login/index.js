import React, { useState } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (type === 'login') {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log(user.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log(user.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <TextInput
                placeholder="Seu email"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                placeholder="******"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
                style={styles.handleLogin}
                onPress={handleLogin}
            >
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={{ textAlign: 'center' }}>Criar uma Conta</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderRadius: 4,
        height: 45,
        borderWidth: 1,
        borderColor: '#141414',
        padding: 10,
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#008000',
        height: 45,
        marginBottom: 10,
    },
    loginText: {
        color: '#FFF',
        fontSize: 17,
    }
});
