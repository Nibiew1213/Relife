import { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Modal, Image } from 'react-native'

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('') // '' because we are handling text

function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText)
}

function addGoalHandler() {
    props.onAddGoal(enteredGoalText)
    setEnteredGoalText('')
}

    return (
        <Modal visible={props.visible} animationType="slide"> 
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/images/addNewGoal.png')} />
                <TextInput 
                style={styles.textInput} 
                placeholder='Your life goal!' 
                onChangeText={goalInputHandler} 
                value={enteredGoalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={addGoalHandler}/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={props.onCancel}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalInput

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#000000'
    },
    image: {
        width: '100%',
        height: '30%',
        margin: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '100%',
        padding: 8
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row'
    },
    button: {
        width: 100,
        marginHorizontal: 8
    }
})