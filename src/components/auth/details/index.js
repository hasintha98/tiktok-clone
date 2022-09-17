import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import styles from './style';
import { useDispatch } from 'react-redux'
import { login, register } from '../../../redux/actions';

export default function AuthDetails({ authPage, setDetailsPage }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = () => {
        console.log("login")
        dispatch(login(email, password)).then(() => {
            console.log("Success")
        })
            .catch(() => {
                console.log("Fail")
            })
    }

    const handleRegister = () => {
        console.log("register")
        console.log(email, password)
        dispatch(register(email, password)).then(() => {
            console.log("Success")
        })
            .catch(() => {
                console.log("Fail")
            })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setDetailsPage(false)}>
                <Feather name='arrow-left' size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                style={styles.textInput}
            />
            <TextInput
                onChangeText={(e) => setPassword(e)}
                placeholder="Password"
                secureTextEntry
                style={styles.textInput}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => authPage == 0 ? handleLogin() : handleRegister()}
            >
                <Text style={styles.buttonText}>{authPage == 0 ? 'Sign In' : 'Sign Up'}</Text>
            </TouchableOpacity>
        </View>
    )
}