import { useContext } from 'react'
import GoalsOutput from '../components/GoalsOutput/GoalsOutput'
import { GoalsContext } from '../store/goals-context'

function AllGoalsHome() {
    const goalsCtx = useContext(GoalsContext)

    return (
        <GoalsOutput 
            goals={goalsCtx.goals}
            fallbackText="No registered goal found!" 
        />
    )
}

export default AllGoalsHome