import { useContext, useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import GoalForm from '../components/ManageGoal/GoalForm'
import Button from '../components/UI/Button'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { GoalsContext } from '../store/goals-context'

function ManageGoal({route, navigation}) {
    const goalsCtx = useContext(GoalsContext)

    const editedGoalId = route.params?.goalId // goalId as stated in GoalItem Component, params? to determine retreving existing goal or adding new goal
    const isEditing = !!editedGoalId // !! is to convert a value into boolean, falsy into false or truthy into true

    const selectedGoal = goalsCtx.goals.find(
        (goal) => goal.id === editedGoalId) // selecting goal to prefill form for editing

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

    function confirmHandler(goalData) {
        if (isEditing) {
            goalsCtx.updateGoal(editedGoalId, goalData)
        } else {
            goalsCtx.addGoal(goalData)
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <GoalForm
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler} 
                onCancel={cancelHandler}
                defaultValues={selectedGoal}
            />
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})