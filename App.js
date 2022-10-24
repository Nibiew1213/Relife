import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

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
    <View style={styles.appContainer}>
      <Button 
        title='Add New Goal' 
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      <GoalInput 
        visible={modalIsVisible} 
        onAddGoal={addGoalHandler} 
        onCancel={endAddGoalHandler} 
      />
      <View style={styles.goalsContainer}>
        <FlatList 
          data={lifeGoals} 
          renderItem={itemData => {
            return <GoalItem 
                      text={itemData.item.text} 
                      id={itemData.item.id}
                      onDeleteItem={deleteGoalHandler}/>
        }}
        keyExtractor={(item, index) => {
          return item.id
        }}
        /> 
      </View>
    </View>
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
