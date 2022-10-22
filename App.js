import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList} from 'react-native';

export default function App() { // This is the root component
  const [enteredGoalText, setEnteredGoalText] = useState('') // '' because we are handling text
  const [lifeGoals, setLifeGoals] = useState([]) // [] because we are handling array 

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText)
  }

  function addGoalHandler() {
    setLifeGoals(currentLifeGoals => [
      ...currentLifeGoals, 
      { text: enteredGoalText, id: Math.random().toString() }
    ])
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder='Your life goal!' 
          onChangeText={goalInputHandler} />
        <Button title='Add Goal' onPress={addGoalHandler}/>
      </View>
      <View style={styles.goalsContainer}>
        <FlatList 
          data={lifeGoals} 
          renderItem={itemData => {
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalText}> {itemData.item.text}</Text>
              </View>
            )
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
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1, // adds one line across the screen
    borderColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 5
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e08cc',
  },
  goalText: {
    color: 'white'
  }
})
