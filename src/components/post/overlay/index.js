import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import { useEffect } from 'react';
import { getLikeById, updateLike } from '../../../services/posts';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { throttle } from 'throttle-debounce';
import { openCommentModal } from '../../../redux/actions/modal';
import { useNavigation } from '@react-navigation/native';

export default function PostSingleOverlay({ user, post }) {
    const currentUser = useSelector((state) => state.auth.currentUser)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [currentLikesState, setCurrentLikesState] = useState({ state: false, counter: post.likesCount })

    useEffect(() => {
        console.log(post.description, post.likesCount)
        getLikeById(post.id, currentUser.uid).then((res) => {

            setCurrentLikesState({
                ...currentLikesState,
                state: res,

            })
        })
    }, [])


    const handleUpdateLikes = () => {
        setCurrentLikesState({ state: !currentLikesState.state, counter: currentLikesState.counter + (currentLikesState.state ? -1 : 1) })

        updateLike(post.id, currentUser.uid, currentLikesState.state)
    }

    // const handleUpdateLike = useMemo(
    //     () =>
    //         throttle(500, true, (currentLikesStateInst) => {
    //             console.log("currentLikesStateInst",currentLikesStateInst)
    //             setCurrentLikesState({
    //                 state: !currentLikesStateInst.state,
    //                 counter: currentLikesStateInst.counter + (currentLikesStateInst.state ? -1 : 1)
    //             })

    //             updateLike(post.id, currentUser.uid, currentLikesStateInst.state)
    //         })
    //     , []
    // )
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.displayName}>{user?.displayName}</Text>
                <Text style={styles.description}>{post.description}</Text>
            </View>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('profileOther', {initialUserId: user?.uid})}>
                    <Image style={styles.avatar} source={{ uri: user?.photoURL }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleUpdateLikes()}>
                    <Ionicons color={'white'} size={40} name={currentLikesState.state ? 'heart' : "heart-outline"} />
                    <Text style={styles.actionButtonText}>{currentLikesState.counter}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => dispatch(openCommentModal(true, post))}>
                    <Ionicons color={'white'} size={40} name={"chatbubble"} />
                    <Text style={styles.actionButtonText}>{post.commentCount}</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}