import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles'
import ProfileNavBar from '../../components/profile/navBar'
import ProfileHeader from '../../components/profile/header'
import ProfilePostList from '../../components/profile/postList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CurrentUserProfileItemInViewContext } from '../../navigation/feed'
import { useContext } from 'react'
import { useUser } from '../../hooks/useUser'
import { useEffect } from 'react'
import { getPostsByUserId } from '../../services/posts'
import { useState } from 'react'

export default function ProfileScreen({route}) {
  const {initialUserId} = route.params

  const [userPosts, setUserPosts] = useState([])

  let providerUserId = null
  if(CurrentUserProfileItemInViewContext != null) {
    providerUserId = useContext(CurrentUserProfileItemInViewContext)
  }

  
  const user = useUser(initialUserId ? initialUserId: providerUserId ).data
 
  useEffect(() => {
   
    if(user === undefined) {
      return
    }
   
    getPostsByUserId(user.uid).then(setUserPosts)
  }, [user])
  if(user === undefined) {
    return <></>
  }
  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={user} />
      <ScrollView>
        <ProfileHeader user={user} />
        <ProfilePostList posts={userPosts} />
      </ScrollView>
    </SafeAreaView>
  )
}