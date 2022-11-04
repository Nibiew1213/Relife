import { useState } from 'react'
import { Alert, StyleSheet, View, Text, Image, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import FlatButton from '../UI/FlatButton'
import AuthForm from './AuthForm'
import { Colors } from '../../constants/authStyles'

function AuthContent({ isLogin, onAuthenticate }) {
    const navigation = useNavigation()

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace('Register') // .replace doesn't gives back button, unlike .navigate
        } else {
            navigation.replace('Login')
        }
    }

    function submitHandler(credentials) {
        let { email, confirmEmail, password, confirmPassword } = credentials;

        email = email.trim();
        password = password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6; // Firebase Auth requires at least 7 characters long
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if (
        !emailIsValid ||
        !passwordIsValid ||
        (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
        Alert.alert('Invalid input', 'Please check your entered credentials.');
        setCredentialsInvalid({
            email: !emailIsValid,
            confirmEmail: !emailIsValid || !emailsAreEqual,
            password: !passwordIsValid,
            confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
        }
        onAuthenticate({ email, password });
    }

  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Relife</Text>
      </View>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? 'Register' : 'Log in instead'}
          </FlatButton>
        </View>
      </View>
      <Image 
        source={require('../../assets/images/start.png')}
        style={styles.image}
      />
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  title: {
   alignItems: 'center',
   marginVertical: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width: 400,
    height: 300,
    marginTop: 20
  }
});