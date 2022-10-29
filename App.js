import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GoalItem from './components/GoalItem'
import NewGoalScreen from './screens/NewGoalScreen'
import ProgGoalScreen from './screens/CompGoalScreen';

const Stack = createNativeStackNavigator()

export default function App() { // This is the root component
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [lifeGoals, setLifeGoals] = useState([]) // [] because we are handling array 

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler (enteredGoalText) {
    setLifeGoals(currentLifeGoals => [
      ...currentLifeGoals, 
      { text: enteredGoalText, id: Math.random().toString() }
    ])
    endAddGoalHandler()
  }

  function deleteGoalHandler(id) {
    setLifeGoals(currentLifeGoals => {
      return currentLifeGoals.filter((goal) => goal.id !== id)
    })
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
      <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <NewGoalScreen 
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
      </View>
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
