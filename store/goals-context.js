import { createContext, useReducer } from "react";

export const GoalsContext = createContext({
    goals: [],
    addGoal: ({ title, description, date }) => {},
    setGoals: (goals) => {},
    deleteGoal: (id) => {},
    updateGoal: (id, {title, description, date}) => {}
})

function goalsReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse() // to set display order of list
            return inverted
        case 'UPDATE':
            const updatableGoalIndex = state.findIndex(
                (goal) => goal.id === action.payload.id
            )
            const updatableGoal = state[updatableGoalIndex]
            const updatedItem = { ...updatableGoal, ...action.payload.data }
            const updatedGoals = [...state]
            updatedGoals[updatableGoalIndex] = updatedItem
            return updatedGoals
        case 'DELETE':
            return state.filter((goal) => goal.id !== action.payload)
        default:
            return state
    }
}

function GoalsContextProvider({ children }) {
    const [goalsState, dispatch] = useReducer(goalsReducer, [])

    function addGoal(goalData) {
        dispatch({ type: 'ADD', payload: goalData })
    }

    function setGoals(goals) {
        dispatch({ type: 'SET', payload: goals })
    }

    function deleteGoal(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateGoal(id, goalData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: goalData } })
    }

    const value = {
        goals: goalsState,
        setGoals: setGoals,
        addGoal: addGoal,
        deleteGoal: deleteGoal,
        updateGoal: updateGoal
    }

    return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
}

export default GoalsContextProvider