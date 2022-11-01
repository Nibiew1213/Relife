import { useContext, useState } from 'react'
import { Alert } from 'react-native'

import AuthContent from '../components/Auth/AuthContent'
import AuthLoadingOverlay from '../components/UI/AuthLoadingOverlay'
import { AuthContext } from '../store/auth-context'
import { createUser } from '../util/auth'

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false) // loading state

    const authCtx = useContext(AuthContext)

    async function signupHandler({email, password}) {
        setIsAuthenticating(true)
        try {
            const token = await createUser(email, password)
            authCtx.authenticate(token)
        } catch (error) {
            Alert.alert(
                'Authentication failed', 
                'Please check your input and try again.' 
            )
            setIsAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <AuthLoadingOverlay message="Creating user..." />
    }

    return <AuthContent onAuthenticate={signupHandler}/>
}

export default SignupScreen;