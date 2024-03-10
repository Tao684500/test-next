import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgg3vtBunMd8EdmUFKyZ-cv4xa5XOHgUU",
    authDomain: "next-todo-2f05b.firebaseapp.com",
    projectId: "next-todo-2f05b",
    storageBucket: "next-todo-2f05b.appspot.com",
    messagingSenderId: "225791188346",
    appId: "1:225791188346:web:0b7b29c722c29653350ac3",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)