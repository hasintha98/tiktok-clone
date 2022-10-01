import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { TouchableHighlight } from '@gorhom/bottom-sheet'

export default function ProfilePostListItem({ item }) {
  const navigation = useNavigation()
  console.log("item", item.creator)
  return (

    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('userPosts', { creator: item.creator, profile: true })}
    >
      <Image style={styles.image} source={{ uri: item.media[1] }} />
    </TouchableOpacity  >

  )
}