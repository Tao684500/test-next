import React, { useState, useEffect, useRef } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

export default function useFetchTodos() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [todos, setTodos] = useState(null)


    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    console.log(docSnap.data());
                    setTodos(docSnap.data().todos)
                } 
            } catch (err) {
                setError('Failed to load todos')
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { loading, error, todos, setTodos}
}
