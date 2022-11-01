import { useContext, useState } from 'react'
import { Alert } from 'react-native'

import AuthContent from '../components/Auth/AuthContent'
import AuthLoadingOverlay from '../components/UI/AuthLoadingOverlay'
import { AuthContext } from '../store/auth-context'
import { login } from '../util/auth'

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false) // loading state

    const authCtx = useContext(AuthContext)

    async function loginHandler({email, password}) {
        setIsAuthenticating(true)
        try {
            const token = await login(email, password)
            authCtx.authenticate(token)
        } catch (error) {
            Alert.alert(
                'Authentication failed!',
                'Please enter correct credentials or try again later.'
                )
            setIsAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <AuthLoadingOverlay message="Logging in..." />
    }

    return <AuthContent isLogin onAuthenticate={loginHandler}/>
}

export default LoginScreen;