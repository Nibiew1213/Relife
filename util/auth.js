import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../store/auth-context'


const API_KEY = 'AIzaSyA51ntpO-p9MQr1OgNOvsitlZTB2H9x7wA' //key=[Web API Key], can be found under Firebase Project settings gear icon
// const authCtx = useContext(AuthContext)

async function authenticate(mode, email, password) { // mode is either sign-up or sign-in
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    })
    console.log(response.data)
    const token = response.data.idToken 

    // Store UUID of authenticated user to AuthContext
    // const UUID = response.data.localId
    // authCtx.UUID(UUID)


    return token
}

export function createUser(email, password) { 
    return authenticate('signUp', email, password) // signUp written just as in Firebase Auth "Sign up with email / password" url segment, replace ${mode} 
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password) // signInWithPassword written just as in FireBase Auth "Sign in with email / password" url segment, replace ${mode}  
}

