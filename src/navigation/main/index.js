import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAuthStateListener } from '../../redux/actions'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthScreen from '../../screens/auth'
import HomeScreen from '../home'
import SavePostScreen from '../../screens/savePost'
import EditProfileScreen from '../../screens/profile/edit'
import EditProfileFieldScreen from '../../screens/profile/edit/field'
import Modal from '../../components/modal'
import ProfileScreen from '../../screens/profile'
import FeedScreen from '../../screens/feed'
const Stack = createNativeStackNavigator()

export default function Route() {

  const currentUserObj = useSelector(state => state.auth)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userAuthStateListener())
  }, [])

  console.log(currentUserObj)

  if (!currentUserObj.loaded) {
    return (
      <View></View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUserObj.currentUser == null ?
          <Stack.Screen name='auth' component={AuthScreen} options={{ headerShown: true }} /> :
          <>
            <Stack.Screen name='home' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='savePost' component={SavePostScreen} options={{ headerShown: false }} />
            <Stack.Screen name='userPosts' component={FeedScreen} options={{ headerShown: false }} />
            <Stack.Screen name='profileOther' component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name='editProfile' component={EditProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name='editProfileField' component={EditProfileFieldScreen} options={{ headerShown: false }} />
            
          </>
        }

      </Stack.Navigator>
      <Modal />
    </NavigationContainer>
  )
}