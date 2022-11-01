import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    token: '', // store token received from Firebase Auth
    isAuthenticated: false, // helper variable to tell if user is logged in or not
    authenticate: (token) => {}, // method for changing state when user sign-up or sign-in successfully
    logout: () => {} // method to clear authentication status by removing token
})

function AuthContextProvider({children}) { // responsible for managing AuthContext state
    const [authToken, setAuthToken] = useState() // empty state due no token initially

    function authenticate(token) { // triggered if user log in or sign up successfully
        setAuthToken(token)
        AsyncStorage.setItem('token', token) // store token in phone
    }

    function logout() { // remove token when logged out
        setAuthToken(null)
        AsyncStorage.removeItem('token')
    }

    const value = {
        token: authToken, 
        isAuthenticated: !!authToken, // !! converts a truthy or falsey value to true or false
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> // value={value} expose AuthContext with any part of the app
}

export default AuthContextProvider // to expose, need tp wrap AuthContextProvider around Navigation container in App.js(root)