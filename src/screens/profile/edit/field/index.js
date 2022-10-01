import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import NavBarGeneral from '../../../../components/profile/general/navbar'
import { Divider, TextInput } from 'react-native-paper'
import generalStyles from '../../../../styles/generalStyles'
import { saveUserField } from '../../../../services/user'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export default function EditProfileFieldScreen({ route }) {
    const { title, field, value } = route.params
    const [textInputValue, setTextInputValue] = useState(value)
    const navigation = useNavigation()
    const onSave = () => {
        saveUserField(field, textInputValue)
        .then(() => navigation.goBack())
        console.log("Field saved")
    }
    return (
        <SafeAreaView style={styles.container}>
            <NavBarGeneral title={title} leftButton={{ display: true, name: 'save', action: onSave }} />
            <Divider />
            <View style={styles.mainContainer}>
                <Text style={styles.title}>{title}</Text>
                <TextInput
                    style={generalStyles.textInput}
                    onChangeText={setTextInputValue}
                    value={textInputValue}
                />
            </View>
        </SafeAreaView>
    )
}