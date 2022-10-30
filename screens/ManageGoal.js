import { useContext, useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import Button from '../components/UI/Button'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { GoalsContext } from '../store/goals-context'

function ManageGoal({route, navigation}) {
    const goalsCtx = useContext(GoalsContext)

    const editedGoalId = route.params?.goalId // goalId as stated in GoalItem Component, params? to determine retreving existing goal or adding new goal
    const isEditing = !!editedGoalId // !! is to convert a value into boolean, falsy into false or truthy into true

    useLayoutEffect(() => { // useEffect to prevent flickering of old to new content
        navigation.setOptions({ // method to set values like title of screen
            title: isEditing ? 'Edit Goal' : 'Add Goal' // turnery to set dynamic title of screen
        })
    }, [navigation, isEditing]) // dependecies of navigation prop and isEditing helper constant

    function deleteGoalHandler() {
        goalsCtx.deleteGoal(editedGoalId)
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    function confirmHandler() {
        if (isEditing) {
            goalsCtx.updateGoal(
                editedGoalId,
                {
                    title: 'Testtt', 
                    description: 'Test!!!', 
                    date: new Date('2022-05-20')
                }
            )
        } else {
            goalsCtx.addGoal({
                title: 'Test', 
                description: 'Test!!!!!!!', 
                date: new Date('2022-05-19')
            })
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={deleteGoalHandler} 
                    />
                </View>
            )}           
        </View>
    )
}

export default ManageGoal

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800    
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})