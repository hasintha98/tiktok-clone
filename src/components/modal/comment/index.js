import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles'
import { TextInput } from 'react-native-paper'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react'
import { addComment, clearCommentListener, commentListener } from '../../../services/posts'
import { useEffect } from 'react'
import CommentItem from './item'
import generalStyles from '../../../styles/generalStyles'
const CommentModal = ({ post }) => {
    const currentUser = useSelector(state => state.auth.currentUser)
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState('')

    useEffect(() => {
        commentListener(post.id, setCommentList)
        return () => clearCommentListener()
    }, [])
    console.log(commentList)

    const handleCommentSend = () => {
        if (comment.length == 0) {
            return;
        }
        setComment('')
        addComment(post.id, currentUser.uid, comment)
    }

    const renderItem = ({ item }) => {
        return <CommentItem item={item}/>
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={commentList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <View style={styles.containerInput}>

                <Image
                    style={generalStyles.avatarSmall}
                    source={{ uri: currentUser.photoURL }}
                />
                <TextInput
                    value={comment}
                    onChangeText={setComment}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => handleCommentSend()}>
                    <Ionicons name='arrow-up-circle' size={34} color={'crimson'} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default CommentModal