import { useState, useContext, useEffect, } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons' 
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AllGoalsHome from './screens/AllGoalsHome'
import ManageGoal from './screens/ManageGoal'

import { GlobalStyles } from './constants/styles'
import { Colors } from './constants/authStyles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/UI/IconButton'
import AuthIconButton from './components/UI/AuthIconButton';
import GoalsContextProvider from './store/goals-context'

const Stack = createNativeStackNavigator() // will hold an object that gives access to 2 components -> Navigator component and Register-Screens Component 
const BottomTabs = createBottomTabNavigator() 

function AuthStack() { // holds screens for login and register
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() { // holds screens for authenticated users
  const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white'
        }}
      >
        <Stack.Screen name="Goals Overview" 
          component={GoalsOverview}
          options={{
            headerRight: ({ tintColor }) => (
            <AuthIconButton 
              icon="exit" 
              color={tintColor} 
              size={24} 
              onPress={authCtx.logout} 
            />
            )
          }} 
        />
         <Stack.Screen 
          name="ManageGoal" 
          component={ManageGoal}
          options={{
            presentation: 'modal'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext)

    return (
        <NavigationContainer independent={true}>
          {!authCtx.isAuthenticated && <AuthStack />}
          {authCtx.isAuthenticated && <AuthenticatedStack />} 
        </NavigationContainer> // switching between navigation stacks depending on Authenticated status   
  )
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function fetchToken() {
        const storedToken = await AsyncStorage.getItem('token')
    
        if (storedToken) {
            authCtx.authenticate(storedToken)
        }

        setIsTryingLogin(false)
    }   

    fetchToken()
  }, [])

  if (isTryingLogin) {
    return <AppLoading />
  }

  return <Navigation />
}

function GoalsOverview() {
  return (
    <BottomTabs.Navigator 
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,       
      })}
      >
      <BottomTabs.Screen 
        name="AllGoalsHome" 
        component={AllGoalsHome}
        options={{
          title: "person's goal",
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
          <Ionicons name="home" size={size} color={color} />
          )
        }} 
      /> 
      <BottomTabs.Screen 
        name="NewGoal" 
        component={ManageGoal}
        options={{
          title: 'Add New Goal',
          tabBarLabel: 'Add New Goal',
          tabBarIcon: ({color, size}) => (
          <Ionicons name="add-circle" size={size} color={color} />
          )
        }} 
      />
    </BottomTabs.Navigator>
  )
}

export default function App() { // This is the root component
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <GoalsContextProvider>
          <Root />
        </GoalsContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({ // Styling for root component 
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  goalsContainer: {
    flex: 5
  }
})

