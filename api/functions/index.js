const functions = require("firebase-functions");

const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore();

exports.newUser = functions.auth.user().onCreate((user) => {
    return db
    .collection("user")
    .doc(user.uid)
    .create(JSON.parse(JSON.stringify(user)))
})

exports.likeCreate = functions.firestore.document('post/{id}/{type}/{uid}').onCreate((_, context) => {
    let updateObj = {}
    if(context.params.type == 'comments') {
        updateObj = {
            commentCount: admin.firestore.FieldValue.increment(1)
        }
    }

    if(context.params.type == 'likes') {
        updateObj = {
            likesCount: admin.firestore.FieldValue.increment(1)
        }
    }
    return db
    .collection("post")
    .doc(context.params.id)
    .update(updateObj)
})

exports.likeDelete = functions.firestore.document('post/{id}/{type}/{uid}').onDelete((_, context) => {
    let updateObj = {}
    if(context.params.type == 'comments') {
        updateObj = {
            commentCount: admin.firestore.FieldValue.increment(-1)
        }
    }

    if(context.params.type == 'likes') {
        updateObj = {
            likesCount: admin.firestore.FieldValue.increment(-1)
        }
    }
    return db
    .collection("post")
    .doc(context.params.id)
    .update(updateObj)
})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
