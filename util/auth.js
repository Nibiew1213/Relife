import axios from 'axios'

const API_KEY = 'AIzaSyB6wJYYdR9EMSvB7YW5w5Kgwc_x6uaGBV8' //key=[Web API Key], can be found under Firebase Project settings gear icon

async function authenticate(mode, email, password) { // mode is either sign-up or sign-in
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    })
    // console.log(response.data)
    const token = response.data.idToken 

    return token
}

export function createUser(email, password) { 
    return authenticate('signUp', email, password) // signUp written just as in Firebase Auth "Sign up with email / password" url segment, replace ${mode} 
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password) // signInWithPassword written just as in FireBase Auth "Sign in with email / password" url segment, replace ${mode}  
}