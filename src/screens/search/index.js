import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import styles from './styles'
import SearchUserItem from '../../components/search/userItem'
import { useEffect } from 'react'
import { queryUserByEmail } from '../../services/user'

export default function SearchScreen() {
    const [textInput, setTextInput] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    useEffect(() => {
      
    
    queryUserByEmail(textInput)
    .then(setSearchUsers)
    }, [textInput])
    
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={setTextInput}
                style={styles.textInput}
                placeholder={'Search'}
            />
            <FlatList
                data={searchUsers}
                renderItem={({ item }) => <SearchUserItem item={item} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}