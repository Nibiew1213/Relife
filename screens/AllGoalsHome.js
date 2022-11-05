import { useContext, useEffect, useState } from 'react'

import GoalsOutput from '../components/GoalsOutput/GoalsOutput'
import ErrorOverlay from "../components/UI/ErrorOverLay"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import { GoalsContext } from '../store/goals-context'
import { fetchGoals } from '../util/http'

function AllGoalsHome() {
    const [isFetching, setIsFetching] =useState(true)
    const [error, setError] = useState()
    const goalsCtx = useContext(GoalsContext)

    useEffect(() => {
        async function getGoals() { // work around to prevent useEffect from turning into async function
            setIsFetching(true)
            try {
                const goals = await fetchGoals()
                goalsCtx.setGoals(goals)
            } catch (error) {
                setError('Could not fetch goals!')
            }
            setIsFetching(false)
        }

        getGoals()
    }, [])

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <GoalsOutput 
            goals={goalsCtx.goals}
            fallbackText={" \n No recorded goal found! \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n Hit the bottom center tab to add your first Goal! "}
        />
    )
}

export default AllGoalsHome

