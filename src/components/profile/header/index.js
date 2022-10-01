import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { Avatar } from 'react-native-paper'
import { userAuthStateListener } from '../../../redux/actions'
import { buttonStyles } from '../../../styles'
import { useNavigation } from '@react-navigation/native'
import firebase from 'firebase'
export default function ProfileHeader({user}) {
  const navigation = useNavigation()
  const renderFollowButton = () => {
    const isFollowing = false
    if(isFollowing) {
      
    }
  }
  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon={"account"} />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      {firebase.auth().currentUser.uid === user.uid ? 
      <TouchableOpacity onPress={() => navigation.navigate('editProfile')} style={buttonStyles.grayOutlinedButton}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>: null}
      
    </View>
  )
}