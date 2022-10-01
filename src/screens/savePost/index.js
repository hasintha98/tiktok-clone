import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { createPost } from '../../redux/actions'

export default function SavePostScreen(props) {
    const [description, setDescription] = useState('')
    const [requestRunning, setRequestRunning] = useState(false)
    const navigation = useNavigation()

    const dispatch = useDispatch()

    const handleSavePost = () => {
        setRequestRunning(true)
        dispatch(createPost(description, props.route.params.source, props.route.params.sourceThumb))
        .then(() => {
            navigation.dispatch(StackActions.popToTop())
            .catch(() => setRequestRunning(false))
        })

    }

    if(requestRunning) {
        return (
        <View style={styles.uploadingContainer}>
            <ActivityIndicator color='red' size={'large'} />
        </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder='Describe your videos'
                    multiline
                    maxLength={150}
                    onChangeText={(text) => setDescription(text)}
                    style={styles.inputText}
                />
                <Image
                    style={styles.mediaPreview}
                    source={{ uri: props.route.params.source }}
                />
            </View>
            <View style={styles.spacer} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={styles.cancelButton}
                >
                    <Feather name='x' size={24} color="black" />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSavePost()}
                    style={styles.postButton}
                >
                    <Feather name='corner-left-up' size={24} color="white" />
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}