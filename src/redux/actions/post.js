import firebase from 'firebase/app'
import { CURRENT_USER_POSTS_UPDATE, USER_STATE_CHANGE } from '../constants'
import { saveMediaToStorage } from '../../services/random'
require('firebase/firestore')
require('firebase/firebase-auth')
import uuid from 'uuid-random'

export const createPost = (description, video, thumbnail) => dispatch => new Promise((resolve, reject) => {
    let storagePostId = uuid()
    let allSavePromises = Promise.all([
        saveMediaToStorage(video, `/post/${firebase.auth().currentUser.uid}/${storagePostId}/video`, 'video/mp4'),
        saveMediaToStorage(thumbnail, `/post/${firebase.auth().currentUser.uid}/${storagePostId}/thumbnail`, 'image/jpeg')
    ])
    allSavePromises
    .then((media) => {
        console.log("media -- >" , media)
        firebase.firestore()
        .collection('post')
        .add({
            creator: firebase.auth().currentUser.uid,
            media,
            description,
            likesCount: 0,
            commentCount: 0,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => resolve())
        .catch(() => reject())
    })
    .catch(() => reject())
})


export const getPostsByUser = (uid = firebase.auth().currentUser.uid) => dispatch => new Promise((resolve, reject) => {
    firebase.firestore()
    .collection('post')
    .where('creator', '==', uid)
    .orderBy('creation', 'desc')
    .onSnapshot(snapShot => {
        let posts = snapShot.docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            return {id, ...data}
        })
        console.log("posts",posts)
        dispatch({type: CURRENT_USER_POSTS_UPDATE, currentUserPosts: posts})
    })
})
