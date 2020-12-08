// Conveniently import this file anywhere to use db

import firebase from 'firebase/app'
import 'firebase/database'

/** const firebaseConfig = {
  apiKey: "AIzaSyCPj4Fd3s_hfddqIPHuH0B_JhYMRmzForA",
  authDomain: "low-bandwidth-video-chat.firebaseapp.com",
  databaseURL: "https://low-bandwidth-video-chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "low-bandwidth-video-chat",
  storageBucket: "low-bandwidth-video-chat.appspot.com",
  messagingSenderId: "845986544709",
  appId: "1:845986544709:web:ad731651b8fbc9cae4b72c"
}

export const db = firebase
    .initializeApp(firebaseConfig)
    .database()
*/

    export const db = firebase
    .initializeApp({ databaseURL: 'https://low-bandwidth-video-chat-default-rtdb.europe-west1.firebasedatabase.app' })
    .database()