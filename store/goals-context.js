import { createContext, useReducer } from "react";

const DUMMY_GOALS = [
    {
        id: 'g1',
        title: 'Pass IPPT',
        description: 'Exercise alot',
        date: new Date('2021-12-19')
    },
    {
        id: 'g2',
        title: 'Pass driving Test',
        description: 'Practice Driving',
        date: new Date('2022-01-05')
    },
    {
        id: 'g3',
        title: 'Pass General assembly',
        description: 'Complete projects',
        date: new Date('2021-12-01')
    },
]

export const GoalsContext = createContext({
    goals: [],
    addGoal: ({ title, description, date }) => {},
    deleteGoal: (id) => {},
    updateGoal: (id, {title, description, date}) => {}
})

function goalsReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{ ...action.payload, id: id }, ...state]
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
    const [goalsState, dispatch] = useReducer(goalsReducer, DUMMY_GOALS)

    function addGoal(goalData) {
        dispatch({ type: 'ADD', payload: goalData })
    }

    function deleteGoal(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateGoal(id, goalData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: goalData } })
    }

    const value = {
        goals: goalsState,
        addGoal: addGoal,
        deleteGoal: deleteGoal,
        updateGoal: updateGoal
    }

    return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
}

export default GoalsContextProvider