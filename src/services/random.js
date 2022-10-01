import firebase from 'firebase/app'
require('firebase/firebase-storage')
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/firebase-storage';
import { storage } from '../../App';
export const saveMediaToStorage = (media, path, contentType) => new Promise(async (resolve, reject) => {
    console.log(media)
        //const uploadUri = media.replace('file://', '')
        //console.log(uploadUri)
        const fileRef = firebase.storage().ref(path)

        const metadata = {
            contentType: contentType,
          };

    fetch(media)
        .then(response => response.blob())
        .then(blob => fileRef.put(blob, metadata))
        .then(task => task.ref.getDownloadURL())
        .then(downloadUrl => resolve(downloadUrl))
        .catch(() => {
            console.log("REJECT")
            reject("REJECT")
        })




})