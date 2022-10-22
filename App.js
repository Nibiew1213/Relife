import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() { // This is the root component
  return (
    // <View style={styles.appContainer}>
    //   <View style={styles.inputContainer}>
    //     <TextInput style={styles.textInput} placeholder='Your life goal!'/>
    //     <Button title='Add Goal'/>
    //   </View>
    //   <View>
    //     <Text>List of goals...</Text>
    //   </View>
    // </View>
    <View style={{ padding: 50, flexDirection: 'row', width: '100%', height: 300, justifyContent: 'space-around', alignItems: 'stretch' }}>
    <View
      style={{
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>1</Text>
    </View>
    <View
      style={{
        backgroundColor: 'blue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>2</Text>
    </View>
    <View
      style={{
        backgroundColor: 'green',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>3</Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({ // Styling for root component 
  appContainer: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '80%',
    marginRight: 8,
    padding: 8
  }
  
});
