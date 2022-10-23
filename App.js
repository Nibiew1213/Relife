import { useState } from 'react';
import { StyleSheet, View, FlatList} from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() { // This is the root component
  
  const [lifeGoals, setLifeGoals] = useState([]) // [] because we are handling array 


  function addGoalHandler (enteredGoalText) {
    setLifeGoals(currentLifeGoals => [
      ...currentLifeGoals, 
      { text: enteredGoalText, id: Math.random().toString() }
    ])
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList 
          data={lifeGoals} 
          renderItem={itemData => {
            return <GoalItem text={itemData.item.text}/>
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
