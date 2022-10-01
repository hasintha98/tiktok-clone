import { saveMediaToStorage } from "./random"
import firebase from 'firebase'

export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
    saveMediaToStorage(image, `profileImage/${firebase.auth().currentUser.uid}`, 'image/jpeg').then((res) => {
        firebase.firestore()
            .collection('user')
            .doc(firebase.auth().currentUser.uid)
            .update({
                photoURL: res
            })
            .then(() => resolve())
            .catch(() => reject())
    })
})

export const saveUserField = (field, value) => new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value
    firebase.firestore()
        .collection('user')
        .doc(firebase.auth().currentUser.uid)
        .update(obj)
        .then(() => resolve())
        .catch(() => reject())

})

export const queryUserByEmail = (email) => new Promise((resolve, reject) => {
    // email = test@g
    if (email == '') {
        resolve([])
    }
    firebase.firestore()
        .collection('user')
        .where('email', '>=', email)
        .where('email', '<=', email + '\uf8ff')
        .get()
        .then((snapShot) => {
            let users = snapShot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id;
                return { id, ...data}
            })

            resolve(users)
        })
        .catch(() => reject())

})

export const getUserById = (id) => new Promise((resolve, reject) => {
    console.log("called")
    firebase.firestore()
        .collection('user')
        .doc(id)
        .get()
        .then((snapShot) => {
            resolve(snapShot.exists ? snapShot.data() : null )
        })
        .catch(() => reject())

})