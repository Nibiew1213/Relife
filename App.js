import { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AllGoalsHome from './screens/AllGoalsHome'
import GoalItem from './components/GoalItem'
import NewGoal from './screens/NewGoal'
import ProgressGoal from './screens/ProgressGoal'
import CompletedGoal from './screens/CompletedGoal';

const Stack = createNativeStackNavigator() // will hold an object that gives access to 2 components -> Navigator component and Register-Screens Component 
const BottomTabs = createBottomTabNavigator() 

function GoalsOverview() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="AllGoalsHome" component={AllGoalsHome} /> 
      <BottomTabs.Screen name="NewGoal" component={NewGoal} />
    </BottomTabs.Navigator>
  )
}

export default function App() { // This is the root component
  // const [modalIsVisible, setModalIsVisible] = useState(false)
  // const [lifeGoals, setLifeGoals] = useState([]) // [] because we are handling array 

  // function startAddGoalHandler() {
  //   setModalIsVisible(true)
  // }

  // function endAddGoalHandler() {
  //   setModalIsVisible(false)
  // }

  // function addGoalHandler (enteredGoalText) {
  //   setLifeGoals(currentLifeGoals => [
  //     ...currentLifeGoals, 
  //     { text: enteredGoalText, id: Math.random().toString() }
  //   ])
  //   endAddGoalHandler()
  // }

  // function deleteGoalHandler(id) {
  //   setLifeGoals(currentLifeGoals => {
  //     return currentLifeGoals.filter((goal) => goal.id !== id)
  //   })
  // }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="GoalsOverview" component={GoalsOverview} />
          <Stack.Screen name="NewGoal" component={NewGoal} />
        </Stack.Navigator>
      {/* <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <NewGoal 
          visible={modalIsVisible} 
          onAddGoal={addGoalHandler} 
          onCancel={endAddGoalHandler} 
        />
        <Text> Goal in Progress </Text>
        <View style={styles.goalsContainer}> 
          <FlatList 
            data={lifeGoals} 
            renderItem={itemData => {
              return <GoalItem 
                        text={itemData.item.text} 
                        id={itemData.item.id}
                        onDeleteItem={deleteGoalHandler}
                      />
          }}
          keyExtractor={(item, index) => {
            return item.id
          }}
          />
        <Text> Completed Goals </Text> 
        </View>
      </View> */}
      </NavigationContainer>
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
