import { useContext, useState } from "react"
import { View, Text, StyleSheet, Alert } from "react-native"

import GoalInput from "./GoalInput"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"
import { GlobalStyles } from "../../constants/styles"



function GoalForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
    const [inputs, setInputs] = useState({
        title: {
            value: defaultValues ? defaultValues.title : '',
            isValid: true // set to true to prevent err msg when visiting add goal page
            // isValid: !!defaultValues // is same as defaultValues ? true : false
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
            // isValid: !!defaultValues // if default values exist, its true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        }
    })

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true } // [<->] allows set and target properties dynamically 
            }  // when entering, assume is valid first, will turn to invalid after input error
        })
    }

    function submitHandler() {
        // const authCtx = useContext(AuthContext)
        const goalData ={
            
            title: inputs.title.value,
            description: inputs.description.value,
            date: new Date(inputs.date.value), // Date constructor function converts string to date object
            // UUID: authCtx.UUID
        }

        // helper constants for user input validation
        const titleIsValid = goalData.title.trim().length > 0 // check if input is empty, trim for 'spaces' input 
        const descriptionIsValid = goalData.description.trim().length > 0 // check if input is empty, trim for 'spaces' input 
        const dateIsValid = goalData.date.toString() !== 'Invalid Date' 
        // in JS, new Date('2022-11-05') returns a valid date object, if new Date('hello') will return 'Invalid Date'

        if (!titleIsValid || !descriptionIsValid || !dateIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values')
            setInputs((currentInputs) => {
                return { // Updating the states if something invalid was entered
                    title: { value: currentInputs.title.value, isValid: titleIsValid },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsValid }
                }
            })
            return
        }

        onSubmit(goalData)
    }

    // helper constant to return JSX code upon invalid input
    const formIsInvalid = // if one of the below is invalid, overall forms become invalid
        !inputs.title.isValid || 
        !inputs.description.isValid || 
        !inputs.date.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.heading}>Your Goal</Text>
            <GoalInput 
                label="Title"
                invalid={!inputs.title.isValid}  
                textInputConfig={{
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    maxLength: 26,
                    onChangeText: inputChangedHandler.bind(this, 'title'), // two-way binding
                        value: inputs.title.value
                }}
            />
            <GoalInput 
                label="Description"
                invalid={!inputs.description.isValid}  
                textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                        value: inputs.description.value
                }}
            />
            <GoalInput 
                label="Targeted Completion Date"
                invalid={!inputs.date.isValid} 
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }} 
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>
                    Invalid input values - please check your entry!
                </Text>
            )}
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

export default GoalForm

const styles = StyleSheet.create({
    form: {
        marginVertical: 40
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 1,
        textAlign: 'center'
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
})