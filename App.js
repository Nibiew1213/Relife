import { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons' 

import AllGoalsHome from './screens/AllGoalsHome'
import GoalItem from './components/GoalsOutput/GoalItem'
import NewGoal from './screens/NewGoal'
import ManageGoal from './screens/ManageGoal'
import CompletedGoal from './screens/CompletedGoal';

import { GlobalStyles } from './constants/styles'
import IconButton from './components/UI/IconButton'
import GoalsContextProvider from './store/goals-context'

const Stack = createNativeStackNavigator() // will hold an object that gives access to 2 components -> Navigator component and Register-Screens Component 
const BottomTabs = createBottomTabNavigator() 

function GoalsOverview() {
  return (
    <BottomTabs.Navigator 
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          <IconButton 
            icon="add" 
            size={24} 
            color={tintColor} 
            onPress={() => {
              navigation.navigate('ManageGoal')
            }}
          />
        )        
      })}
      >
      <BottomTabs.Screen 
        name="AllGoalsHome" 
        component={AllGoalsHome}
        options={{
          title: 'All Goals Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
          <Ionicons name="home" size={size} color={color} />
          )
        }} 
      /> 
      <BottomTabs.Screen 
        name="NewGoal" 
        component={NewGoal}
        options={{
          title: 'Adding New Goal',
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
      <GoalsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white'
            }}
          >
            <Stack.Screen name="GoalsOverview" 
              component={GoalsOverview}
              options={{ headerShown: false }}
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
      </GoalsContextProvider>
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
